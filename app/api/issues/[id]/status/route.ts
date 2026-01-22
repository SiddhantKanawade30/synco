import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { getUserFromRequest } from '@/src/lib/auth'
import { sendEmail } from '@/app/api/lib/email'
import { issueCompletedEmail } from '@/app/api/lib/emailTemplets/issueCompleted'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  console.log("=== STATUS UPDATE API CALLED ===");
  
  try {
    const { id } = await params
    const body = await request.json()
    const { status } = body
    
    console.log("=== STATUS UPDATE API CALLED ===");
    console.log("Issue ID:", id);
    console.log("Status received:", status, "Type:", typeof status);
    
    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    // Get the user making the request
    const user = getUserFromRequest(request)
    if (!user?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the current issue details before updating
    const currentIssue = await prisma.issue.findUnique({
      where: { id },
      include: {
        creator: { select: { name: true, email: true } },
        project: { select: { name: true } }
      }
    })

    if (!currentIssue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 })
    }

    // Update the issue status
    const updatedIssue = await prisma.issue.update({
      where: { id },
      data: { status }
    })

    // Send email notification if issue is marked as DONE or resolved
    console.log("Status received:", status, "Type:", typeof status);
    console.log("Status === 'DONE':", status === 'DONE');
    console.log("Status === 'resolved':", status === 'resolved');
    console.log("Status.toUpperCase() === 'DONE':", status?.toUpperCase() === 'DONE');
    
    if (status?.toUpperCase() === 'DONE' || status?.toLowerCase() === 'resolved') {
      try {
        console.log("Preparing to send completion email to:", currentIssue.creator.email);
        
        // Get the user who completed the issue
        const completedByUser = await prisma.user.findUnique({
          where: { id: user.userId },
          select: { name: true }
        });

        if (completedByUser && currentIssue.creator.email) {
          const { subject, html } = issueCompletedEmail({
            issueTitle: currentIssue.title,
            issueId: id,
            projectId: currentIssue.projectId,
            assigneeName: completedByUser.name,
          });

          await sendEmail({
            to: currentIssue.creator.email,
            subject,
            html,
          });

          console.log(`Completion email sent to ${currentIssue.creator.email} for issue ${currentIssue.title}`);
        }
      } catch (emailError) {
        console.error("Error sending completion email:", emailError);
        // Don't fail the request if email fails, but log it
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Issue ${id} status updated to ${status}`,
      issue: updatedIssue
    })
  } catch (error) {
    console.error('Issue status PUT error:', error)
    return NextResponse.json(
      { error: 'Failed to update issue status' },
      { status: 500 }
    )
  }
}