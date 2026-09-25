import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Sparkles, History, Mail } from "lucide-react";
import { useData } from "../data/DataContext";
import * as messagesApi from "../api/messagesApi";
import ActivityChart from "./ActivityChart";

export default function AdminDashboard() {
  const { projects, skillGroups, experience, loading, error, reload } = useData();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messagesApi.getMessages().then(setMessages).catch(() => {});
  }, []);

  const stats = [
    { label: "Projects", value: projects.length, icon: Briefcase, to: "/admin/projects" },
    { label: "Skill groups", value: skillGroups.length, icon: Sparkles, to: "/admin/skills" },
    { label: "Experience entries", value: experience.length, icon: History, to: "/admin/experience" },
    { label: "Messages received", value: messages.length, icon: Mail, to: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Overview of your portfolio content. Changes here update the live site instantly.
      </p>

      {error && (
        <div className="mt-4 flex items-center justify-between rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          <span>{error}</span>
          <button onClick={reload} className="font-semibold underline">
            Retry
          </button>
        </div>
      )}
      {loading && <p className="mt-4 text-sm text-slate-500">Loading data from the backend…</p>}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-cyan-400/40 dark:border-white/10 dark:bg-white/5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Icon size={18} />
            </span>
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ActivityChart />
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent messages</h2>
        {messages.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">No messages yet.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {messages.slice(0, 3).map((m) => (
              <li key={m.id} className="rounded-xl border border-slate-200 p-3 dark:border-white/10">
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {m.name} <span className="text-slate-500">— {m.email}</span>
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">{m.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
