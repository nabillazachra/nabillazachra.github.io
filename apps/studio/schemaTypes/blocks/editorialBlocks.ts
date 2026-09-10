import { defineArrayMember, defineField, defineType } from "sanity";

const imageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "editorialImage",
    validation: (rule) => rule.required(),
  });

const labelField = defineField({
  name: "label",
  title: "Eyebrow / evidence label",
  type: "string",
});

export const textLead = defineType({
  name: "textLead",
  title: "Text lead",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "text",
      title: "Lead",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({ title: title || "Text lead" }),
  },
});

export const fullBleedImage = defineType({
  name: "fullBleedImage",
  title: "Full bleed image",
  type: "object",
  fields: [imageField("image", "Image")],
  preview: {
    select: { title: "image.caption", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Full bleed image",
      media,
    }),
  },
});

export const captionedImage = defineType({
  name: "captionedImage",
  title: "Image + caption",
  type: "object",
  fields: [imageField("image", "Image")],
  preview: {
    select: { title: "image.caption", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Image + caption",
      media,
    }),
  },
});

export const annotatedImage = defineType({
  name: "annotatedImage",
  title: "Image + annotation",
  type: "object",
  fields: [
    imageField("image", "Image"),
    defineField({
      name: "annotations",
      title: "Annotations",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "note" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "image.caption", media: "image" },
    prepare: ({ title, media }) => ({
      title: title || "Annotated image",
      media,
    }),
  },
});

export const twoColumnStory = defineType({
  name: "twoColumnStory",
  title: "Two-column story",
  type: "object",
  fields: [
    defineField({
      name: "left",
      title: "Left column",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "right",
      title: "Right column",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Two-column story" }) },
});

export const researchFinding = defineType({
  name: "researchFinding",
  title: "Research finding",
  type: "object",
  fields: [
    labelField,
    defineField({
      name: "title",
      title: "Finding",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "evidence",
      title: "Supporting evidence",
      type: "text",
      rows: 3,
      description: "Only add observed, sourced evidence.",
    }),
    defineField({
      name: "interpretation",
      title: "Interpretation",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { select: { title: "title", subtitle: "label" } },
});

export const pullQuote = defineType({
  name: "pullQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "attribution",
      title: "Attribution / source",
      type: "string",
      description: "Required for participant or stakeholder quotations.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: "quote", subtitle: "attribution" } },
});

export const evidenceBlock = defineType({
  name: "evidenceBlock",
  title: "Metric / evidence block",
  type: "object",
  fields: [
    labelField,
    defineField({
      name: "title",
      title: "Evidence",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "evidence",
      title: "Value or observation",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "interpretation",
      title: "Context and source",
      type: "text",
      rows: 3,
      description:
        "State method, denominator, source, or limitations. Never enter unsupported impact.",
    }),
  ],
  preview: { select: { title: "title", subtitle: "label" } },
});

export const beforeAfter = defineType({
  name: "beforeAfter",
  title: "Before / after",
  type: "object",
  fields: [
    imageField("before", "Before"),
    imageField("after", "After"),
    defineField({
      name: "body",
      title: "What changed and why",
      type: "richText",
    }),
  ],
  preview: { prepare: () => ({ title: "Before / after" }) },
});

export const decisionBlock = defineType({
  name: "decisionBlock",
  title: "Decision block",
  type: "object",
  fields: [
    labelField,
    defineField({
      name: "title",
      title: "Decision title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "decision",
      title: "Decision",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "rationale", title: "Why", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "label" } },
});

export const tradeOffBlock = defineType({
  name: "tradeOffBlock",
  title: "Trade-off block",
  type: "object",
  fields: [
    labelField,
    defineField({
      name: "title",
      title: "Trade-off title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tradeOff",
      title: "What was traded",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "consequence",
      title: "Consequence / limitation",
      type: "text",
      rows: 3,
    }),
  ],
  preview: { select: { title: "title", subtitle: "label" } },
});

export const editorialGallery = defineType({
  name: "editorialGallery",
  title: "Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "editorialImage" })],
      validation: (rule) => rule.min(2).required(),
    }),
  ],
  preview: { prepare: () => ({ title: "Editorial gallery" }) },
});

export const outcomeBlock = defineType({
  name: "outcomeBlock",
  title: "Outcome",
  type: "object",
  fields: [
    labelField,
    defineField({ name: "title", title: "Outcome title", type: "string" }),
    defineField({
      name: "result",
      title: "Supported result",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "evidence",
      title: "Evidence / source",
      type: "text",
      rows: 3,
      description: "Leave claims out unless they can be substantiated.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "label" },
    prepare: ({ title, subtitle }) => ({ title: title || "Outcome", subtitle }),
  },
});

export const reflectionBlock = defineType({
  name: "reflectionBlock",
  title: "Reflection",
  type: "object",
  fields: [
    labelField,
    defineField({ name: "title", title: "Reflection title", type: "string" }),
    defineField({
      name: "learning",
      title: "Learning",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "label" },
    prepare: ({ title, subtitle }) => ({
      title: title || "Reflection",
      subtitle,
    }),
  },
});

export const editorialBlockTypes = [
  textLead,
  fullBleedImage,
  captionedImage,
  annotatedImage,
  twoColumnStory,
  researchFinding,
  pullQuote,
  evidenceBlock,
  beforeAfter,
  decisionBlock,
  tradeOffBlock,
  editorialGallery,
  outcomeBlock,
  reflectionBlock,
];
