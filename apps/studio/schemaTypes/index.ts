import { about } from "./about";
import { editorialBlockTypes } from "./blocks/editorialBlocks";
import { experience } from "./experience";
import { playgroundItem } from "./playgroundItem";
import { project } from "./project";
import { projectSection } from "./projectSection";
import { editorialImage, externalLink, richText } from "./shared";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  richText,
  editorialImage,
  externalLink,
  ...editorialBlockTypes,
  projectSection,
  project,
  experience,
  playgroundItem,
  about,
  siteSettings,
];
