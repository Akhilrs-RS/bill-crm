import React, { useState } from "react";
import {
  Receipt,
  Search,
  Filter,
  History,
  ShoppingCart,
  TrendingUp,
  X,
  Plus,
} from "lucide-react";

export default function ExpensePage() {
  const [viewType, setViewType] = useState("Monthly");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. CONVERTED TO DYNAMIC STATE
  const [expenseHistory, setExpenseHistory] = useState([
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

  // State for new purchase form
  const [newPurchase, setNewPurchase] = useState({
    client: "",
    material: "",
    qty: "",
    cost: "",
    date: new Date().toISOString().split("T")[0],
  });

  // 2. LOG NEW PURCHASE HANDLER
  const handleAddPurchase = (e) => {
    e.preventDefault();
    const entry = {
      ...newPurchase,
      id: Date.now(),
      cost: parseFloat(newPurchase.cost),
    };
    setExpenseHistory([entry, ...expenseHistory]);
    setIsModalOpen(false);
    setNewPurchase({
      client: "",
      material: "",
      qty: "",
      cost: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const filteredExpenses = expenseHistory.filter((item) => {
    const itemDate = new Date(item.date);
    const today = new Date();
    if (viewType === "Monthly") {
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    } else {
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

        <div className="flex bg-white p-1 rounded-xl border shadow-sm">
          {["Monthly", "Financial Year"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                viewType === type
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100"
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
            <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-widest">
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
          {/* 3. MODAL TRIGGER */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-6 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <Plus size={18} /> Log New Purchase
          </button>
        </div>
      </div>

      {/* Expense History Table */}
      <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-slate-50/50 flex items-center gap-2">
          <History size={18} className="text-slate-400" />
          <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">
            Procurement History
          </h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4 text-center">Client Name</th>
              <th className="px-8 py-4">Material Details</th>
              <th className="px-8 py-4">Quantity</th>
              <th className="px-8 py-4 text-right">Cost (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredExpenses
              .filter((e) =>
                e.client.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((expense) => (
                <tr
                  key={expense.id}
                  className="hover:bg-slate-50 transition group"
                >
                  <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 font-black text-slate-900 text-center uppercase text-xs">
                    {expense.client}
                  </td>
                  <td className="px-8 py-6 text-slate-600 font-bold">
                    {expense.material}
                  </td>
                  <td className="px-8 py-6 text-xs text-slate-500 font-bold uppercase">
                    {expense.qty}
                  </td>
                  <td className="px-8 py-6 text-right font-black text-indigo-600 text-lg">
                    ₹{expense.cost.toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {filteredExpenses.length === 0 && (
          <div className="p-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">
            No expenses found for the selected period.
          </div>
        )}
      </div>

      {/* 4. NEW PURCHASE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleAddPurchase}
            className="bg-white p-10 rounded-[40px] w-full max-w-xl shadow-2xl relative border border-slate-900"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition"
            >
              <X size={28} />
            </button>

            <h2 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tighter">
              New Material Log
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Client Name
                  </label>
                  <input
                    required
                    placeholder="Full Name"
                    className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold text-sm"
                    value={newPurchase.client}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, client: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Purchase Date
                  </label>
                  <input
                    required
                    type="date"
                    className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold text-sm"
                    value={newPurchase.date}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                  Material Details
                </label>
                <input
                  required
                  placeholder="e.g. Marine Plywood, Paint, etc."
                  className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold text-sm"
                  value={newPurchase.material}
                  onChange={(e) =>
                    setNewPurchase({ ...newPurchase, material: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Quantity
                  </label>
                  <input
                    required
                    placeholder="e.g. 10 units"
                    className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold text-sm"
                    value={newPurchase.qty}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, qty: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                    Total Cost (₹)
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold text-sm"
                    value={newPurchase.cost}
                    onChange={(e) =>
                      setNewPurchase({ ...newPurchase, cost: e.target.value })
                    }
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black text-sm uppercase tracking-[0.2em] mt-6 hover:bg-slate-800 shadow-xl transition-all active:scale-95"
              >
                Save Procurement Entry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
