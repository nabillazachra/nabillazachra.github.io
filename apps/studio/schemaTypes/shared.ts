import { defineArrayMember, defineField, defineType } from "sanity";

export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto"] }).required(),
              }),
            ],
          },
        ],
      },
    }),
  ],
});

export const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for someone who cannot see it.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
  ],
});

export const externalLink = defineType({
  name: "externalLink",
  title: "External link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https", "mailto"] }).required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "url" } },
});
