// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Shield, History, Settings } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-red-900 text-white h-screen p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Forgery Admin</h1>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-800 ${
              isActive ? "bg-red-700" : ""
            }`
          }
        >
          <Shield size={18} /> Main
        </NavLink>
        <NavLink
          to="/previous"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-800 ${
              isActive ? "bg-red-700" : ""
            }`
          }
        >
          <History size={18} /> Previous Forgeries
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-800 ${
              isActive ? "bg-red-700" : ""
            }`
          }
        >
          <Settings size={18} /> Settings
        </NavLink>
      </nav>
    </div>
  );
};
