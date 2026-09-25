import React, { useState } from "react";
import { Check } from "lucide-react";
import { useData } from "../data/DataContext";

export default function AdminSettings() {
  const { contactInfo, updateContactInfo } = useData();
  const [form, setForm] = useState(contactInfo);
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateContactInfo(form);
    setSaved(true);
  }

  const fields = [
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "location", label: "Location" },
    { name: "github", label: "GitHub URL" },
    { name: "linkedin", label: "LinkedIn URL" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <p className="mt-1 text-sm text-slate-400">Contact details shown on your site.</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4">
        {fields.map(({ name, label }) => (
          <div key={name}>
            <label className="text-xs font-medium text-slate-400">{label}</label>
            <input
              name={name}
              value={form[name] || ""}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/60"
            />
          </div>
        ))}

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2.5 text-xs font-semibold text-slate-950"
        >
          <Check size={14} /> Save changes
        </button>
        {saved && <p className="text-xs text-cyan-400">Saved.</p>}
      </form>
    </div>
  );
}
