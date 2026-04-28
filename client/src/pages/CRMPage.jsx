import { useState } from "react";
import { MOCK_DATA } from "../data/mockData";

export default function CRMPage() {
  const [customers, setCustomers] = useState(MOCK_DATA.customers);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management (CRM)</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add New Lead
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Project</th>
              <th className="p-4">Status</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.project}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-sm ${customer.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
