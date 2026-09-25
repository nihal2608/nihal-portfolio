import { http } from "./http";

// GET /api/activity?range=day|week|month -> [{ label, count }]
export function getActivity(range) {
  return http.get(`/api/activity?range=${range}`);
}
