import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Briefcase,
  BarChart2,
  Menu,
  ChevronLeft,
  Wallet,
  MapPin, // Added for Attendance
} from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  // Keyboard Shortcut: Alt + S
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === "s") toggleSidebar();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const menuItems = [
    { path: "/", name: "Dashboard", icon: <LayoutDashboard size={22} /> },
    { path: "/crm", name: "CRM (Customers)", icon: <Users size={22} /> },
    {
      path: "/billing",
      name: "Billing & Quotes",
      icon: <FileText size={22} />,
    },
    { path: "/employees", name: "Employees", icon: <Briefcase size={22} /> },
    { path: "/attendance", name: "Attendance", icon: <MapPin size={22} /> }, // Added
    { path: "/salary", name: "Salary Management", icon: <Wallet size={22} /> },
    { path: "/reports", name: "Reports", icon: <BarChart2 size={22} /> },
  ];

  return (
    <nav
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-slate-900 text-white p-4 flex flex-col h-screen transition-all duration-300 relative shadow-xl`}
    >
      {/* Clickable Header Area */}
      <div
        onClick={toggleSidebar}
        className="mb-10 mt-2 px-2 flex items-center cursor-pointer group hover:bg-slate-800 rounded-xl p-2 transition"
        title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        <div
          className={`flex items-center gap-3 ${!isOpen ? "justify-center w-full" : ""}`}
        >
          <div className="text-blue-400">
            {isOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
          </div>
          {isOpen && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent whitespace-nowrap">
              Mona Interior
            </h2>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ul className="space-y-3 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                title={!isOpen ? item.name : ""}
                className={`flex items-center ${
                  isOpen ? "justify-start gap-4 px-4" : "justify-center px-2"
                } py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border-l-4 border-blue-500"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {item.icon}
                {isOpen && (
                  <span className="font-medium whitespace-nowrap text-sm">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
