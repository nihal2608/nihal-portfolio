import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useData } from "../data/DataContext";

export default function Footer() {
  const { profile } = useData();
  const name = profile?.fullName || "Your Name";

  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-white/10 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2">
          <img src="/logo-mark.svg" alt="" className="h-6 w-6" aria-hidden="true" />
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {name}. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {profile?.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
            >
              <Github size={18} />
            </a>
          )}
          {profile?.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
            >
              <Linkedin size={18} />
            </a>
          )}
          {profile?.email && (
            <a
              href={`mailto:${profile.email}`}
              className="text-slate-400 hover:text-cyan-600 dark:text-slate-500 dark:hover:text-cyan-400"
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
