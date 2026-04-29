import React, { useState } from "react";
import { Landmark, ChevronRight } from "lucide-react";

export default function AccountsPage() {
  const [accounts] = useState([
    {
      name: "Shamzudin Muhammad",
      phone: "+919700010091",
      email: "shamzudinmuhammad@gmail.com",
      base: 450,
      paid: 0,
      total: 0,
    },
    {
      name: "Ahmed Hassan",
      phone: "000-100-0002",
      email: "worker2@demo-worker.test",
      base: 460,
      paid: 0,
      total: 0,
    },
    {
      name: "Abdul Muhammad",
      phone: "+918924456623",
      email: "abdulsharani@gmail.com",
      base: 450,
      paid: 0,
      total: 0,
    },
    {
      name: "Ali Raza",
      phone: "124-125-5811",
      email: "worker4@demo-worker.test",
      base: 640,
      paid: 0,
      total: 0,
    },
    {
      name: "John Mensah",
      phone: "120-154-1542",
      email: "worker3@demo-worker.test",
      base: 560,
      paid: 0,
      total: 0,
    },
    {
      name: "Rajesh Kumar",
      phone: "+919478828652",
      email: "ramesh94@gmail.com",
      base: 550,
      paid: 0,
      total: 450,
    },
  ]);

  return (
    <div className="p-8 bg-white min-h-screen font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
        <Landmark size={14} />
        <ChevronRight size={12} />
        <span>Compliance</span>
        <ChevronRight size={12} />
        <span className="text-slate-600 font-medium">Accounts</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Accounts</h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-4xl">
          Read-only payroll roll-up per worker. Amounts update when you run
          payroll or mark periods as paid in
          <span className="text-orange-500 cursor-pointer hover:underline mx-1">
            Payroll
          </span>
          . Base salary comes from the worker profile — use
          <span className="text-orange-500 cursor-pointer hover:underline mx-1">
            Workers
          </span>{" "}
          to edit it.
        </p>
      </div>

      {/* Accounts Table */}
      <div className="bg-white border-t border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b">
              <th className="px-4 py-4 w-1/4">Name</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4 text-right">Base Salary</th>
              <th className="px-4 py-4 text-right">Paid Out</th>
              <th className="px-4 py-4 text-right">Total Payroll (Net)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {accounts.map((acc, index) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-4 font-bold text-slate-800 text-sm">
                  {acc.name}
                </td>
                <td className="px-4 py-4 text-slate-500 text-xs">
                  {acc.phone}
                </td>
                <td className="px-4 py-4 text-slate-500 text-xs">
                  {acc.email}
                </td>
                <td className="px-4 py-4 text-right text-xs font-mono text-slate-600">
                  AED <span className="font-bold">{acc.base}</span>
                </td>
                <td className="px-4 py-4 text-right text-xs font-mono text-slate-400">
                  {acc.paid > 0 ? `AED ${acc.paid}` : "-"}
                </td>
                <td className="px-4 py-4 text-right text-xs font-mono text-slate-800 font-bold">
                  AED {acc.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
