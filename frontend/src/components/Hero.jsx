import React from "react";
import { Download, Github, Linkedin, Briefcase, Code2 } from "lucide-react";
import { TECH_BADGES } from "../data/content";
import { useData } from "../data/DataContext";

export default function Hero() {
  const { profile, projects } = useData();

  const fullName = profile?.fullName || "Your Name";
  const designation = profile?.designation || "Java Backend Engineer";
  const about =
    profile?.about ||
    "Java Backend Developer specializing in Spring Boot, Microservices, SIEM Platforms, MDM Solutions and AI Powered Applications.";
  const years = profile?.experienceYears ?? 0;

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-slate-50 pt-28 pb-16 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-purple-300/40 blur-3xl dark:bg-purple-600/30" />
      <div className="pointer-events-none absolute top-40 right-0 h-96 w-96 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/20" />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            {designation}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-5xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-500">
              {fullName}
            </span>
          </h1>

          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Building Scalable{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-500">
              Enterprise Backend Systems
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
            {about}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {profile?.resume ? (
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105 dark:from-cyan-400 dark:to-purple-500 dark:text-slate-950"
              >
                <Download size={16} />
                Download Resume
              </a>
            ) : (
              <a
                href="#contact"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-transform hover:scale-105 dark:from-cyan-400 dark:to-purple-500 dark:text-slate-950"
              >
                <Download size={16} />
                Download Resume
              </a>
            )}
            {profile?.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-cyan-400/60 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                <Github size={18} />
              </a>
            )}
            {profile?.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:border-cyan-400/60 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {TECH_BADGES.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                <Icon size={14} className="text-cyan-600 dark:text-cyan-400" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex justify-center">
          <div className="relative h-80 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 dark:border-white/10 dark:from-slate-800 dark:to-slate-900 sm:h-96 sm:w-80">
            {profile?.profileImage ? (
              <img src={profile.profileImage} alt={fullName} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-slate-600">
                <span className="text-sm">Your photo here</span>
              </div>
            )}
          </div>

          <div className="absolute -left-6 top-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Briefcase size={16} />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{years}+</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Years Experience</p>
            </div>
          </div>

          <div className="absolute -right-4 bottom-12 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400">
              <Code2 size={16} />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{projects.length}+</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Projects Completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
