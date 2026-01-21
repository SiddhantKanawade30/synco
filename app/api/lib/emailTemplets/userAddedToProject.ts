export function userAddedToProjectEmail({
  projectName,
  projectId,
  addedByName,
}: {
  projectName: string;
  projectId: string;
  addedByName: string;
}) {
  return {
    subject: `Added to project: ${projectName}`,
    html: `
      <h2>You were added to a project</h2>
      <p>You have been added to <b>${projectName}</b> by <b>${addedByName}</b>.</p>
      <p>You are now a member of this project and can collaborate on issues and tasks.</p>
      <a href="${process.env.APP_URL}/projects/${projectId}">
        View Project
      </a>
    `,
  };
}
