import { defineField, defineType } from "sanity";

export const playgroundItem = defineType({
  name: "playgroundItem",
  title: "Playground item",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year / period",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "note",
      title: "Context note",
      type: "string",
      description: "For example, ‘Early practice work’.",
    }),
    defineField({ name: "image", title: "Image", type: "editorialImage" }),
    defineField({
      name: "externalLink",
      title: "External link",
      type: "externalLink",
    }),
  ],
  preview: { select: { title: "title", subtitle: "medium", media: "image" } },
});
