import { http, toFormData } from "./http";

// GET /api/profile -> ProfileResponse
export function getProfile() {
  return http.get("/api/profile");
}

// POST /api/profile  (create, first-time setup) -> ProfileResponse
export function createProfile(payload) {
  return http.post("/api/profile", payload);
}

// PUT /api/profile/{id} -> ProfileResponse
export function updateProfile(id, payload) {
  return http.put(`/api/profile/${id}`, payload);
}

// DELETE /api/profile/{id}
export function deleteProfile(id) {
  return http.delete(`/api/profile/${id}`);
}

// POST /api/profile/upload/profile-image (multipart) -> string URL
export function uploadProfileImage(file) {
  return http.post("/api/profile/upload/profile-image", toFormData(file), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

// POST /api/profile/upload/resume (multipart) -> string URL
export function uploadResume(file) {
  return http.post("/api/profile/upload/resume", toFormData(file), {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
