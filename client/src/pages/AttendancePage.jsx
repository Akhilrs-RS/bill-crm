import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  CheckCircle,
  History,
  Users,
  CalendarDays,
  ArrowLeft,
  X,
  Phone,
  Briefcase,
  Wallet,
} from "lucide-react";

export default function AttendancePage() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [employeeFilter, setEmployeeFilter] = useState("All Employees");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("mark");

  // NEW STATE: Selected Employee for Profile Deep-dive
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      name: "Kamal Singh",
      phone: "9876543217",
      category: "Helper",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
      baseSalary: "12,000",
    },
    {
      id: 2,
      name: "Mahesh Singh",
      phone: "9876543214",
      category: "Carpenter",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
      baseSalary: "22,000",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      phone: "9876543215",
      category: "Designer",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
      baseSalary: "35,000",
    },
    {
      id: 4,
      name: "Suresh Yadav",
      phone: "9876543216",
      category: "Supervisor",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
      baseSalary: "28,000",
    },
    {
      id: 5,
      name: "Vijay Kumar",
      phone: "9876543218",
      category: "Mason",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
      baseSalary: "18,000",
    },
  ]);

  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.phone.includes(searchTerm);
    const matchesCategory =
      employeeFilter === "All Employees" || record.category === employeeFilter;
    const matchesStatus =
      statusFilter === "All Status" || record.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalEmployees = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(
    (r) => r.status === "present",
  ).length;
  const absentCount = totalEmployees - presentCount;
  const isHistoryMode = selectedDate !== today || viewMode === "history";

  const StatCard = ({ title, value, color, icon: Icon }) => (
    <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex flex-col justify-between h-36">
      <div className="flex justify-between items-center text-sm font-bold text-slate-400 uppercase tracking-widest">
        {title}
        {Icon && <Icon size={18} className="text-slate-300" />}
      </div>
      <div className={`text-5xl font-black ${color}`}>{value}</div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans relative text-slate-900">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
            {isHistoryMode ? (
              <History className="text-orange-500" />
            ) : (
              <Users className="text-blue-600" />
            )}
            {isHistoryMode ? "Attendance Logs" : "Daily Attendance"}
          </h1>
          <p className="text-slate-500 font-medium mt-1 uppercase text-xs tracking-wider">
            {isHistoryMode
              ? `Viewing Archive: ${selectedDate}`
              : "Operations Dashboard / Current Shift"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isHistoryMode ? (
            <button
              onClick={() => {
                setSelectedDate(today);
                setViewMode("mark");
              }}
              className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition hover:bg-slate-800"
            >
              <ArrowLeft size={18} /> Back to Today
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  setAttendanceRecords((prev) =>
                    prev.map((r) => ({ ...r, status: "present" })),
                  )
                }
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                Mark All Present
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg flex items-center gap-2 transition hover:bg-blue-700">
                <CheckCircle size={20} /> Save Attendance
              </button>
            </>
          )}
        </div>
      </div>

      {/* SUMMARY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex flex-col justify-between h-36">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Calendar Interface
          </div>
          <div className="relative flex items-center gap-3">
            <CalendarDays className="text-indigo-500" size={24} />
            <input
              type="date"
              value={selectedDate}
              max={today}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-xl font-black bg-transparent outline-none cursor-pointer focus:text-indigo-600"
            />
          </div>
        </div>
        <StatCard
          title="Present"
          value={presentCount}
          color="text-emerald-500"
        />
        <StatCard title="Absent" value={absentCount} color="text-red-500" />
        <StatCard
          title="Total Staff"
          value={totalEmployees}
          color="text-slate-900"
        />
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
              className="p-4 border border-slate-100 rounded-2xl bg-slate-50 text-xs font-bold uppercase outline-none min-w-[160px]"
            >
              {[
                "All Employees",
                "Helper",
                "Carpenter",
                "Designer",
                "Supervisor",
                "Mason",
              ].map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-4 border border-slate-100 rounded-2xl bg-slate-50 text-xs font-bold uppercase outline-none min-w-[160px]"
            >
              {["All Status", "present", "absent"].map((o) => (
                <option key={o} value={o}>
                  {o.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-6 py-6 text-center">Staff Profile</th>
                <th className="px-6 py-6">Category</th>
                <th className="px-6 py-6">Daily Status</th>
                <th className="px-6 py-6">Overtime</th>
                <th className="px-6 py-6 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  <td
                    className="px-6 py-6 cursor-pointer"
                    onClick={() => setSelectedEmployee(item)}
                  >
                    <div className="font-black text-slate-900 text-base group-hover:text-blue-600 transition-colors underline decoration-slate-200 underline-offset-4">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                      View Deep-dive Profile
                    </div>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-600 text-sm">
                    {item.category}
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${item.status === "present" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-500 text-sm">
                    {item.overtime}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <select
                      disabled={isHistoryMode}
                      className={`p-2 border border-slate-200 rounded-xl bg-white text-[10px] font-black uppercase ${isHistoryMode ? "opacity-30" : "cursor-pointer"}`}
                    >
                      <option>Present</option>
                      <option>Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* EMPLOYEE PROFILE DEEP-DIVE MODAL */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-black tracking-tighter">
                  {selectedEmployee.name}
                </h2>
                <div className="flex gap-4 mt-2">
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Phone size={14} /> {selectedEmployee.phone}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    <Briefcase size={14} /> {selectedEmployee.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-8">
              {/* Stats Section */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-1">
                    <Wallet size={14} /> Base Salary
                  </div>
                  <div className="text-xl font-black">
                    ₹{selectedEmployee.baseSalary}
                  </div>
                </div>
                <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase mb-1">
                    <CheckCircle size={14} /> Status
                  </div>
                  <div className="text-xl font-black text-emerald-600 uppercase">
                    Verified Member
                  </div>
                </div>
              </div>

              {/* Visual Attendance Grid (Current Month Simulation) */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Visual Attendance Grid (May 2026)
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }).map((_, i) => {
                    const status = Math.random() > 0.15 ? "P" : "A";
                    return (
                      <div
                        key={i}
                        className={`h-10 flex items-center justify-center rounded-xl text-xs font-black border transition-all hover:scale-110 ${status === "P" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}
                      >
                        {i + 1}
                        <br />
                        {status}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Payment History Placeholder */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
                  Payment History
                </h3>
                <div className="space-y-2">
                  {["April", "March", "February"].map((month) => (
                    <div
                      key={month}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                      <span className="font-bold text-sm uppercase tracking-tight">
                        {month} 2026 Payout
                      </span>
                      <span className="text-sm font-black text-blue-600">
                        COMPLETED
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
