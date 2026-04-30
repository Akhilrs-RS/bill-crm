import React, { useState } from "react";
import {
  Landmark,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  Download,
  Calendar,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("Monthly"); // New state for filtering

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
      date: "2026-03-15",
      description: "Salary Payout - Suresh P. (MONA-2026-002)",
      type: "Debit",
      category: "Employee Payroll",
      amount: 24000,
    },
  ]);

  // --- FILTER LOGIC BY DATE ---
  const timeFilteredTransactions = transactions.filter((item) => {
    const itemDate = new Date(item.date);
    const today = new Date();

    if (viewType === "Monthly") {
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    } else {
      // Financial Year (India: April to March)
      const fiscalYearStart =
        today.getMonth() >= 3 ? today.getFullYear() : today.getFullYear() - 1;
      const startDate = new Date(fiscalYearStart, 3, 1); // April 1st
      const endDate = new Date(fiscalYearStart + 1, 2, 31); // March 31st
      return itemDate >= startDate && itemDate <= endDate;
    }
  });

  // --- SEARCH FILTER LOGIC ---
  const finalFilteredTransactions = timeFilteredTransactions.filter(
    (t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.type.toLowerCase().includes(searchTerm.toLowerCase()),
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
    doc.setFontSize(18);
    doc.text(`Mona Interior - ${viewType} Statement`, 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 14, 28);
    doc.text(`Period: ${viewType}`, 14, 34);
    doc.text(
      `Total Balance for Period: Rs. ${balance.toLocaleString()}`,
      14,
      40,
    );

    const tableColumn = [
      "Date",
      "Description",
      "Category",
      "Type",
      "Debit",
      "Credit",
    ];
    const tableRows = finalFilteredTransactions.map((txn) => [
      txn.date,
      txn.description,
      txn.category,
      txn.type,
      txn.type === "Debit" ? `Rs. ${txn.amount.toLocaleString()}` : "-",
      txn.type === "Credit" ? `Rs. ${txn.amount.toLocaleString()}` : "-",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 46,
      theme: "grid",
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 8 },
    });
    doc.save(`${viewType}_Statement_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 uppercase font-bold tracking-widest">
          <Landmark size={14} />
          <ChevronRight size={12} />
          <span>Compliance</span>
          <ChevronRight size={12} />
          <span className="text-slate-900">Statement of Accounts</span>
        </div>

        {/* VIEW TOGGLE */}
        <div className="flex bg-white p-1 rounded-2xl border shadow-sm border-slate-900">
          {["Monthly", "Financial Year"].map((type) => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                viewType === type
                  ? "bg-slate-900 text-white"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl border border-slate-900">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            {viewType} Balance
          </p>
          <h2 className="text-4xl font-black">₹{balance.toLocaleString()}</h2>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-900 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Total Credit
            </p>
            <h2 className="text-2xl font-black text-emerald-600">
              ₹{totalCredit.toLocaleString()}
            </h2>
          </div>
          <ArrowUpCircle className="text-emerald-500" size={32} />
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-900 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
              Total Debit
            </p>
            <h2 className="text-2xl font-black text-red-500">
              ₹{totalDebit.toLocaleString()}
            </h2>
          </div>
          <ArrowDownCircle className="text-red-500" size={32} />
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-900 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
              {viewType} History
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
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-900 rounded-2xl text-sm outline-none font-bold"
                placeholder="Search description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={exportToPDF}
              className="bg-slate-900 text-white px-6 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 hover:scale-105 transition active:scale-95"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b bg-slate-50">
              <th className="px-8 py-4">Date</th>
              <th className="px-8 py-4">Description & Category</th>
              <th className="px-8 py-4 text-center">Type</th>
              <th className="px-8 py-4 text-right">Debit</th>
              <th className="px-8 py-4 text-right">Credit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {finalFilteredTransactions.map((txn) => (
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
                  <p className="font-black text-slate-800 text-sm uppercase">
                    {txn.description}
                  </p>
                  <p className="text-[10px] text-indigo-500 font-black uppercase tracking-tighter mt-1">
                    {txn.category}
                  </p>
                </td>
                <td className="px-8 py-6 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${txn.type === "Credit" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}
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
        {finalFilteredTransactions.length === 0 && (
          <div className="p-20 text-center text-slate-300 font-black uppercase tracking-widest">
            No transactions for this period
          </div>
        )}
      </div>
    </div>
  );
}
