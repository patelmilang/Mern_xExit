import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HrDashboard from "./pages/HrDashboard";
import SubmitResignation from "./pages/SubmitResignation";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/employee" element={<ProtectedRoute role="Employee"><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="/hr" element={<ProtectedRoute role="HR"><HrDashboard /></ProtectedRoute>} />
          <Route path="/resignation/submit" element={<ProtectedRoute role="Employee"><SubmitResignation /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
