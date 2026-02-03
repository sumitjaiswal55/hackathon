import { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleNavigation = (page: string, data?: any) => {
    setCurrentPage(page);
    if (data) {
      setSelectedProperty(data);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar currentPage={currentPage} onNavigate={handleNavigation} />
      
      {currentPage === "landing" && <LandingPage onNavigate={handleNavigation} />}
      {currentPage === "login" && <LoginPage onNavigate={handleNavigation} />}
      {currentPage === "dashboard" && <DashboardPage onNavigate={handleNavigation} />}
      {currentPage === "search" && <SearchPage onNavigate={handleNavigation} />}
      {currentPage === "property-detail" && (
        <PropertyDetailPage property={selectedProperty} onNavigate={handleNavigation} />
      )}
      {currentPage === "payments" && <PaymentsPage onNavigate={handleNavigation} />}
      {currentPage === "expenses" && <ExpensesPage onNavigate={handleNavigation} />}
      {currentPage === "mess" && <MessPage onNavigate={handleNavigation} />}
      {currentPage === "admin" && <AdminDashboard onNavigate={handleNavigation} />}
    </div>
  );
}
