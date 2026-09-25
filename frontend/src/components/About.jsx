import React from "react";
import SectionHeading from "./SectionHeading";
import { useData } from "../data/DataContext";

export default function About() {
  const { profile, projects, skills } = useData();

  const stats = [
    { label: "Years Experience", value: `${profile?.experienceYears ?? 0}+` },
    { label: "Projects Completed", value: `${projects.length}+` },
    { label: "Skills", value: `${skills.length}+` },
    { label: "Technologies", value: `${new Set(projects.flatMap((p) => p.technologies || [])).size}+` },
  ];

  return (
    <section id="about" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About Me"
          title="Who I Am"
          subtitle="A quick introduction to my background and what drives my work."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            <p>
              {profile?.about ||
                "Add your bio from the admin panel's Profile page to introduce yourself here."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-center dark:border-white/10 dark:bg-white/5"
              >
                <p className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-2xl font-extrabold text-transparent dark:from-cyan-400 dark:to-purple-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
