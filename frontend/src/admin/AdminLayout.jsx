import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  History,
  Mail,
  LogOut,
  Home,
  Sun,
  Moon,
  User,
  ChevronDown,
  Settings,
  Users,
  Bell,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useData } from "../data/DataContext";
import * as messagesApi from "../api/messagesApi";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true, module: null },
  { to: "/admin/projects", label: "Projects", icon: Briefcase, module: "PROJECTS" },
  { to: "/admin/skills", label: "Skills", icon: Sparkles, module: "SKILLS" },
  { to: "/admin/experience", label: "Experience", icon: History, module: "EXPERIENCE" },
  { to: "/admin/messages", label: "Messages", icon: Mail, module: "MESSAGES" },
  { to: "/admin/users", label: "Users", icon: Users, module: "USERS" },
];

function ProfileMenu() {
  const { user, logout } = useAuth();
  const { profile } = useData();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const displayName = profile?.fullName || user?.fullName || "Account";

  function handleLogout() {
    logout();
    navigate("/admin/login");
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white hover:border-cyan-400/40"
      >
        {profile?.profileImage ? (
          <img src={profile.profileImage} alt="" className="h-7 w-7 rounded-full object-cover" />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
            <User size={14} />
          </span>
        )}
        <span className="hidden max-w-[9rem] truncate sm:inline">{displayName}</span>
        <ChevronDown size={14} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-xl">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="truncate text-sm font-medium text-white">{displayName}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
            {user?.role && (
              <span className="mt-1 inline-block rounded-full bg-cyan-500/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-400">
                {user.role}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/admin/profile");
            }}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <User size={15} /> View / edit profile
          </button>
          <a
            href="/"
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
          >
            <Home size={15} /> View live site
          </a>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={15} /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

function NotificationBell() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    function poll() {
      messagesApi
        .getUnreadCount()
        .then((n) => {
          if (!cancelled) setCount(n);
        })
        .catch(() => {});
    }

    poll();
    const interval = setInterval(poll, 20000); // real-time-ish: refresh every 20s
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <button
      onClick={() => navigate("/admin/messages")}
      aria-label="Notifications"
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
    >
      <Bell size={16} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

export default function AdminLayout({ children }) {
  const { isDark, toggleTheme } = useTheme();
  const { hasModule } = useAuth();

  const visibleItems = NAV_ITEMS.filter((item) => !item.module || hasModule(item.module));

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950">
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/60">
        <div className="flex items-center gap-2 px-2">
          <img src="/logo-mark.svg" alt="" className="h-8 w-8" />
          <span className="text-sm font-bold text-slate-900 dark:text-white">Admin panel</span>
        </div>

        <nav className="mt-8 flex-1 space-y-1">
          {visibleItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-1 border-t border-slate-200 pt-4 dark:border-white/10">
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
              }`
            }
          >
            <Settings size={17} />
            Profile & settings
          </NavLink>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white px-8 py-4 dark:border-white/10 dark:bg-slate-950">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 hover:text-cyan-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-400"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <NotificationBell />
          <ProfileMenu />
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
