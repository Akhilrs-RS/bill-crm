import React, { useState } from "react";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: "Rahul Kumar", role: "Lead Designer", status: "Active" },
    { id: 2, name: "Suresh P.", role: "Carpenter", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    setEmployees([
      ...employees,
      { id: Date.now(), ...newEmployee, status: "Active" },
    ]);
    setNewEmployee({ name: "", role: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500">Manage your staff and their roles.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          + Add Employee
        </button>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 font-semibold text-slate-700">Name</th>
              <th className="p-6 font-semibold text-slate-700">Role</th>
              <th className="p-6 font-semibold text-slate-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="p-6 font-medium text-slate-900">{emp.name}</td>
                <td className="p-6 text-slate-600">{emp.role}</td>
                <td className="p-6">
                  <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs">
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddEmployee}
            className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-bold mb-6">Add New Employee</h2>
            <input
              required
              placeholder="Full Name"
              className="w-full p-3 border rounded-xl mb-4"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />
            <input
              required
              placeholder="Role (e.g., Carpenter)"
              className="w-full p-3 border rounded-xl mb-6"
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
