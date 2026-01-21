export function issueAssignedEmail({
  issueTitle,
  issueId,
  projectId,
}: {
  issueTitle: string;
  issueId: string;
  projectId: string;
}) {
  return {
    subject: `New issue assigned: ${issueTitle}`,
    html: `
      <h2>New Issue Assigned</h2>
      <p>You have been assigned an issue:</p>
      <p><b>${issueTitle}</b></p>
      <a href="${process.env.APP_URL}/projects/${projectId}/issues/${issueId}">
        View Issue
      </a>
    `,
  };
}
