export function issueCompletedEmail({
  issueTitle,
  issueId,
  projectId,
  assigneeName,
}: {
  issueTitle: string;
  issueId: string;
  projectId: string;
  assigneeName: string;
}) {
  return {
    subject: `Issue resolved: ${issueTitle}`,
    html: `
      <h2>Issue Resolved</h2>
      <p>The issue <b>${issueTitle}</b> has been completed by:</p>
      <p><b>${assigneeName}</b></p>
      <a href="${process.env.APP_URL}/projects/${projectId}/issues/${issueId}">
        View Issue
      </a>
    `,
  };
}
