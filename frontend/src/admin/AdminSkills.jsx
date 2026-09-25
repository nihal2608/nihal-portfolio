import React, { useState } from "react";
import { Plus, Trash2, Pencil, X, Check } from "lucide-react";
import { useData } from "../data/DataContext";
import { ICON_OPTIONS, getIcon } from "../utils/icons";
import ExportButtons from "./ExportButtons";

const EXPORT_COLUMNS = [
  { header: "Skill", key: "skillName" },
  { header: "Category", key: "category" },
  { header: "Proficiency %", key: "percentage" },
];

const EMPTY_CATEGORY = { name: "", icon: "code", displayOrder: 0 };
const EMPTY_SKILL = { skillName: "", percentage: 70, icon: "code", color: "#22d3ee", displayOrder: 0, categoryId: "" };

function CategoryForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_CATEGORY);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "displayOrder" ? Number(value) : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({ name: form.name.trim(), icon: form.icon, displayOrder: form.displayOrder });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-2xl border border-cyan-400/30 bg-white p-4 dark:bg-white/5">
      <div className="flex-1 min-w-[10rem]">
        <label className="text-xs text-slate-500">Category name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <div>
        <label className="text-xs text-slate-500">Icon</label>
        <select
          name="icon"
          value={form.icon}
          onChange={handleChange}
          className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-slate-500">Order</label>
        <input
          type="number"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          className="mt-1 w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <button type="submit" className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950">
        <Check size={14} /> Save
      </button>
      <button type="button" onClick={onCancel} className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
        <X size={14} /> Cancel
      </button>
    </form>
  );
}

function SkillForm({ initial, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, categoryId: initial.categoryId || categories.find((c) => c.name === initial.category)?.id || "" }
      : { ...EMPTY_SKILL, categoryId: categories[0]?.id || "" }
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "percentage" || name === "displayOrder" || name === "categoryId" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.skillName.trim() || !form.categoryId) return;
    onSubmit({
      skillName: form.skillName.trim(),
      percentage: form.percentage,
      icon: form.icon,
      color: form.color,
      displayOrder: form.displayOrder,
      categoryId: form.categoryId,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded-2xl border border-purple-400/30 bg-white p-4 dark:bg-white/5">
      <div className="flex-1 min-w-[10rem]">
        <label className="text-xs text-slate-500">Skill name</label>
        <input
          name="skillName"
          value={form.skillName}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <div>
        <label className="text-xs text-slate-500">Category</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-slate-500">Proficiency %</label>
        <input
          type="number"
          min={0}
          max={100}
          name="percentage"
          value={form.percentage}
          onChange={handleChange}
          className="mt-1 w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <div>
        <label className="text-xs text-slate-500">Order</label>
        <input
          type="number"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          className="mt-1 w-20 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
      </div>
      <button type="submit" className="flex items-center gap-1 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950">
        <Check size={14} /> Save
      </button>
      <button type="button" onClick={onCancel} className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
        <X size={14} /> Cancel
      </button>
    </form>
  );
}

export default function AdminSkills() {
  const {
    skillCategories,
    skills,
    addSkillCategory,
    editSkillCategory,
    removeSkillCategory,
    addSkill,
    editSkill,
    removeSkill,
    error,
  } = useData();

  const [addingCategory, setAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [addingSkill, setAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [actionError, setActionError] = useState("");

  async function guarded(fn) {
    try {
      await fn();
    } catch (e) {
      setActionError(e.message);
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Skills</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Skill categories group individual skills shown on your site.
            </p>
          </div>
          {!addingCategory && (
            <button
              onClick={() => setAddingCategory(true)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950"
            >
              <Plus size={14} /> Add category
            </button>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        {actionError && <p className="mt-3 text-sm text-red-500">{actionError}</p>}

        <div className="mt-4 space-y-3">
          {addingCategory && (
            <CategoryForm
              onSubmit={(data) => guarded(async () => {
                await addSkillCategory(data);
                setAddingCategory(false);
              })}
              onCancel={() => setAddingCategory(false)}
            />
          )}
          {skillCategories.map((cat) => {
            const Icon = getIcon(cat.icon);
            return editingCategoryId === cat.id ? (
              <CategoryForm
                key={cat.id}
                initial={cat}
                onSubmit={(data) => guarded(async () => {
                  await editSkillCategory(cat.id, data);
                  setEditingCategoryId(null);
                })}
                onCancel={() => setEditingCategoryId(null)}
              />
            ) : (
              <div
                key={cat.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Icon size={16} />
                  </span>
                  <span className="font-medium text-slate-900 dark:text-white">{cat.name}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingCategoryId(cat.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => guarded(() => removeSkillCategory(cat.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          {skillCategories.length === 0 && !addingCategory && (
            <p className="text-sm text-slate-500">No categories yet — add one above before adding skills.</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Individual skills</h2>
          <div className="flex items-center gap-2">
            <ExportButtons columns={EXPORT_COLUMNS} rows={skills} filename="skills" title="Skills" />
            {!addingSkill && skillCategories.length > 0 && (
              <button
                onClick={() => setAddingSkill(true)}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950"
              >
                <Plus size={14} /> Add skill
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {addingSkill && (
            <SkillForm
              categories={skillCategories}
              onSubmit={(data) => guarded(async () => {
                await addSkill(data);
                setAddingSkill(false);
              })}
              onCancel={() => setAddingSkill(false)}
            />
          )}
          {skills.map((skill) =>
            editingSkillId === skill.id ? (
              <SkillForm
                key={skill.id}
                initial={skill}
                categories={skillCategories}
                onSubmit={(data) => guarded(async () => {
                  await editSkill(skill.id, data);
                  setEditingSkillId(null);
                })}
                onCancel={() => setEditingSkillId(null)}
              />
            ) : (
              <div
                key={skill.id}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{skill.skillName}</p>
                  <p className="text-xs text-slate-500">
                    {skill.category} · {skill.percentage}%
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingSkillId(skill.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => guarded(() => removeSkill(skill.id))}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )
          )}
          {skills.length === 0 && !addingSkill && (
            <p className="text-sm text-slate-500">No skills yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
