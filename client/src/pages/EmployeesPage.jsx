import React, { useState } from "react";
import {
  Edit2,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Plus,
  X,
  ArrowLeft,
  Calendar,
  CreditCard,
  User,
} from "lucide-react";

const EmployeesPage = () => {
  const generateWorkerId = () =>
    `MONA-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

  const [employees, setEmployees] = useState([
    {
      id: 1,
      workerId: "MONA-2026-001",
      name: "Rahul Kumar",
      role: "LEAD DESIGNER",
      status: "Active",
      phone: "9876543210",
      email: "rahul@mona.com",
      address: "Kochi, Kerala",
      salary: "45000",
      salaryType: "Monthly",
      payments: [
        {
          id: 1,
          date: "2026-04-01",
          amount: "45000",
          status: "Paid",
          method: "Bank Transfer",
        },
        {
          id: 2,
          date: "2026-03-01",
          amount: "45000",
          status: "Paid",
          method: "Cash",
        },
      ],
      attendance: [
        { date: "28", status: "P" },
        { date: "27", status: "P" },
        { date: "26", status: "A" },
      ],
    },
    {
      id: 2,
      workerId: "MONA-2026-002",
      name: "Suresh P.",
      role: "CARPENTER",
      status: "Active",
      phone: "9845012345",
      email: "",
      address: "Trivandrum, Kerala",
      salary: "800",
      salaryType: "Daily",
      payments: [],
      attendance: [],
    },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    email: "",
    address: "",
    salary: "",
    salaryType: "Monthly",
    status: "Active",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId
            ? { ...formData, id: editingId, workerId: emp.workerId }
            : emp,
        ),
      );
    } else {
      setEmployees([
        ...employees,
        {
          ...formData,
          id: Date.now(),
          workerId: generateWorkerId(),
          payments: [],
          attendance: [],
        },
      ]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      name: "",
      role: "",
      phone: "",
      email: "",
      address: "",
      salary: "",
      salaryType: "Monthly",
      status: "Active",
    });
  };

  // --- Profile View: Styled exactly like the screenshot ---
  if (selectedEmployee) {
    return (
      <div className="p-10 bg-white min-h-screen">
        <button
          onClick={() => setSelectedEmployee(null)}
          className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 mb-8 font-bold transition"
        >
          <ArrowLeft size={18} /> Back to Staff List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: ID Card and Contact */}
          <div className="lg:col-span-4 space-y-8">
            {/* Employee ID Card */}
            <div className="border border-slate-900 rounded-[40px] p-10 text-center">
              <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <User size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 mb-1">
                {selectedEmployee.name}
              </h2>
              <p className="text-indigo-600 font-black text-sm tracking-widest uppercase mb-4">
                {selectedEmployee.role}
              </p>
              <div className="inline-block px-4 py-1 bg-slate-50 border border-slate-100 rounded-full text-[11px] font-bold text-slate-400">
                ID: {selectedEmployee.workerId}
              </div>
            </div>

            {/* Contact Details Card */}
            <div className="border border-slate-900 rounded-[40px] p-8">
              <h3 className="font-black text-slate-900 mb-6 border-b border-slate-900 pb-4">
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <Phone size={18} /> {selectedEmployee.phone}
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <Mail size={18} /> {selectedEmployee.email || "N/A"}
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MapPin size={18} /> {selectedEmployee.address}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-8 space-y-8">
            {/* Payment History Card */}
            <div className="border border-slate-900 rounded-[40px] overflow-hidden">
              <div className="p-6 px-8 border-b border-slate-900 flex items-center gap-3 font-black text-slate-900">
                <CreditCard size={20} className="text-indigo-500" /> Payment
                History
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-slate-400 text-[11px] font-black uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-4">Date</th>
                      <th className="px-8 py-4">Method</th>
                      <th className="px-8 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedEmployee.payments.map((p) => (
                      <tr key={p.id}>
                        <td className="px-8 py-6 text-slate-600 font-medium">
                          {p.date}
                        </td>
                        <td className="px-8 py-6 text-slate-500">{p.method}</td>
                        <td className="px-8 py-6 text-right font-black text-emerald-600 text-lg">
                          ₹{p.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Attendance History Card */}
            <div className="border border-slate-900 rounded-[40px] overflow-hidden">
              <div className="p-6 px-8 border-b border-slate-900 flex items-center gap-3 font-black text-slate-900">
                <Calendar size={20} className="text-orange-500" /> Attendance
                History
              </div>
              <div className="p-8 flex gap-3">
                {selectedEmployee.attendance.map((a, i) => (
                  <div
                    key={i}
                    className="w-16 border border-slate-900 rounded-2xl p-2 text-center bg-white shadow-sm"
                  >
                    <p className="text-[10px] text-slate-300 font-black mb-1">
                      {a.date}
                    </p>
                    <p
                      className={`text-sm font-black ${a.status === "P" ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {a.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main List View (Unchanged from previous logic, just ensuring layout) ---
  return (
    <div className="p-10 bg-white min-h-screen">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Staff Management
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Track contact details, roles, and payroll types.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg flex items-center gap-2 transition"
        >
          <Plus size={22} /> Add Employee
        </button>
      </div>

      <div className="border border-slate-900 rounded-[40px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] font-black uppercase tracking-[0.1em] border-b border-slate-100">
              <th className="px-10 py-6">Employee Info</th>
              <th className="px-10 py-6">Contact</th>
              <th className="px-10 py-6">Role & Status</th>
              <th className="px-10 py-6">Salary</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-10 py-8">
                  <button
                    onClick={() => setSelectedEmployee(emp)}
                    className="block font-black text-slate-900 text-lg hover:text-indigo-600 transition"
                  >
                    {emp.name}
                  </button>
                  <div className="flex items-center gap-1 text-slate-400 text-xs mt-1">
                    <MapPin size={14} /> {emp.address}
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
                    <Phone size={16} className="text-indigo-400" /> {emp.phone}
                  </div>
                  {emp.email && (
                    <div className="flex items-center gap-3 text-slate-400 text-xs mt-2">
                      <Mail size={16} /> {emp.email}
                    </div>
                  )}
                </td>
                <td className="px-10 py-8">
                  <div className="text-slate-900 font-bold text-sm">
                    {emp.role}
                  </div>
                  <div className="mt-2">
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
                      {emp.status}
                    </span>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <div className="text-slate-900 font-black text-xl">
                    ₹{emp.salary}
                  </div>
                  <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                    {emp.salaryType}
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => {
                        setFormData(emp);
                        setEditingId(emp.id);
                        setIsModalOpen(true);
                      }}
                      className="text-slate-300 hover:text-indigo-600 transition"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setEmployees(employees.filter((e) => e.id !== emp.id))
                      }
                      className="text-slate-300 hover:text-red-500 transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal - Keeps logic, uses styled layout */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-10 rounded-[40px] w-full max-w-2xl shadow-2xl relative border border-slate-900"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-bold mb-10 text-slate-900">
              {editingId ? "Update Employee" : "New Staff Entry"}
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <input
                  required
                  placeholder="Full Name"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Address"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Phone"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <input
                  placeholder="Email (Optional)"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-6">
                <input
                  required
                  placeholder="Job Role"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <select
                    className="p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200"
                    value={formData.salaryType}
                    onChange={(e) =>
                      setFormData({ ...formData, salaryType: e.target.value })
                    }
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Daily">Daily</option>
                  </select>
                </div>
                <input
                  required
                  type="number"
                  placeholder="Salary Amount (₹)"
                  className="w-full p-4 border rounded-2xl bg-slate-50 focus:bg-white transition outline-none border-slate-200 focus:border-indigo-500"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-5 rounded-[25px] font-bold text-lg mt-12 hover:bg-indigo-700 shadow-xl transition"
            >
              {editingId
                ? "Save Employee Changes"
                : "Confirm Staff Registration"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
