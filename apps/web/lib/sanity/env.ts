const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-02-19";

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion,
  configured: Boolean(projectId && /^[a-z0-9-]+$/.test(projectId)),
};
