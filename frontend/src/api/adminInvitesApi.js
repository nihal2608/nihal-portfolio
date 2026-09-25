import { http } from "./http";

// GET /api/admin-invites -> [AdminInviteResponse] (SUPER_ADMIN only)
export function getInvites() {
  return http.get("/api/admin-invites");
}

// POST /api/admin-invites { email, role, moduleIds } -> AdminInviteResponse
export function createInvite(payload) {
  return http.post("/api/admin-invites", payload);
}

// DELETE /api/admin-invites/{id}
export function revokeInvite(id) {
  return http.delete(`/api/admin-invites/${id}`);
}

// POST /api/admin-invites/{id}/resend
export function resendInvite(id) {
  return http.post(`/api/admin-invites/${id}/resend`);
}
