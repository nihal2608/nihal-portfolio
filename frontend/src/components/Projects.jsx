import React from "react";
import { ExternalLink, Github, Star } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useData } from "../data/DataContext";

export default function Projects() {
  const { projects } = useData();

  return (
    <section id="projects" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected Work"
          subtitle="A few backend systems and platforms I've designed and shipped."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.length === 0 && (
            <p className="col-span-full text-center text-sm text-slate-500">
              No projects added yet — add some from the admin panel.
            </p>
          )}
          {projects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-purple-400/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-purple-400/40"
            >
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="mb-4 h-40 w-full rounded-xl object-cover"
                />
              )}
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <div className="flex shrink-0 items-center gap-2">
                  {project.featured && (
                    <Star size={16} className="fill-purple-500 text-purple-500" />
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="text-slate-400 transition-colors hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title}`}
                      className="text-slate-400 transition-colors hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {project.shortDescription || project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(project.technologies || []).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-medium text-cyan-700 dark:text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
