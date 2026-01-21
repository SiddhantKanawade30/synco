import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import jwt from "jsonwebtoken";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env['DATABASE_URL'] || '',
    },
  },
})

type AuthedSocket = Socket & { userId?: string };

function getUserIdFromToken(token?: string | null): string | null {
  if (!token) return null;
  const raw = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
  if (!raw) return null;

  try {
    const decoded = jwt.verify(raw, process.env.JWT_SECRET as string) as { id?: string };
    return decoded?.id ?? null;
  } catch {
    return null;
  }
}

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // later restrict to your Vercel domain
    methods: ["GET", "POST"],
  },
});

// Auth middleware
io.use((socket, next) => {
  const authedSocket = socket as AuthedSocket;

  const token =
    (socket.handshake.auth?.token as string | undefined) ||
    (socket.handshake.headers?.authorization as string | undefined);

  const userId = getUserIdFromToken(token ?? null);

  if (!userId) {
    return next(new Error("Unauthorized"));
  }

  authedSocket.userId = userId;
  next();
});

// Connection
io.on("connection", (socket) => {
  const authedSocket = socket as AuthedSocket;
  console.log("Socket connected:", authedSocket.userId);

  socket.on("issue:join", ({ issueId }: { issueId: string }) => {
    if (!issueId) return;
    socket.join(`issue:${issueId}`);
  });

  socket.on("chat:send", async ({ issueId, text }: { issueId: string; text: string }) => {
    try {
      if (!issueId || !text?.trim() || !authedSocket.userId) return;

      const issue = await prisma.issue.findUnique({
        where: { id: issueId },
        select: {
          id: true,
          creatorId: true,
          assigneeId: true,
        },
      });

      if (!issue) return;

      if (
        authedSocket.userId !== issue.creatorId &&
        authedSocket.userId !== issue.assigneeId
      ) {
        return;
      }

      const actor = await prisma.user.findUnique({
        where: { id: authedSocket.userId },
        select: { name: true },
      });

      const activity = await prisma.activity.create({
        data: {
          type: "chats",
          content: text.trim(),
          issueId: issue.id,
          userId: authedSocket.userId,
        },
      });

      io.to(`issue:${issueId}`).emit("activity:new", {
        id: activity.id,
        type: "chats",
        text: activity.content ?? "",
        author: actor?.name ?? "Unknown",
        timestamp: activity.createdAt.toISOString(),
      });
    } catch (e) {
      console.error("chat:send error", e);
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", authedSocket.userId);
  });
});

const PORT = process.env['PORT'] || 4000;

server.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});
