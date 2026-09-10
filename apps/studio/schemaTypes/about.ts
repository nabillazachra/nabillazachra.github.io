import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "richText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability note",
      type: "string",
    }),
  ],
  preview: { prepare: () => ({ title: "About Nabilla" }) },
});
