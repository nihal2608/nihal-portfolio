import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as profileApi from "../api/profileApi";
import * as skillsApi from "../api/skillsApi";
import * as projectsApi from "../api/projectsApi";
import { EXPERIENCE as SEED_EXPERIENCE } from "./content";

const DataContext = createContext(null);

// Experience has no backend endpoint yet, so it stays local to the browser
// for now (Messages moved to the real backend — see api/messagesApi.js).
const EXPERIENCE_KEY = "portfolio_experience_v1";

function loadLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function DataProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState(() => loadLocal(EXPERIENCE_KEY, SEED_EXPERIENCE));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [profileRes, categoriesRes, skillsRes, projectsRes] = await Promise.all([
        profileApi.getProfile().catch(() => null),
        skillsApi.getSkillCategories().catch(() => []),
        skillsApi.getSkills().catch(() => []),
        projectsApi.getProjects().catch(() => []),
      ]);
      setProfile(profileRes);
      setSkillCategories(categoriesRes || []);
      setSkills(skillsRes || []);
      setProjects(projectsRes || []);
    } catch (e) {
      setError(e.message || "Could not reach the backend. Is it running on the configured URL?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    localStorage.setItem(EXPERIENCE_KEY, JSON.stringify(experience));
  }, [experience]);

  // Skill groups shaped the way the public Skills section expects: one card
  // per category, with its skills nested inside.
  const skillGroups = skillCategories.map((cat) => ({
    id: cat.id,
    title: cat.name,
    icon: cat.icon || "code",
    displayOrder: cat.displayOrder,
    items: skills
      .filter((s) => s.category === cat.name)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
      .map((s) => ({ id: s.id, name: s.skillName, percentage: s.percentage })),
  }));

  // ---- Profile ----
  async function saveProfile(payload) {
    const result = profile
      ? await profileApi.updateProfile(profile.id, payload)
      : await profileApi.createProfile(payload);
    setProfile(result);
    return result;
  }
  async function uploadProfileImage(file) {
    const url = await profileApi.uploadProfileImage(file);
    setProfile((p) => (p ? { ...p, profileImage: url } : p));
    return url;
  }
  async function uploadResume(file) {
    const url = await profileApi.uploadResume(file);
    setProfile((p) => (p ? { ...p, resume: url } : p));
    return url;
  }

  // ---- Skill categories ----
  async function addSkillCategory(payload) {
    const created = await skillsApi.createSkillCategory(payload);
    setSkillCategories((c) => [...c, created]);
    return created;
  }
  async function editSkillCategory(id, payload) {
    const updated = await skillsApi.updateSkillCategory(id, payload);
    setSkillCategories((c) => c.map((cat) => (cat.id === id ? updated : cat)));
    return updated;
  }
  async function removeSkillCategory(id) {
    await skillsApi.deleteSkillCategory(id);
    setSkillCategories((c) => c.filter((cat) => cat.id !== id));
  }

  // ---- Skills ----
  async function addSkill(payload) {
    const created = await skillsApi.createSkill(payload);
    setSkills((s) => [...s, created]);
    return created;
  }
  async function editSkill(id, payload) {
    const updated = await skillsApi.updateSkill(id, payload);
    setSkills((s) => s.map((sk) => (sk.id === id ? updated : sk)));
    return updated;
  }
  async function removeSkill(id) {
    await skillsApi.deleteSkill(id);
    setSkills((s) => s.filter((sk) => sk.id !== id));
  }

  // ---- Projects ----
  async function addProject(payload) {
    const created = await projectsApi.createProject(payload);
    setProjects((p) => [...p, created]);
    return created;
  }
  async function editProject(id, payload) {
    const updated = await projectsApi.updateProject(id, payload);
    setProjects((p) => p.map((proj) => (proj.id === id ? updated : proj)));
    return updated;
  }
  async function removeProject(id) {
    await projectsApi.deleteProject(id);
    setProjects((p) => p.filter((proj) => proj.id !== id));
  }
  // "Like" a project = toggle its `featured` flag (the API already tracks this).
  async function toggleProjectFeatured(project) {
    const { id, ...rest } = project;
    const updated = await projectsApi.updateProject(id, { ...rest, featured: !project.featured });
    setProjects((p) => p.map((proj) => (proj.id === id ? updated : proj)));
    return updated;
  }

  // ---- Experience (local only — no backend endpoint yet) ----
  const addExperience = (exp) => setExperience((e) => [...e, { ...exp, id: uid("exp") }]);
  const updateExperience = (id, updates) =>
    setExperience((e) => e.map((x) => (x.id === id ? { ...x, ...updates } : x)));
  const deleteExperience = (id) => setExperience((e) => e.filter((x) => x.id !== id));

  return (
    <DataContext.Provider
      value={{
        loading,
        error,
        reload: loadAll,
        profile,
        saveProfile,
        uploadProfileImage,
        uploadResume,
        skillCategories,
        skills,
        skillGroups,
        addSkillCategory,
        editSkillCategory,
        removeSkillCategory,
        addSkill,
        editSkill,
        removeSkill,
        projects,
        addProject,
        editProject,
        removeProject,
        toggleProjectFeatured,
        experience,
        addExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside a <DataProvider>");
  return ctx;
}
