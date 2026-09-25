import React from "react";
import { Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useData } from "../data/DataContext";

export default function Experience() {
  const { experience } = useData();

  return (
    <section id="experience" className="bg-white py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've Worked"
          subtitle="My professional journey building backend systems."
        />
        <div className="relative space-y-10 border-l border-slate-200 pl-8 dark:border-white/10">
          {experience.map((job) => (
            <div key={job.id} className="relative">
              <span className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-cyan-500 to-purple-600 dark:border-slate-900 dark:from-cyan-400 dark:to-purple-500" />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.role}</h3>
                <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                  <Calendar size={12} />
                  {job.period}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-cyan-600 dark:text-cyan-400">{job.company}</p>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
