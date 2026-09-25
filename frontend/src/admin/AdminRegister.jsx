import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AdminRegister() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const invitedEmail = searchParams.get("email") || "";
  const [form, setForm] = useState({ fullName: "", email: invitedEmail, password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await register({ fullName: form.fullName, email: form.email, password: form.password });
      setSuccess("Account created. You can now sign in.");
      setTimeout(() => navigate("/admin/login"), 1200);
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8"
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
          <UserPlus size={20} />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold text-white">Create account</h1>
        <p className="mt-1 text-center text-sm text-slate-400">
          Register to get access to the admin panel.
        </p>

        {invitedEmail && (
          <p className="mt-4 rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-3 py-2 text-center text-xs text-cyan-300">
            You've been invited — your role and modules will be set up automatically once you register.
          </p>
        )}

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full name"
          autoFocus
          className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/60"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          readOnly={Boolean(invitedEmail)}
          className={`mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/60 ${
            invitedEmail ? "opacity-70" : ""
          }`}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/60"
        />
        <input
          type="password"
          name="confirm"
          value={form.confirm}
          onChange={handleChange}
          placeholder="Confirm password"
          className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-400/60"
        />
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        {success && <p className="mt-2 text-xs text-cyan-400">{success}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="mt-4 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link to="/admin/login" className="text-cyan-400 hover:underline">
            Sign in
          </Link>
        </p>
        <p className="mt-3 text-center text-[11px] text-slate-600">
          {invitedEmail
            ? "Your role and module access were already decided by whoever invited you."
            : <>Note: new accounts default to role <span className="font-mono">USER</span> unless you were invited by a SUPER_ADMIN.</>}
        </p>
      </form>
    </div>
  );
}
