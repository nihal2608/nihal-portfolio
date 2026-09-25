import axios from "axios";
import { emitToast } from "../utils/toastBus";

// Point this at your Spring Boot backend. Override via a .env file:
// VITE_API_BASE_URL=http://localhost:8080
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const http = axios.create({
  baseURL: BASE_URL,
});

// Attach the JWT (if we have one) to every request.
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Your backend wraps every response as { success, message, data }.
// Unwrap it here so the rest of the app just deals with `data` — and pop a
// toast for every response so the user always sees what happened, success
// or failure, without every screen having to handle it manually.
http.interceptors.response.use(
  (response) => {
    const body = response.data;
    const method = (response.config?.method || "get").toLowerCase();
    const isWrite = method !== "get";

    if (body && typeof body === "object" && "data" in body) {
      if (body.success === 0 || body.success === false) {
        emitToast("error", body.message || "Request failed");
        return Promise.reject(new Error(body.message || "Request failed"));
      }
      // Only toast on writes (create/update/delete/login/register) — toasting
      // every background GET (page loads, polling, etc.) would be noisy.
      if (isWrite) {
        emitToast("success", body.message || "Done.");
      }
      return body.data;
    }
    return body;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Something went wrong. Is the backend running?";

    // Errors always toast, GET or not — a failed page load is exactly the
    // kind of thing the user needs to be told about.
    emitToast("error", message);

    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }

    return Promise.reject(new Error(message));
  }
);

// Helper for multipart file uploads (thumbnails, images, resume, profile photo).
export function toFormData(file) {
  const formData = new FormData();
  formData.append("file", file);
  return formData;
}
