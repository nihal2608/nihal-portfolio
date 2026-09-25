import React, { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_LINKS } from "../data/content";

export default function Navbar({ activeSection, isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo-mark.svg" alt="" className="h-9 w-9" aria-hidden="true" />
          <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NIHAL
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:to-purple-500">
              .A
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${
                  activeSection === link.toLowerCase()
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 transition-colors hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-slate-200 bg-white px-6 py-4 dark:border-white/10 dark:bg-slate-950 md:hidden">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-cyan-600 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-cyan-400"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
