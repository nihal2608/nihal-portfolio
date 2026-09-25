import React from "react";
import { Routes, Route } from "react-router-dom";
import SiteApp from "./SiteApp";
import AdminApp from "./admin/AdminApp";

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<SiteApp />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}
