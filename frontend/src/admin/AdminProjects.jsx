import React, { useState } from "react";
import { Plus, Trash2, Pencil, X, Check, Star, Upload } from "lucide-react";
import { useData } from "../data/DataContext";
import * as projectsApi from "../api/projectsApi";
import ExportButtons from "./ExportButtons";

const EXPORT_COLUMNS = [
  { header: "Title", key: "title" },
  { header: "Category", key: "category" },
  { header: "Status", key: "status" },
  { header: "Featured", key: "featuredLabel" },
  { header: "Technologies", key: "technologiesLabel" },
];

const STATUS_OPTIONS = ["PLANNED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"];

const EMPTY = {
  title: "",
  shortDescription: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  thumbnail: "",
  featured: false,
  displayOrder: 0,
  category: "",
  status: "COMPLETED",
  startDate: "",
  endDate: "",
  technologies: "",
};

function ProjectForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial ? { ...initial, technologies: (initial.technologies || []).join(", ") } : EMPTY
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleThumbnailUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await projectsApi.uploadProjectThumbnail(file);
      setForm((f) => ({ ...f, thumbnail: url }));
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      title: form.title.trim(),
      displayOrder: Number(form.displayOrder) || 0,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-cyan-400/30 bg-white dark:bg-white/5 p-5">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Project title"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <input
        name="shortDescription"
        value={form.shortDescription}
        onChange={handleChange}
        placeholder="Short description (shown on cards)"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows={3}
        placeholder="Full description"
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          name="githubUrl"
          value={form.githubUrl}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <input
          name="liveUrl"
          value={form.liveUrl}
          onChange={handleChange}
          placeholder="Live URL"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category (e.g. Backend)"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-slate-900 dark:text-white"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
        <input
          type="date"
          name="startDate"
          value={form.startDate || ""}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        <input
          type="date"
          name="endDate"
          value={form.endDate || ""}
          onChange={handleChange}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <input
        name="technologies"
        value={form.technologies}
        onChange={handleChange}
        placeholder="Technologies, comma separated (e.g. Java, Docker, Kafka)"
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />

      <div className="flex items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-cyan-400/60 dark:border-white/10 dark:text-slate-300">
          <Upload size={13} />
          {uploading ? "Uploading…" : "Upload thumbnail"}
          <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
        </label>
        {form.thumbnail && <img src={form.thumbnail} alt="" className="h-10 w-16 rounded object-cover" />}

        <label className="ml-auto flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured (like)
        </label>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

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

export default function AdminProjects() {
  const { projects, addProject, editProject, removeProject, toggleProjectFeatured, loading, error } = useData();
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [actionError, setActionError] = useState("");

  async function handleAdd(data) {
    try {
      await addProject(data);
      setAdding(false);
    } catch (e) {
      setActionError(e.message);
    }
  }

  async function handleEdit(id, data) {
    try {
      await editProject(id, data);
      setEditingId(null);
    } catch (e) {
      setActionError(e.message);
    }
  }

  async function handleDelete(id) {
    try {
      await removeProject(id);
    } catch (e) {
      setActionError(e.message);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage the projects shown on your site. Click the star to like/feature a project.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ExportButtons
            columns={EXPORT_COLUMNS}
            rows={projects.map((p) => ({
              ...p,
              featuredLabel: p.featured ? "Yes" : "No",
              technologiesLabel: (p.technologies || []).join(", "),
            }))}
            filename="projects"
            title="Projects"
          />
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950"
            >
              <Plus size={14} /> Add project
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {actionError && <p className="mt-3 text-sm text-red-500">{actionError}</p>}
      {loading && <p className="mt-3 text-sm text-slate-500">Loading…</p>}

      <div className="mt-6 space-y-4">
        {adding && <ProjectForm onSubmit={handleAdd} onCancel={() => setAdding(false)} />}

        {projects.map((project) =>
          editingId === project.id ? (
            <ProjectForm
              key={project.id}
              initial={project}
              onSubmit={(data) => handleEdit(project.id, data)}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div
              key={project.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex gap-4">
                {project.thumbnail && (
                  <img src={project.thumbnail} alt="" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                )}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {project.shortDescription || project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
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
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => toggleProjectFeatured(project)}
                  aria-label="Toggle featured (like)"
                  className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                    project.featured
                      ? "border-purple-400/60 text-purple-500"
                      : "border-slate-200 text-slate-400 dark:border-white/10"
                  }`}
                >
                  <Star size={14} fill={project.featured ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => setEditingId(project.id)}
                  aria-label="Edit"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  aria-label="Delete"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}

        {projects.length === 0 && !adding && !loading && (
          <p className="text-sm text-slate-500">No projects yet — add your first one above.</p>
        )}
      </div>
    </div>
  );
}
