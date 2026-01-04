import XSidebar from "@/components/examples/x-sidebar";
import fs from "fs";
import path from "path";

// Define the registry of examples
// Add new examples to this array
const EXAMPLE_REGISTRY = [
  {
    componentName: "X Sidebar",
    slug: "x-sidebar",
    createdBy: "https://github.com/Abhijit-Jha",
    filePath: "components/examples/x-sidebar.tsx",
    component: XSidebar,
    description:
      "An animated sidebar navigation component inspired by X (formerly Twitter). Features smooth hover effects and individual icon animations.",
    tags: ["Sidebar", "Navigation", "Animation", "Framer Motion"],
  },
];

export function getExamples() {
  return EXAMPLE_REGISTRY.map((example) => {
    const code = fs.readFileSync(
      path.join(process.cwd(), example.filePath),
      "utf8",
    );

    return {
      componentName: example.componentName,
      slug: example.slug,
      createdBy: example.createdBy,
      description: example.description,
      tags: example.tags,
      code,
      component: example.component,
    };
  });
}

export function getExampleBySlug(slug: string) {
  const examples = getExamples();
  return examples.find((example) => example.slug === slug);
}
