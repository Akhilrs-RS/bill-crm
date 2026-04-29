import React, { useState } from "react";
import { Edit2, Trash2, Phone, Mail, MapPin, Plus, X } from "lucide-react";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      role: "Lead Designer",
      status: "Active",
      phone: "9876543210",
      email: "rahul@mona.com",
      address: "Kochi, Kerala",
      salary: "45000",
      salaryType: "Monthly",
    },
    {
      id: 2,
      name: "Suresh P.",
      role: "Carpenter",
      status: "Active",
      phone: "9845012345",
      email: "",
      address: "Trivandrum, Kerala",
      salary: "800",
      salaryType: "Daily",
    },
  ]);

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

  // Handle Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...formData, id: editingId } : emp,
        ),
      );
    } else {
      setEmployees([...employees, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const openEditModal = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setIsModalOpen(true);
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Staff Management
          </h1>
          <p className="text-slate-500">
            Track contact details, roles, and payroll types.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg flex items-center gap-2 transition"
        >
          <Plus size={20} /> Add Employee
        </button>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-6 font-bold">Employee Info</th>
              <th className="p-6 font-bold">Contact</th>
              <th className="p-6 font-bold">Role & Status</th>
              <th className="p-6 font-bold">Salary</th>
              <th className="p-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="p-6">
                  <div className="font-bold text-slate-900">{emp.name}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {emp.address}
                  </div>
                </td>
                <td className="p-6">
                  <div className="text-sm text-slate-600 flex items-center gap-2">
                    <Phone size={14} className="text-indigo-400" /> {emp.phone}
                  </div>
                  {emp.email && (
                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                      <Mail size={14} /> {emp.email}
                    </div>
                  )}
                </td>
                <td className="p-6">
                  <div className="text-sm font-medium text-slate-700">
                    {emp.role}
                  </div>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      emp.status === "Active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {emp.status}
                  </span>
                </td>
                <td className="p-6">
                  <div className="font-bold text-slate-900">₹{emp.salary}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">
                    {emp.salaryType}
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(emp)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(emp.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl w-full max-w-2xl shadow-2xl relative"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-8 text-slate-900">
              {editingId ? "Edit Employee" : "Add New Employee"}
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  required
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Address"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <input
                  required
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                <input
                  placeholder="Email ID (Optional)"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-4">
                <input
                  required
                  placeholder="Role (e.g., Designer)"
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                />

                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="w-full p-3 border rounded-xl bg-white"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <select
                    className="w-full p-3 border rounded-xl bg-white"
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
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition"
              >
                {editingId ? "Save Changes" : "Confirm Addition"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
