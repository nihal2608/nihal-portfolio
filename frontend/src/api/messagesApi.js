import { http } from "./http";

// POST /api/messages { name, email, message } -> MessageResponse (public, contact form)
export function createMessage(payload) {
  return http.post("/api/messages", payload);
}

// GET /api/messages -> [MessageResponse] (admin inbox)
export function getMessages() {
  return http.get("/api/messages");
}

// GET /api/messages/unread-count -> number
export function getUnreadCount() {
  return http.get("/api/messages/unread-count");
}

// PUT /api/messages/{id}/read -> MessageResponse
export function markRead(id) {
  return http.put(`/api/messages/${id}/read`);
}

// POST /api/messages/{id}/reply { replyText } -> MessageResponse
export function replyToMessage(id, replyText) {
  return http.post(`/api/messages/${id}/reply`, { replyText });
}

// DELETE /api/messages/{id}
export function deleteMessage(id) {
  return http.delete(`/api/messages/${id}`);
}
