import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessMeal } from "@/app/components/pages/MessMeal";
import {ProfilePage} from "@/app/components/pages/ProfilePage";

// Pages & Components
import { Navbar } from "@/app/components/Navbar";
import { LandingPage } from "@/app/components/pages/LandingPage";
import { LoginPage } from "@/app/components/pages/LoginPage";
import { DashboardPage } from "@/app/components/pages/DashboardPage";
import { SearchPage } from "@/app/components/pages/SearchPage";
import { PropertyDetailPage } from "@/app/components/pages/PropertyDetailPage";
import { PaymentsPage } from "@/app/components/pages/PaymentsPage";
import { ExpensesPage } from "@/app/components/pages/ExpensesPage";
import { MessPage } from "@/app/components/pages/MessPage";
import { AdminDashboard } from "@/app/components/pages/AdminDashboard";

// --- Protected Route logic ---
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(!!localStorage.getItem("token"));

  // Check auth on load
  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, []);

  return (
    <Router> {/* <-- Sabse upar Router hona zaroori hai */}
      <div className="min-h-screen bg-background">
        
        {/* Navbar ko ab isAuth pass karenge taaki links control ho sakein */}
        <Navbar isAuth={isAuth} setIsAuth={setIsAuth} />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={isAuth ? <Navigate to="/dashboard" /> : <LoginPage setIsAuth={setIsAuth} />} 
          />

          {/* Protected Routes (Inke liye login hona zaruri hai) */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/property/:id" element={<ProtectedRoute><PropertyDetailPage /></ProtectedRoute>} />
          <Route path="/payments" element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} />
          <Route path="/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
          <Route path="/mess" element={<ProtectedRoute><MessPage /></ProtectedRoute>} />
          <Route path="/mess-meal" element={<ProtectedRoute><MessMeal /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}