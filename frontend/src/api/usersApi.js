import { http } from "./http";

// GET /api/users -> [UserResponse] (SUPER_ADMIN only)
export function getUsers() {
  return http.get("/api/users");
}

// PUT /api/users/{id}/modules { role, moduleIds } -> UserResponse
export function assignModules(id, payload) {
  return http.put(`/api/users/${id}/modules`, payload);
}
