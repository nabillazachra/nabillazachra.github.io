import { createClient } from "next-sanity";

import { sanityEnv } from "./env";

export function getSanityClient(preview = false) {
  if (!sanityEnv.configured || !sanityEnv.projectId) {
    return null;
  }

  const token = preview ? process.env.SANITY_API_READ_TOKEN : undefined;

  if (preview && !token) {
    throw new Error("SANITY_API_READ_TOKEN is required for draft preview.");
  }

  return createClient({
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
    apiVersion: sanityEnv.apiVersion,
    useCdn: !preview,
    perspective: preview ? "drafts" : "published",
    token,
  });
}
