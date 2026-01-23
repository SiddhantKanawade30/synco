import { createEmailTemplate } from './genericEmailTemplate';

export function issueAssignedEmail({
  issueTitle,
  issueId,
  assigneeName,
  issueDescription,
  issueDeadline,
  projectName,
  assignedBy,
}: {
  issueTitle: string;
  issueId: string;
  assigneeName: string;
  issueDescription: string;
  issueDeadline: string;
  projectName: string;
  assignedBy: string;
}) {
  const greeting = `Hi ${assigneeName},`;
  
  const mainContent = `
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">You have been assigned a new issue by </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6"><strong>${assignedBy}</strong></span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"> in project </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6"><strong>${projectName}</strong></span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Issue Title:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${issueTitle}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Description:</strong></span>
    </div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 18px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">${issueDescription}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Deadline:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${issueDeadline}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">Click the button below to view the issue details and start working on it.</span>
    </div>
  `;

  return createEmailTemplate({
    subject: `New issue assigned: ${issueTitle}`,
    headerTitle: "New Issue Assigned",
    greeting,
    mainContent,
    buttonText: "View Issue",
    buttonUrl: `${process.env.APP_URL}/issues/${issueId}`,
    quoteText: "Collaboration is the key to innovation and success."
  });
}