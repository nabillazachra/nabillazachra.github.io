import { draftMode } from "next/headers";

import { fallbackHomeContent, projects } from "./fallback";
import type { HomeContent, Project } from "./types";
import { getSanityClient } from "../sanity/client";
import {
  homeQuery,
  projectBySlugQuery,
  projectSlugsQuery,
} from "../sanity/queries";

async function isPreviewEnabled() {
  return (await draftMode()).isEnabled;
}

export async function getHomeContent(): Promise<HomeContent> {
  const preview = await isPreviewEnabled();
  const client = getSanityClient(preview);

  if (!client) return fallbackHomeContent;

  try {
    const result = await client.fetch<HomeContent>(
      homeQuery,
      {},
      {
        cache: preview ? "no-store" : "force-cache",
        next: preview ? undefined : { revalidate: 60 },
      },
    );

    return {
      projects: result.projects?.length ? result.projects : projects,
      experiences: result.experiences?.length
        ? result.experiences
        : fallbackHomeContent.experiences,
      playground: result.playground?.length
        ? result.playground
        : fallbackHomeContent.playground,
      about: result.about ?? fallbackHomeContent.about,
      settings: result.settings ?? fallbackHomeContent.settings,
    };
  } catch (error) {
    console.error(
      "Sanity homepage query failed; using verified fallback content.",
      error,
    );
    return fallbackHomeContent;
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  const preview = await isPreviewEnabled();
  const client = getSanityClient(preview);

  if (!client) return projects.find((project) => project.slug === slug) ?? null;

  try {
    return await client.fetch<Project | null>(
      projectBySlugQuery,
      { slug },
      {
        cache: preview ? "no-store" : "force-cache",
        next: preview ? undefined : { revalidate: 60 },
      },
    );
  } catch (error) {
    console.error(`Sanity project query failed for ${slug}.`, error);
    return projects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  const client = getSanityClient(false);
  if (!client) return projects.map((project) => project.slug);

  try {
    const slugs = await client.fetch<string[]>(projectSlugsQuery);
    return slugs.length ? slugs : projects.map((project) => project.slug);
  } catch {
    return projects.map((project) => project.slug);
  }
}
