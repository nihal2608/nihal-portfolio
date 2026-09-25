import React, { useEffect, useState } from "react";
import { Check, ShieldCheck, Mail, Send, Trash2 } from "lucide-react";
import * as usersApi from "../api/usersApi";
import * as modulesApi from "../api/modulesApi";
import * as invitesApi from "../api/adminInvitesApi";
import { useAuth } from "../context/AuthContext";
import ExportButtons from "./ExportButtons";

const EXPORT_COLUMNS = [
  { header: "Name", key: "fullName" },
  { header: "Email", key: "email" },
  { header: "Role", key: "role" },
  { header: "Active", key: "activeLabel" },
  { header: "Modules", key: "modulesLabel" },
];

const ROLE_OPTIONS = ["USER", "ADMIN", "SUPER_ADMIN"];
const INVITE_ROLE_OPTIONS = ["ADMIN", "SUPER_ADMIN"];

function UserRow({ user, modules, onSave }) {
  const [role, setRole] = useState(user.role);
  const [selected, setSelected] = useState(new Set(user.modules || []));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleModule(name) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(user.id, { role, moduleIds: modules.filter((m) => selected.has(m.name)).map((m) => m.id) });
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">{user.fullName}</p>
          <p className="text-xs text-slate-500">{user.email}</p>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Joined {new Date(user.createdAt).toLocaleDateString()} ·{" "}
            <span className={user.active ? "text-cyan-600 dark:text-cyan-400" : "text-red-500"}>
              {user.active ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            setSaved(false);
          }}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
        >
          {ROLE_OPTIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Module access {isSuperAdmin && "(SUPER_ADMIN always has everything)"}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {modules.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                isSuperAdmin
                  ? "border-slate-200 text-slate-400 dark:border-white/10"
                  : selected.has(m.name)
                  ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
              }`}
            >
              <input
                type="checkbox"
                disabled={isSuperAdmin}
                checked={isSuperAdmin || selected.has(m.name)}
                onChange={() => toggleModule(m.name)}
                className="accent-cyan-500"
              />
              {m.name}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
        >
          <Check size={13} /> {saving ? "Saving…" : "Save"}
        </button>
        {saved && <span className="text-xs text-cyan-600 dark:text-cyan-400">Updated.</span>}
      </div>
    </div>
  );
}

function InviteForm({ modules, onCreate }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [selected, setSelected] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleModule(name) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError("");
    try {
      await onCreate({
        email: email.trim(),
        role,
        moduleIds: modules.filter((m) => selected.has(m.name)).map((m) => m.id),
      });
      setEmail("");
      setSelected(new Set());
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const isSuperAdminRole = role === "SUPER_ADMIN";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cyan-400/30 bg-white p-5 dark:bg-white/5"
    >
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <Send size={15} /> Invite a new admin
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Decide their role and module access now — it's applied automatically the moment they register with this email.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[12rem]">
          <label className="text-xs text-slate-500">Email to invite</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="colleague@example.com"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-cyan-500/60 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none dark:border-white/10 dark:bg-slate-900 dark:text-white"
          >
            {INVITE_ROLE_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Modules {isSuperAdminRole && "(SUPER_ADMIN gets everything automatically)"}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {modules.map((m) => (
            <label
              key={m.id}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                isSuperAdminRole
                  ? "border-slate-200 text-slate-400 dark:border-white/10"
                  : selected.has(m.name)
                  ? "border-cyan-400/60 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "border-slate-200 text-slate-500 dark:border-white/10 dark:text-slate-400"
              }`}
            >
              <input
                type="checkbox"
                disabled={isSuperAdminRole}
                checked={isSuperAdminRole || selected.has(m.name)}
                onChange={() => toggleModule(m.name)}
                className="accent-cyan-500"
              />
              {m.name}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-4 py-2 text-xs font-semibold text-slate-950 disabled:opacity-60"
      >
        <Send size={13} /> {submitting ? "Sending…" : "Create invite"}
      </button>
    </form>
  );
}

function PendingInvites({ invites, onRevoke, onResend }) {
  const pending = invites.filter((i) => !i.accepted);
  if (pending.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pending invites</h3>
      <div className="mt-3 space-y-2">
        {pending.map((invite) => (
          <div
            key={invite.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Mail size={14} />
              </span>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{invite.email}</p>
                <p className="text-xs text-slate-500">
                  {invite.role} · {invite.modules.join(", ") || "no modules"}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onResend(invite.id)}
                aria-label="Resend invite email"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-cyan-500 dark:border-white/10 dark:text-slate-300"
              >
                <Send size={14} />
              </button>
              <button
                onClick={() => onRevoke(invite.id)}
                aria-label="Revoke invite"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:text-red-500 dark:border-white/10 dark:text-slate-300"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const { isSuperAdmin } = useAuth();
  const [users, setUsers] = useState([]);
  const [modules, setModules] = useState([]);
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isSuperAdmin) return;
    Promise.all([usersApi.getUsers(), modulesApi.getModules(), invitesApi.getInvites()])
      .then(([u, m, i]) => {
        setUsers(u);
        setModules(m);
        setInvites(i);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isSuperAdmin]);

  async function handleSave(id, payload) {
    const updated = await usersApi.assignModules(id, payload);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  }

  async function handleCreateInvite(payload) {
    const created = await invitesApi.createInvite(payload);
    setInvites((prev) => [...prev, created]);
  }

  async function handleRevokeInvite(id) {
    await invitesApi.revokeInvite(id);
    setInvites((prev) => prev.filter((i) => i.id !== id));
  }

  async function handleResendInvite(id) {
    await invitesApi.resendInvite(id);
  }

  if (!isSuperAdmin) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-white/10 dark:bg-white/5">
        <ShieldCheck className="mx-auto text-slate-400" size={28} />
        <p className="mt-3 text-sm text-slate-500">
          Only a SUPER_ADMIN can manage users and module access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Users</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Assign roles and module access to each account, or invite someone new.
          </p>
        </div>
        <ExportButtons
          columns={EXPORT_COLUMNS}
          rows={users.map((u) => ({
            ...u,
            activeLabel: u.active ? "Yes" : "No",
            modulesLabel: (u.modules || []).join(", "),
          }))}
          filename="users"
          title="Users"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
      {loading && <p className="text-sm text-slate-500">Loading…</p>}

      <InviteForm modules={modules} onCreate={handleCreateInvite} />
      <PendingInvites invites={invites} onRevoke={handleRevokeInvite} onResend={handleResendInvite} />

      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Registered accounts</h3>
        <div className="mt-3 space-y-4">
          {users.map((u) => (
            <UserRow key={u.id} user={u} modules={modules} onSave={handleSave} />
          ))}
          {users.length === 0 && !loading && <p className="text-sm text-slate-500">No users yet.</p>}
        </div>
      </div>
    </div>
  );
}
