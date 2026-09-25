import React from "react";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <span className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-400 sm:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
