import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ForgeryDashboard } from "./pages/dashboard";
import { ForgeryDetails } from "./components/forgeryDetails";
import { PreviousForgeries } from "./components/ui/prevoiusForgeries";
import { Button } from "./components/ui/Button";
import { Italic } from "lucide-react";

export default function App() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <div className="w-64 bg-red-900 text-white flex flex-col">
          <label className="p-6 text-2xl font-bold border-b border-red-800">
            Dashboard
          </label>
       
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/"
              className="block px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Main
            </Link>
            <Link
              to="/previous"
              className="block px-4 py-2 rounded-lg hover:bg-red-700"
            >
              All Forgeries
            </Link>
           
          </nav>

          
          <label className={"mt-[50%] text-yellow-500"} >(from: coded-kevin)</label>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<ForgeryDashboard />} />
            <Route path="/previous" element={<PreviousForgeries />} />
            <Route path="/details/:id" element={<ForgeryDetails />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
}
