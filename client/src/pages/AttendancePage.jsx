import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  CheckCircle,
  History,
  Users,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

export default function AttendancePage() {
  // 1. STATE MANAGEMENT
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [employeeFilter, setEmployeeFilter] = useState("All Employees");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("mark"); // 'mark' or 'history'

  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      name: "Kamal Singh",
      phone: "9876543217",
      category: "Helper",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
    },
    {
      id: 2,
      name: "Mahesh Singh",
      phone: "9876543214",
      category: "Carpenter",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
    },
    {
      id: 3,
      name: "Ravi Kumar",
      phone: "9876543215",
      category: "Designer",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
    },
    {
      id: 4,
      name: "Suresh Yadav",
      phone: "9876543216",
      category: "Supervisor",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
    },
    {
      id: 5,
      name: "Vijay Kumar",
      phone: "9876543218",
      category: "Mason",
      status: "present",
      overtime: "0.00 hrs",
      remarks: "-",
    },
  ]);

  // 2. SEARCH & FILTER LOGIC
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

  // 3. SUMMARY STATS
  const totalEmployees = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(
    (r) => r.status === "present",
  ).length;
  const absentCount = totalEmployees - presentCount;

  // 4. HELPERS
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
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            {isHistoryMode ? (
              <History className="text-orange-500" />
            ) : (
              <Users className="text-blue-600" />
            )}
            {isHistoryMode ? "Attendance Logs" : "Daily Attendance"}
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {isHistoryMode
              ? `Viewing history for ${selectedDate}`
              : "Mark attendance for today's shift"}
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

      {/* TOP GRID (DATE & SUMMARY) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm flex flex-col justify-between h-36">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Selected Date
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
          {/* SEARCH BAR */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-all"
            />
          </div>

          {/* DROPDOWNS */}
          <div className="flex gap-4">
            <div className="relative w-44">
              <select
                value={employeeFilter}
                onChange={(e) => setEmployeeFilter(e.target.value)}
                className="w-full p-4 border border-slate-100 rounded-2xl appearance-none bg-slate-50 text-xs font-bold uppercase tracking-wider outline-none"
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
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={16}
              />
            </div>

            <div className="relative w-44">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full p-4 border border-slate-100 rounded-2xl appearance-none bg-slate-50 text-xs font-bold uppercase tracking-wider outline-none"
              >
                {["All Status", "present", "absent"].map((o) => (
                  <option key={o} value={o}>
                    {o.toUpperCase()}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={16}
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                <th className="px-6 py-6">Staff Details</th>
                <th className="px-6 py-6">Category</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6">Overtime</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredRecords.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-6">
                    <div className="font-black text-slate-900 text-base">
                      {item.name}
                    </div>
                    <div className="text-xs font-bold text-slate-400">
                      {item.phone}
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-slate-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <span
                      className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === "present"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 font-bold text-slate-500 text-sm">
                    {item.overtime}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="relative inline-block w-32">
                      <select
                        disabled={isHistoryMode}
                        className={`w-full p-2 pl-3 pr-8 border border-slate-200 rounded-xl appearance-none bg-white text-[10px] font-bold uppercase transition ${isHistoryMode ? "opacity-30 cursor-not-allowed" : "hover:border-blue-400"}`}
                      >
                        <option>Present</option>
                        <option>Absent</option>
                      </select>
                      {!isHistoryMode && (
                        <ChevronDown
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                          size={14}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
