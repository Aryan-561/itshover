import React from "react";
import Link from "next/link";
import { getExamples } from "@/lib/examples";
import { Example } from "@/components/examples/component-wrapper";

const ExamplePage = () => {
  const examples = getExamples();

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="w-full">
        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold text-white">Examples</h1>
          <p className="text-lg text-zinc-400">
            Explore our collection of animated components.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {examples.map((example) => (
            <ExampleCard key={example.slug} example={example} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ExampleCard = ({ example }: { example: Example }) => {
  return (
    <Link
      href={`/example/${example.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 transition-all hover:border-zinc-700 hover:bg-zinc-900"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-zinc-950/50 p-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-50 transition-opacity group-hover:opacity-100">
          {/* Scale down the component for preview */}
          <div className="pointer-events-none origin-center scale-[0.6] select-none">
            <example.component />
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4">
        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white">
          {example.componentName}
        </h3>
        {example.description && (
          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
            {example.description}
          </p>
        )}
        {example.createdBy && (
          <span className="mt-2 text-xs text-zinc-500">
            by {example.createdBy.split("/").pop()}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ExamplePage;
