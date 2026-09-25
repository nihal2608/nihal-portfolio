import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useData } from "../data/DataContext";
import * as messagesApi from "../api/messagesApi";

export default function Contact() {
  const { profile } = useData();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    try {
      await messagesApi.createMessage(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } finally {
      setSending(false);
    }
  }

  const infoItems = [
    { icon: Mail, label: "Email", value: profile?.email || "—" },
    { icon: Phone, label: "Phone", value: profile?.phone || "—" },
    { icon: MapPin, label: "Location", value: profile?.location || "—" },
  ];

  return (
    <section id="contact" className="bg-slate-50 py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Work Together"
          subtitle="Have a project in mind? Send a message and I'll get back to you."
        />
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="space-y-5">
            {infoItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-white/5"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{label}</p>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400/60"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400/60"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Your message"
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400/60"
            />
            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:opacity-60 dark:from-cyan-400 dark:to-purple-500 dark:text-slate-950"
            >
              <Send size={16} />
              {sending ? "Sending…" : "Send Message"}
            </button>
            {sent && (
              <p className="text-center text-xs text-cyan-600 dark:text-cyan-400">
                Message sent — thanks for reaching out!
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
