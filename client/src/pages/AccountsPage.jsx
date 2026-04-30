import React, { useState } from "react";
import {
  Landmark,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Download,
} from "lucide-react";

export default function AccountsPage() {
  const [filter, setFilter] = useState("All");

  // Transaction Data: Credit (Income) vs Debit (Expense)
  const [transactions] = useState([
    {
      id: "TXN-001",
      date: "2026-04-28",
      description: "Invoice #INV-4021 - Villa Project",
      type: "Credit",
      category: "Project Income",
      amount: 125000,
    },
    {
      id: "TXN-002",
      date: "2026-04-27",
      description: "Salary Payout - Rahul Kumar (MONA-2026-001)",
      type: "Debit",
      category: "Employee Payroll",
      amount: 45000,
    },
    {
      id: "TXN-003",
      date: "2026-04-25",
      description: "Raw Material: Marine Plywood (20 Sheets)",
      type: "Debit",
      category: "Material Purchase",
      amount: 48000,
    },
    {
      id: "TXN-004",
      date: "2026-04-22",
      description: "Invoice #INV-4019 - Kitchen Remodel",
      type: "Credit",
      category: "Project Income",
      amount: 85000,
    },
    {
      id: "TXN-005",
      date: "2026-04-20",
      description: "Raw Material: Hettich Hinges & Fittings",
      type: "Debit",
      category: "Material Purchase",
      amount: 12500,
    },
    {
      id: "TXN-006",
      date: "2026-04-15",
      description: "Salary Payout - Suresh P. (MONA-2026-002)",
      type: "Debit",
      category: "Employee Payroll",
      amount: 24000,
    },
  ]);

  const totalCredit = transactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = transactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalCredit - totalDebit;

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase font-bold tracking-widest">
        <Landmark size={14} />
        <ChevronRight size={12} />
        <span>Compliance</span>
        <ChevronRight size={12} />
        <span className="text-slate-900">Statement of Accounts</span>
      </div>

      {/* Summary Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            Available Balance
          </p>
          <h2 className="text-4xl font-black">₹{balance.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Total Credit (Income)
            </p>
            <h2 className="text-2xl font-black text-emerald-600">
              ₹{totalCredit.toLocaleString()}
            </h2>
          </div>
          <ArrowUpCircle className="text-emerald-500" size={32} />
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 flex justify-between items-center">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Total Debit (Expense)
            </p>
            <h2 className="text-2xl font-black text-red-500">
              ₹{totalDebit.toLocaleString()}
            </h2>
          </div>
          <ArrowDownCircle className="text-red-500" size={32} />
        </div>
      </div>

      {/* Bank Statement Section */}
      <div className="bg-white rounded-[40px] border border-slate-900 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Transaction History
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              Mona Interior Business Account
            </p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={16}
              />
              <input
                className="pl-10 pr-4 py-2 bg-slate-50 border rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Search transactions..."
              />
            </div>
            <button className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition">
              <Download size={16} /> Export Statement
            </button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b bg-slate-50">
              <th className="px-8 py-4">Date / Transaction ID</th>
              <th className="px-8 py-4">Description & Category</th>
              <th className="px-8 py-4 text-center">Type</th>
              <th className="px-8 py-4 text-right">Debit (Out)</th>
              <th className="px-8 py-4 text-right">Credit (In)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-8 py-6">
                  <p className="font-bold text-slate-900 text-sm">{txn.date}</p>
                  <p className="text-[10px] font-mono text-slate-400">
                    {txn.id}
                  </p>
                </td>
                <td className="px-8 py-6">
                  <p className="font-black text-slate-800 text-sm">
                    {txn.description}
                  </p>
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter mt-1">
                    {txn.category}
                  </p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      txn.type === "Credit"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.type}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  {txn.type === "Debit" ? (
                    <span className="font-black text-slate-900 text-base">
                      ₹{txn.amount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
                <td className="px-8 py-6 text-right">
                  {txn.type === "Credit" ? (
                    <span className="font-black text-emerald-600 text-base">
                      ₹{txn.amount.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-slate-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
