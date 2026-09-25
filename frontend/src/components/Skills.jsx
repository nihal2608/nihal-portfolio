import React from "react";
import SectionHeading from "./SectionHeading";
import { useData } from "../data/DataContext";
import { getIcon } from "../utils/icons";

export default function Skills() {
  const { skillGroups } = useData();

  return (
    <section id="skills" className="bg-white py-24 dark:bg-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="What I Work With"
          subtitle="Technologies and platforms I use to build secure, scalable systems."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.length === 0 && (
            <p className="col-span-full text-center text-sm text-slate-500">
              No skills added yet — add some from the admin panel.
            </p>
          )}
          {skillGroups.map(({ id, title, icon, items }) => {
            const Icon = getIcon(icon);
            return (
            <div
              key={id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-colors hover:border-cyan-400/60 dark:border-white/10 dark:bg-slate-950/60 dark:hover:border-cyan-400/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 text-cyan-600 dark:text-cyan-400">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">{title}</h3>
              <ul className="mt-3 space-y-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                      <span>{item.name}</span>
                      {typeof item.percentage === "number" && (
                        <span className="text-slate-400 dark:text-slate-500">{item.percentage}%</span>
                      )}
                    </div>
                    {typeof item.percentage === "number" && (
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 dark:from-cyan-400 dark:to-purple-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
