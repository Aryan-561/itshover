import React from "react";
import { getExampleBySlug } from "@/lib/examples";
import { notFound } from "next/navigation";
import { ExampleDetail } from "@/components/examples/component-wrapper";
import Link from "next/link";
import GithubIcon from "@/components/ui/github-icon";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ExampleDetailPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const example = getExampleBySlug(slug);

  if (!example) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black p-8 text-zinc-100">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {example.componentName}
            </h1>
            {example.description && (
              <p className="max-w-2xl text-lg text-zinc-400 md:text-xl">
                {example.description}
              </p>
            )}
            {example.createdBy && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-zinc-800">
                  <GithubIcon className="h-4 w-4 text-zinc-400" />
                </div>
                <Link
                  href={example.createdBy}
                  target="_blank"
                  className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  {example.createdBy.split("/").pop()}
                </Link>
              </div>
            )}
          </div>

          {/* Component Preview/Code */}
          <ExampleDetail example={example} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8 pt-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
              Platform
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-zinc-800 ring-inset">
                React
              </span>
              <span className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-zinc-800 ring-inset">
                TypeScript
              </span>
            </div>
          </div>

          {example.tags && example.tags.length > 0 && (
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {example.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 ring-1 ring-zinc-800 ring-inset"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExampleDetailPage;
