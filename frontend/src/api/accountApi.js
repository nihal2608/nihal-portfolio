import { http } from "./http";

// GET /api/account/me -> UserResponse
export function getMyAccount() {
  return http.get("/api/account/me");
}

// PUT /api/account/profile { fullName } -> UserResponse
export function updateMyProfile(payload) {
  return http.put("/api/account/profile", payload);
}

// PUT /api/account/password { oldPassword, newPassword } -> string message
export function changeMyPassword(payload) {
  return http.put("/api/account/password", payload);
}
