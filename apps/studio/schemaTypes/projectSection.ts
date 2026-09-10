import { defineArrayMember, defineField, defineType } from "sanity";

const blockTypes = [
  "textLead",
  "fullBleedImage",
  "captionedImage",
  "annotatedImage",
  "twoColumnStory",
  "researchFinding",
  "pullQuote",
  "evidenceBlock",
  "beforeAfter",
  "decisionBlock",
  "tradeOffBlock",
  "editorialGallery",
  "outcomeBlock",
  "reflectionBlock",
];

export const projectSection = defineType({
  name: "projectSection",
  title: "Project section",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Short section marker, for example ‘Research / 02’.",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "blocks",
      title: "Editorial blocks",
      type: "array",
      of: blockTypes.map((type) => defineArrayMember({ type })),
      validation: (rule) => rule.min(1).required(),
    }),
  ],
  preview: { select: { title: "heading", subtitle: "eyebrow" } },
});
