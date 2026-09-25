import React, { useEffect, useState } from "react";
import { Check, Upload, User, FileText, Info, Lock } from "lucide-react";
import { useData } from "../data/DataContext";
import { useAuth } from "../context/AuthContext";
import * as accountApi from "../api/accountApi";

const TABS = [
  { id: "info", label: "Profile info", icon: Info },
  { id: "media", label: "Photo & resume", icon: Upload },
  { id: "account", label: "Account", icon: User },
];

const EMPTY_PROFILE = {
  fullName: "",
  designation: "",
  about: "",
  email: "",
  phone: "",
  location: "",
  experienceYears: 0,
  github: "",
  linkedin: "",
  portfolio: "",
};

function ProfileInfoTab() {
  const { profile, saveProfile } = useData();
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (profile) setForm({ ...EMPTY_PROFILE, ...profile });
  }, [profile]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "experienceYears" ? Number(value) : value }));
    setSaved(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await saveProfile(form);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    { name: "fullName", label: "Full name", required: true },
    { name: "designation", label: "Designation (e.g. Java Backend Engineer)", required: true },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
    { name: "location", label: "Location" },
    { name: "experienceYears", label: "Years of experience", type: "number" },
    { name: "github", label: "GitHub URL" },
    { name: "linkedin", label: "LinkedIn URL" },
    { name: "portfolio", label: "Portfolio / other URL" },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map(({ name, label, type, required }) => (
          <div key={name} className={name === "fullName" || name === "designation" ? "sm:col-span-2" : ""}>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</label>
            <input
              type={type || "text"}
              name={name}
              required={required}
              value={form[name] ?? ""}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-cyan-400/60"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="text-xs font-medium text-slate-500 dark:text-slate-400">About / bio</label>
        <textarea
          name="about"
          required
          rows={4}
          value={form.about}
          onChange={handleChange}
          className="mt-1 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white dark:focus:border-cyan-400/60"
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-60 dark:from-cyan-400 dark:to-purple-500 dark:text-slate-950"
      >
        <Check size={14} /> {saving ? "Saving…" : "Save changes"}
      </button>
      {saved && <p className="text-xs text-cyan-600 dark:text-cyan-400">Saved.</p>}
    </form>
  );
}

function MediaTab() {
  const { profile, uploadProfileImage, uploadResume } = useData();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [error, setError] = useState("");

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    setError("");
    try {
      await uploadProfileImage(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleResumeChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    setError("");
    try {
      await uploadResume(file);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingResume(false);
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <User size={16} /> Profile photo
        </h3>
        <div className="mt-4 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-slate-800">
            {profile?.profileImage ? (
              <img src={profile.profileImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-slate-400">
                <User size={22} />
              </div>
            )}
          </div>
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-cyan-400/60 dark:border-white/10 dark:text-slate-300">
            <Upload size={14} />
            {uploadingImage ? "Uploading…" : "Upload photo"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <FileText size={16} /> Resume
        </h3>
        <div className="mt-4 flex items-center gap-4">
          {profile?.resume ? (
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-600 hover:underline dark:text-cyan-400"
            >
              View current resume
            </a>
          ) : (
            <span className="text-xs text-slate-500">No resume uploaded yet.</span>
          )}
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:border-cyan-400/60 dark:border-white/10 dark:text-slate-300">
            <Upload size={14} />
            {uploadingResume ? "Uploading…" : "Upload resume"}
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
          </label>
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function AccountTab() {
  const { user, updateStoredUser } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState("");

  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirm: "" });
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  async function handleNameSubmit(e) {
    e.preventDefault();
    setSavingName(true);
    setNameError("");
    try {
      const updated = await accountApi.updateMyProfile({ fullName });
      updateStoredUser({ fullName: updated.fullName });
      setNameSaved(true);
    } catch (err) {
      setNameError(err.message);
    } finally {
      setSavingName(false);
    }
  }

  async function handlePasswordSubmit(e) {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError("New passwords don't match.");
      return;
    }
    setSavingPassword(true);
    setPasswordError("");
    try {
      await accountApi.changeMyPassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordForm({ oldPassword: "", newPassword: "", confirm: "" });
      setPasswordSaved(true);
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div className="max-w-md space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <p className="text-xs text-slate-500">Email</p>
        <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.email}</p>
        <p className="mt-3 text-xs text-slate-500">Role</p>
        <span className="mt-1 inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">
          {user?.role}
        </span>
      </div>

      <form onSubmit={handleNameSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Your name</h3>
        <input
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            setNameSaved(false);
          }}
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
        />
        {nameError && <p className="mt-2 text-xs text-red-500">{nameError}</p>}
        <button
          type="submit"
          disabled={savingName}
          className="mt-3 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
        >
          <Check size={13} /> {savingName ? "Saving…" : "Save name"}
        </button>
        {nameSaved && <span className="ml-3 text-xs text-cyan-600 dark:text-cyan-400">Saved.</span>}
      </form>

      <form onSubmit={handlePasswordSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Lock size={15} /> Change password
        </h3>
        <div className="mt-3 space-y-2">
          <input
            type="password"
            placeholder="Current password"
            value={passwordForm.oldPassword}
            onChange={(e) => {
              setPasswordForm((f) => ({ ...f, oldPassword: e.target.value }));
              setPasswordSaved(false);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="password"
            placeholder="New password"
            value={passwordForm.newPassword}
            onChange={(e) => {
              setPasswordForm((f) => ({ ...f, newPassword: e.target.value }));
              setPasswordSaved(false);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={passwordForm.confirm}
            onChange={(e) => {
              setPasswordForm((f) => ({ ...f, confirm: e.target.value }));
              setPasswordSaved(false);
            }}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        {passwordError && <p className="mt-2 text-xs text-red-500">{passwordError}</p>}
        <button
          type="submit"
          disabled={savingPassword}
          className="mt-3 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
        >
          <Check size={13} /> {savingPassword ? "Updating…" : "Update password"}
        </button>
        {passwordSaved && <span className="ml-3 text-xs text-cyan-600 dark:text-cyan-400">Password updated.</span>}
      </form>
    </div>
  );
}

export default function AdminProfile() {
  const [tab, setTab] = useState("info");

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profile</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        This information appears on your public portfolio site.
      </p>

      <div className="mt-6 flex gap-2 border-b border-slate-200 dark:border-white/10">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium ${
              tab === id
                ? "border-cyan-500 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "info" && <ProfileInfoTab />}
        {tab === "media" && <MediaTab />}
        {tab === "account" && <AccountTab />}
      </div>
    </div>
  );
}
