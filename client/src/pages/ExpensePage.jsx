import React, { useState } from "react";
import {
  Receipt,
  Search,
  Filter,
  History,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";

export default function ExpensePage() {
  const [viewType, setViewType] = useState("Monthly"); // Monthly or Financial Year
  const [searchTerm, setSearchTerm] = useState("");

  // Sample Client Purchase History for Raw Materials
  const [expenseHistory] = useState([
    {
      id: 1,
      client: "Rajesh Gowda",
      material: "Marine Plywood",
      qty: "20 Sheets",
      cost: 45000,
      date: "2026-04-15",
    },
    {
      id: 2,
      client: "Anita Nair",
      material: "High Gloss Laminates",
      qty: "12 Sheets",
      cost: 18000,
      date: "2026-03-10",
    },
    {
      id: 3,
      client: "Rajesh Gowda",
      material: "Hettich Hinges",
      qty: "50 Pairs",
      cost: 12500,
      date: "2026-04-20",
    },
    {
      id: 4,
      client: "Tech Corp",
      material: "Acoustic Panels",
      qty: "30 units",
      cost: 95000,
      date: "2025-11-05",
    },
  ]);

  // Filter logic based on View Type
  const filteredExpenses = expenseHistory.filter((item) => {
    const itemDate = new Date(item.date);
    const today = new Date();

    if (viewType === "Monthly") {
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    } else {
      // Financial Year (April to March)
      const fiscalYearStart =
        today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
      return itemDate >= new Date(`${fiscalYearStart}-04-01`);
    }
  });

  const totalExpense = filteredExpenses.reduce(
    (sum, item) => sum + item.cost,
    0,
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Receipt className="text-indigo-600" size={32} /> Expense Management
          </h1>
          <p className="text-slate-500 mt-1">
            Raw material procurement and client history.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-white p-1 rounded-xl border shadow-sm">
          {["Monthly", "Financial Year"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                viewType === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 bg-indigo-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
            Total Material Cost
          </p>
          <h2 className="text-4xl font-black mt-2">
            ₹{totalExpense.toLocaleString()}
          </h2>
          <div className="mt-4 flex items-center gap-2 text-indigo-400 text-xs">
            <TrendingUp size={16} /> <span>Based on {viewType} view</span>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-slate-200 flex items-center gap-6">
          <div className="flex-1">
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">
              Search Client History
            </label>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Enter client name..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <button className="bg-slate-900 text-white h-12 px-6 rounded-xl font-bold flex items-center gap-2">
            <ShoppingCart size={18} /> Log New Purchase
          </button>
        </div>
      </div>

      {/* Expense History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-slate-50/50 flex items-center gap-2">
          <History size={18} className="text-slate-400" />
          <h3 className="font-bold text-slate-700">Procurement History</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Client Name</th>
              <th className="px-6 py-4">Material Details</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4 text-right">Cost (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredExpenses
              .filter((e) =>
                e.client.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((expense) => (
                <tr key={expense.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {expense.client}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {expense.material}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {expense.qty}
                  </td>
                  <td className="px-6 py-4 text-right font-black text-indigo-600">
                    ₹{expense.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="p-20 text-center text-slate-400">
            No expenses found for the selected period.
          </div>
        )}
      </div>
    </div>
  );
}
