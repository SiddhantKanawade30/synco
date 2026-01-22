import { createEmailTemplate } from './genericEmailTemplate';

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
  const greeting = `Hi there,`;
  
  const mainContent = `
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">Great news! The issue has been completed.</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Issue Title:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${issueTitle}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Completed By:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${assigneeName}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">Click the button below to view the completed issue details.</span>
    </div>
  `;

  return createEmailTemplate({
    subject: `Issue resolved: ${issueTitle}`,
    headerTitle: "Issue Resolved",
    greeting,
    mainContent,
    buttonText: "View Issue",
    buttonUrl: `${process.env.APP_URL}/issues/${issueId}`,
    quoteText: "Success is not final, failure is not fatal: it is the courage to continue that counts."
  });
}
