import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import CRMPage from "./pages/CRMPage";
import BillingPage from "./pages/BillingPage";
import QuotationPage from "./pages/QuotationPage";
import ExpensePage from "./pages/ExpensePage";
import CompletedProjectsPage from "./pages/CompletedProjectsPage"; // 1. Added Import
import AccountsPage from "./pages/AccountsPage"; // 2. Added Import
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import SalaryPage from "./pages/SalaryPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crm" element={<CRMPage />} />

            <Route path="/billing" element={<BillingPage />} />
            <Route path="/quotations" element={<QuotationPage />} />
            <Route path="/expenses" element={<ExpensePage />} />

            {/* 3. New Project & Compliance Routes */}
            <Route
              path="/completed-projects"
              element={<CompletedProjectsPage />}
            />
            <Route path="/accounts" element={<AccountsPage />} />

            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/salary" element={<SalaryPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            {/* Redirect any bad URL to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
