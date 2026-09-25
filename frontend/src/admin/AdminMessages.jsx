import React, { useEffect, useState } from "react";
import { Trash2, Mail, Reply, Check, X } from "lucide-react";
import * as messagesApi from "../api/messagesApi";
import ExportButtons from "./ExportButtons";

const EXPORT_COLUMNS = [
  { header: "Name", key: "name" },
  { header: "Email", key: "email" },
  { header: "Message", key: "message" },
  { header: "Replied", key: "repliedLabel" },
  { header: "Received", key: "createdAtLabel" },
];

function ReplyBox({ message, onSend, onCancel }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!text.trim()) return;
    setSending(true);
    try {
      await onSend(message.id, text.trim());
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mt-3 space-y-2 rounded-xl border border-cyan-400/30 bg-cyan-500/5 p-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        autoFocus
        placeholder={`Reply to ${message.name}…`}
        className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
      />
      <div className="flex gap-2">
        <button
          onClick={handleSend}
          disabled={sending}
          className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 px-3 py-1.5 text-xs font-semibold text-slate-950 disabled:opacity-60"
        >
          <Check size={13} /> {sending ? "Sending…" : "Send reply"}
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300"
        >
          <X size={13} /> Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyingId, setReplyingId] = useState(null);

  function load() {
    setLoading(true);
    messagesApi
      .getMessages()
      .then(setMessages)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleOpen(message) {
    if (!message.read) {
      const updated = await messagesApi.markRead(message.id);
      setMessages((prev) => prev.map((m) => (m.id === message.id ? updated : m)));
    }
  }

  async function handleReply(id, replyText) {
    const updated = await messagesApi.replyToMessage(id, replyText);
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    setReplyingId(null);
  }

  async function handleDelete(id) {
    await messagesApi.deleteMessage(id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }

  const exportRows = messages.map((m) => ({
    ...m,
    repliedLabel: m.replied ? "Yes" : "No",
    createdAtLabel: new Date(m.createdAt).toLocaleString(),
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Messages</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Submissions from your site&apos;s contact form. Click one to mark it read, or reply directly.
          </p>
        </div>
        <ExportButtons columns={EXPORT_COLUMNS} rows={exportRows} filename="messages" title="Messages" />
      </div>

      {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      {loading && <p className="mt-3 text-sm text-slate-500">Loading…</p>}

      <div className="mt-6 space-y-3">
        {messages.length === 0 && !loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
            <Mail className="mx-auto text-slate-400 dark:text-slate-600" size={28} />
            <p className="mt-3 text-sm text-slate-500">
              No messages yet. They&apos;ll show up here as visitors submit your contact form.
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            onClick={() => handleOpen(m)}
            className={`cursor-pointer rounded-2xl border p-5 transition-colors ${
              m.read
                ? "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
                : "border-cyan-400/40 bg-cyan-500/5 dark:bg-cyan-500/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  {!m.read && <span className="h-2 w-2 rounded-full bg-cyan-500" />}
                  <p className="font-bold text-slate-900 dark:text-white">{m.name}</p>
                </div>
                <a
                  href={`mailto:${m.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-cyan-600 dark:text-cyan-400"
                >
                  {m.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">
                  {new Date(m.createdAt).toLocaleString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setReplyingId(replyingId === m.id ? null : m.id);
                  }}
                  aria-label="Reply"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Reply size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(m.id);
                  }}
                  aria-label="Delete message"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{m.message}</p>

            {m.replied && (
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold text-slate-500">
                  Your reply · {new Date(m.repliedAt).toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{m.replyText}</p>
              </div>
            )}

            {replyingId === m.id && (
              <div onClick={(e) => e.stopPropagation()}>
                <ReplyBox message={m} onSend={handleReply} onCancel={() => setReplyingId(null)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
