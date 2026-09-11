import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;

if (!projectId) {
  throw new Error("SANITY_STUDIO_PROJECT_ID is required to run Sanity Studio.");
}

export default defineConfig({
  name: "nabillaPortfolio",
  title: "Nabilla Zachra Portfolio",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio content")
          .items([
            S.listItem()
              .title("Site settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("About")
              .child(S.document().schemaType("about").documentId("about")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["siteSettings", "about"].includes(item.getId() || ""),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
