import { http, toFormData } from "./http";

export function getProjects() {
  return http.get("/api/projects");
}
export function getProjectById(id) {
  return http.get(`/api/projects/${id}`);
}
export function createProject(payload) {
  return http.post("/api/projects", payload);
}
export function updateProject(id, payload) {
  return http.put(`/api/projects/${id}`, payload);
}
export function deleteProject(id) {
  return http.delete(`/api/projects/${id}`);
}
export function getLatestProjects() {
  return http.get("/api/projects/latest");
}
export function getFeaturedProjects() {
  return http.get("/api/projects/featured");
}
export function getProjectsByCategory(category) {
  return http.get(`/api/projects/category/${category}`);
}
export function uploadProjectThumbnail(file) {
  return http.post("/api/projects/upload/thumbnail", toFormData(file), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
export function uploadProjectImage(file) {
  return http.post("/api/projects/upload/image", toFormData(file), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
