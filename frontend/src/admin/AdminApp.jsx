import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminProjects from "./AdminProjects";
import AdminSkills from "./AdminSkills";
import AdminExperience from "./AdminExperience";
import AdminMessages from "./AdminMessages";
import AdminProfile from "./AdminProfile";
import AdminUsers from "./AdminUsers";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="register" element={<AdminRegister />} />
      <Route
        path="*"
        element={
          <RequireAuth>
            <AdminLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="users" element={<AdminUsers />} />
              </Routes>
            </AdminLayout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
