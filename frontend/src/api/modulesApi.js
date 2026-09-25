import { http } from "./http";

// GET /api/modules -> [{ id, name, description }]
export function getModules() {
  return http.get("/api/modules");
}
