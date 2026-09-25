import { http } from "./http";

// ---- Skill categories ----
export function getSkillCategories() {
  return http.get("/api/skill-categories");
}
export function createSkillCategory(payload) {
  return http.post("/api/skill-categories", payload);
}
export function updateSkillCategory(id, payload) {
  return http.put(`/api/skill-categories/${id}`, payload);
}
export function deleteSkillCategory(id) {
  return http.delete(`/api/skill-categories/${id}`);
}

// ---- Skills ----
export function getSkills() {
  return http.get("/api/skills");
}
export function getSkillById(id) {
  return http.get(`/api/skills/${id}`);
}
export function createSkill(payload) {
  return http.post("/api/skills", payload);
}
export function updateSkill(id, payload) {
  return http.put(`/api/skills/${id}`, payload);
}
export function deleteSkill(id) {
  return http.delete(`/api/skills/${id}`);
}
