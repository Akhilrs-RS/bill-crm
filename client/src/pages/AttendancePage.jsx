import React, { useState } from "react";
import {
  Search,
  MapPin,
  CalendarDays,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

export default function AttendancePage() {
  // 1. STATE MANAGEMENT
  const today = new Date().toISOString().split("T")[0]; // format: YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);
  const [employeeFilter, setEmployeeFilter] = useState("All Employees");
  const [statusFilter, setStatusFilter] = useState("All Status");

  // 2. SAMPLE DATA (matches the names and structure from the image)
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

  // 3. CALCULATE SUMMARY STATS
  const totalEmployees = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(
    (r) => r.status === "present",
  ).length;
  const absentCount = totalEmployees - presentCount;

  // 4. ACTION HANDLERS
  const markAllPresent = () => {
    setAttendanceRecords((prev) =>
      prev.map((record) => ({ ...record, status: "present" })),
    );
  };

  const markAttendanceAction = () => {
    console.log("Saving attendance for date:", selectedDate, attendanceRecords);
    alert(`Attendance for ${selectedDate} saved to database.`);
  };

  // HELPER COMPONENT: Reusable Summary Card
  const StatCard = ({ title, value, color, children }) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
      <div className="text-sm font-medium text-slate-500">{title}</div>
      <div className={`text-5xl font-extrabold ${color}`}>
        {children || value}
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-slate-950">Attendance</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={markAllPresent}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Mark All Present
          </button>
          <button
            onClick={markAttendanceAction}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold flex items-center gap-2 text-sm"
          >
            <CheckCircle size={18} />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* TOP GRID (DATE & SUMMARY) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Date Selector Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-36">
          <div className="text-sm font-medium text-slate-500">Date</div>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full text-lg font-semibold bg-transparent appearance-none outline-none focus:text-blue-600"
            />
            {/* The calendar icon is handled by input type="date" natively in most browsers, simplified here */}
          </div>
        </div>

        {/* Present Card */}
        <StatCard title="Present" value={presentCount} color="text-green-600" />

        {/* Absent Card */}
        <StatCard title="Absent" value={absentCount} color="text-red-600" />

        {/* Total Employees Card */}
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          color="text-slate-900"
        />
      </div>

      {/* FILTERS AND TABLE SECTION */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        {/* Dropdown Filters */}
        <div className="flex gap-4 mb-8">
          {[
            {
              value: employeeFilter,
              setter: setEmployeeFilter,
              options: ["All Employees", "Helper", "Carpenter", "Designer"],
            },
            {
              value: statusFilter,
              setter: setStatusFilter,
              options: ["All Status", "present", "absent"],
            },
          ].map((filter, i) => (
            <div key={i} className="relative w-48">
              <select
                value={filter.value}
                onChange={(e) => filter.setter(e.target.value)}
                className="w-full p-3 pl-4 pr-10 border border-slate-200 rounded-xl appearance-none bg-slate-50 text-sm font-medium"
              >
                {filter.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>
          ))}
        </div>

        {/* THE ATTENDANCE TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-slate-100">
              <tr className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-4 py-4">Employee</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Overtime</th>
                <th className="px-4 py-4">Remarks</th>
                <th className="px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Name & Phone */}
                  <td className="px-4 py-5">
                    <div className="font-semibold text-slate-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-slate-500">{item.phone}</div>
                  </td>

                  {/* Category */}
                  <td className="px-4 py-5 text-sm text-slate-700">
                    {item.category}
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        item.status === "present"
                          ? "bg-green-100/70 text-green-700"
                          : "bg-red-100/70 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  {/* Overtime */}
                  <td className="px-4 py-5 text-sm text-slate-700">
                    {item.overtime}
                  </td>

                  {/* Remarks */}
                  <td className="px-4 py-5 text-sm text-slate-500">
                    {item.remarks}
                  </td>

                  {/* Action Dropdown */}
                  <td className="px-4 py-5">
                    <div className="relative w-32">
                      <select className="w-full p-2 pl-3 pr-8 border border-slate-200 rounded-lg appearance-none bg-white text-xs font-medium">
                        <option>Present</option>
                        <option>Absent</option>
                      </select>
                      <ChevronDown
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                        size={14}
                      />
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
