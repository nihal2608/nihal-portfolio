import React, { useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { useData } from "../data/DataContext";

const EMPTY = { role: "", company: "", period: "", points: "" };

function ExperienceForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial ? { ...initial, points: initial.points.join("\n") } : EMPTY
  );

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.role.trim() || !form.company.trim()) return;
    onSubmit({
      role: form.role.trim(),
      company: form.company.trim(),
      period: form.period.trim(),
      points: form.points
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-cyan-400/30 bg-white p-5 dark:bg-white/5">
      <input
        name="role"
        value={form.role}
        onChange={handleChange}
        placeholder="Role (e.g. Java Backend Engineer)"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <input
        name="company"
        value={form.company}
        onChange={handleChange}
        placeholder="Company"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <input
        name="period"
        value={form.period}
        onChange={handleChange}
        placeholder="Period (e.g. 2023 — Present)"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <textarea
        name="points"
        value={form.points}
        onChange={handleChange}
        rows={4}
        placeholder={"One bullet point per line"}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950"
        >
          <Check size={14} /> Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300"
        >
          <X size={14} /> Cancel
        </button>
      </div>
    </form>
  );
}

export default function AdminExperience() {
  const { experience, addExperience, updateExperience, deleteExperience } = useData();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your work history timeline. (Stored locally in your browser — no backend
            endpoint for this yet.)
          </p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950"
          >
            <Plus size={14} /> Add entry
          </button>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {adding && (
          <ExperienceForm
            onSubmit={(data) => {
              addExperience(data);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        )}

        {experience.map((job) =>
          editingId === job.id ? (
            <ExperienceForm
              key={job.id}
              initial={job}
              onSubmit={(data) => {
                updateExperience(job.id, data);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={job.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-slate-900 dark:text-white">{job.role}</h3>
                  <span className="text-xs text-slate-500">· {job.period}</span>
                </div>
                <p className="mt-1 text-sm text-cyan-600 dark:text-cyan-400">{job.company}</p>
                <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {job.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditingId(job.id)}
                  aria-label="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => deleteExperience(job.id)}
                  aria-label="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}

        {experience.length === 0 && !adding && (
          <p className="text-sm text-slate-500">No experience entries yet — add your first one above.</p>
        )}
      </div>
    </div>
  );
}
