import React, { useState, useEffect } from "react";
import {
  Landmark,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Download,
  Plus,
  X,
  Clock,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("Monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1. DYNAMIC CLOCK LOGIC
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [transactions, setTransactions] = useState([
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
      description: "Salary Payout - Rahul Kumar",
      type: "Debit",
      category: "Employee Payroll",
      amount: 45000,
    },
    {
      id: "TXN-003",
      date: "2026-04-25",
      description: "Raw Material: Marine Plywood",
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
      description: "Hettich Hinges & Fittings",
      type: "Debit",
      category: "Material Purchase",
      amount: 12500,
    },
  ]);

  // 2. FILTER & CALCULATE
  const timeFilteredTransactions = transactions.filter((item) => {
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
      return itemDate >= new Date(fiscalYearStart, 3, 1);
    }
  });

  const finalFilteredTransactions = timeFilteredTransactions.filter(
    (t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalCredit = timeFilteredTransactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalDebit = timeFilteredTransactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalCredit - totalDebit;

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("MONA INTERIOR - BANK STATEMENT", 14, 20);
    doc.autoTable({
      head: [["Date", "Description", "Category", "Debit", "Credit"]],
      body: finalFilteredTransactions.map((t) => [
        t.date,
        t.description,
        t.category,
        t.type === "Debit" ? t.amount : "-",
        t.type === "Credit" ? t.amount : "-",
      ]),
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.save(`Statement_${viewType}.pdf`);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Top Utility Bar */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-black tracking-widest">
            <Landmark size={14} /> Compliance <ChevronRight size={12} />{" "}
            <span className="text-slate-900">Accounts</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-indigo-50 rounded-full border border-indigo-100 text-indigo-600 font-bold text-xs">
            <Clock size={14} /> {currentTime.toLocaleTimeString()}
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-6 py-2.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-indigo-700 transition active:scale-95"
        >
          <Plus size={20} /> Add Transaction
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            {viewType} Balance
          </p>
          <h2 className="text-5xl font-black tracking-tighter">
            ₹{balance.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-900 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Inflow (Credits)
            </p>
            <h2 className="text-3xl font-black text-emerald-600">
              ₹{totalCredit.toLocaleString()}
            </h2>
          </div>
          <div className="p-4 bg-emerald-50 rounded-3xl text-emerald-500">
            <ArrowUpCircle size={32} />
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-900 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Outflow (Debits)
            </p>
            <h2 className="text-3xl font-black text-red-500">
              ₹{totalDebit.toLocaleString()}
            </h2>
          </div>
          <div className="p-4 bg-red-50 rounded-3xl text-red-500">
            <ArrowDownCircle size={32} />
          </div>
        </div>
      </div>

      {/* Transaction Control Center */}
      <div className="bg-white rounded-[40px] border border-slate-900 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/50">
          <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-inner">
            {["Monthly", "Financial Year"].map((type) => (
              <button
                key={type}
                onClick={() => setViewType(type)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  viewType === type
                    ? "bg-slate-900 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none font-bold focus:border-slate-900 transition-all w-64"
                placeholder="Search Statement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={exportToPDF}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 hover:bg-slate-800 transition"
            >
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>

        {/* The Statement Table */}
        <table className="w-full text-left">
          <thead>
            <tr className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-white">
              <th className="px-10 py-6">Transaction Date</th>
              <th className="px-10 py-6">Description</th>
              <th className="px-10 py-6 text-right">Debit</th>
              <th className="px-10 py-6 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {finalFilteredTransactions.map((txn) => (
              <tr
                key={txn.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-10 py-6 font-bold text-slate-900 text-sm">
                  {txn.date}
                </td>
                <td className="px-10 py-6">
                  <p className="font-black text-slate-900 text-base leading-tight uppercase">
                    {txn.description}
                  </p>
                  <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-tighter">
                    {txn.category}
                  </span>
                </td>
                <td className="px-10 py-6 text-right font-black text-red-500 text-base">
                  {txn.type === "Debit"
                    ? `₹${txn.amount.toLocaleString()}`
                    : "-"}
                </td>
                <td className="px-10 py-6 text-right font-black text-emerald-600 text-base">
                  {txn.type === "Credit"
                    ? `₹${txn.amount.toLocaleString()}`
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
          {/* BOTTOM BALANCE SECTION */}
          {finalFilteredTransactions.length > 0 && (
            <tfoot className="border-t-4 border-slate-900">
              <tr className="bg-slate-50">
                <td
                  colSpan="2"
                  className="px-10 py-8 text-right font-black text-slate-400 uppercase tracking-widest text-[10px]"
                >
                  Total Movement
                </td>
                <td className="px-10 py-8 text-right text-red-500 font-black text-xl italic border-r border-slate-100">
                  - ₹{totalDebit.toLocaleString()}
                </td>
                <td className="px-10 py-8 text-right text-emerald-600 font-black text-xl italic">
                  + ₹{totalCredit.toLocaleString()}
                </td>
              </tr>
              <tr className="bg-slate-900 text-white">
                <td
                  colSpan="3"
                  className="px-10 py-10 text-right font-black uppercase tracking-[0.3em] text-xs text-slate-400"
                >
                  Final {viewType} Closing Balance
                </td>
                <td className="px-10 py-10 text-right text-3xl font-black tracking-tighter border-l border-white/10">
                  ₹{balance.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Manual Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-900 w-full max-w-lg relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter">
              New Ledger Entry
            </h2>
            <div className="space-y-4">
              <input
                className="w-full p-4 bg-slate-50 border rounded-2xl font-bold"
                placeholder="Transaction Description"
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-4 bg-slate-50 border rounded-2xl font-bold">
                  <option>Credit (Income)</option>
                  <option>Debit (Expense)</option>
                </select>
                <input
                  className="p-4 bg-slate-50 border rounded-2xl font-bold"
                  type="number"
                  placeholder="Amount (₹)"
                />
              </div>
              <button className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black uppercase tracking-widest mt-6">
                Confirm Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
