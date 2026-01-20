import http from "http"
import next from "next"
import { Server, Socket } from "socket.io"
import jwt from "jsonwebtoken"

import { prisma } from "./src/lib/prisma"

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

type AuthedSocket = Socket & { userId?: string }

function getUserIdFromToken(token?: string | null): string | null {
  if (!token) return null
  const raw = token.startsWith("Bearer ") ? token.split(" ")[1] : token
  if (!raw) return null
  try {
    const decoded = jwt.verify(raw, process.env.JWT_SECRET as string) as { id?: string }
    return decoded?.id ?? null
  } catch {
    return null
  }
}

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res))

  const io = new Server(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST"],
    },
  })

  io.use((socket, nextFn) => {
    const authedSocket = socket as AuthedSocket
    const token =
      (socket.handshake.auth?.token as string | undefined) ||
      (socket.handshake.headers?.authorization as string | undefined)

    const userId = getUserIdFromToken(token ?? null)
    if (!userId) return nextFn(new Error("Unauthorized"))

    authedSocket.userId = userId
    return nextFn()
  })

  io.on("connection", (socket) => {
    const authedSocket = socket as AuthedSocket

    socket.on("issue:join", async ({ issueId }: { issueId: string }) => {
      if (!issueId) return
      socket.join(`issue:${issueId}`)
    })

    socket.on("chat:send", async ({ issueId, text }: { issueId: string; text: string }) => {
      try {
        if (!issueId || !text?.trim() || !authedSocket.userId) return

        const issue = await prisma.issue.findUnique({
          where: { id: issueId },
          select: {
            id: true,
            creatorId: true,
            assigneeId: true,
          },
        })
        if (!issue) return

        // Only creator or assignee can chat
        if (authedSocket.userId !== issue.creatorId && authedSocket.userId !== issue.assigneeId) {
          return
        }

        const actor = await prisma.user.findUnique({
          where: { id: authedSocket.userId },
          select: { name: true },
        })

        const activity = await prisma.activity.create({
          data: {
            type: "chats",
            content: text.trim(),
            issueId: issue.id,
            userId: authedSocket.userId,
          },
        })

        io.to(`issue:${issueId}`).emit("activity:new", {
          id: activity.id,
          type: "chats" as const,
          text: activity.content ?? "",
          author: actor?.name ?? "Unknown",
          timestamp: activity.createdAt.toISOString(),
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("chat:send error", e)
      }
    })
  })

  const port = parseInt(process.env.PORT || "3000", 10)
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port} (dev=${dev})`)
  })
})


