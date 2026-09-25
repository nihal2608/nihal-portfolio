import { http } from "./http";

// POST /api/auth/register  { fullName, email, password } -> string message
export function register({ fullName, email, password }) {
  return http.post("/api/auth/register", { fullName, email, password });
}

// POST /api/auth/login  { email, password } -> { token, type, fullName, email, role }
export function login({ email, password }) {
  return http.post("/api/auth/login", { email, password });
}
