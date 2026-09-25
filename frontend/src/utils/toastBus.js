// A tiny event bus. http.js lives outside the React tree (it's a plain
// axios instance), so it can't call useContext directly. It just "emits" a
// toast event here; ToastContext subscribes to this bus and actually
// renders the popup.
let listeners = [];

export function emitToast(type, message) {
  listeners.forEach((cb) => cb(type, message));
}

export function subscribeToast(callback) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}
