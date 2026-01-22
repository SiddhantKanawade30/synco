import { createEmailTemplate } from './genericEmailTemplate';

export function userAddedToProjectEmail({
  projectName,
  projectId,
  addedByName,
  projectDeadline,
}: {
  projectName: string;
  projectId: string;
  addedByName: string;
  projectDeadline?: string;
}) {
  const greeting = `Hi there,`;
  
  const mainContent = `
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">You have been added to a new project!</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Project Name:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${projectName}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Added By:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${addedByName}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565"><strong>Project Deadline:</strong> </span>
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #3B82F6">${projectDeadline || 'Not set'}</span>
    </div>
    <div style="font-family: inherit; text-align: inherit"><br></div>
    <div style="font-family: inherit; text-align: inherit">
      <span style="font-size: 20px; font-family: 'trebuchet ms', helvetica, sans-serif; color: #656565">You are now a member of this project and can collaborate on issues and tasks. Click the button below to view the project.</span>
    </div>
  `;

  return createEmailTemplate({
    subject: `Added to project: ${projectName}`,
    headerTitle: "Added to Project",
    greeting,
    mainContent,
    buttonText: "View Project",
    buttonUrl: `${process.env.APP_URL}/projects/${projectId}`,
    quoteText: "Alone we can do so little; together we can do so much."
  });
}
