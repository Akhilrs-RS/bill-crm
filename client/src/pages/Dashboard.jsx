import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Wallet,
  Receipt,
  ArrowUpRight,
  Users,
  Calendar,
  FileText,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const financeStats = [
    {
      title: "Revenue",
      value: "₹8.2L",
      color: "from-blue-600 to-indigo-500",
      icon: <TrendingUp size={20} />,
    },
    {
      title: "Profit",
      value: "₹3.1L",
      color: "from-emerald-500 to-teal-400",
      icon: <ArrowUpRight size={20} />,
    },
    {
      title: "Expense",
      value: "₹4.5L",
      color: "from-red-500 to-orange-400",
      icon: <Receipt size={20} />,
    },
    {
      title: "Income",
      value: "₹5.1L",
      color: "from-indigo-500 to-purple-500",
      icon: <Wallet size={20} />,
    },
    {
      title: "Active Leads",
      value: "14",
      color: "from-cyan-500 to-blue-400",
      icon: <Users size={20} />,
    },
    {
      title: "Attendance",
      value: "22/28",
      color: "from-amber-500 to-orange-400",
      icon: <Calendar size={20} />,
    },
    {
      title: "Empty Card",
      value: "--",
      color: "from-slate-300 to-slate-400",
      icon: null,
    },
    {
      title: "Empty Card",
      value: "--",
      color: "from-slate-300 to-slate-400",
      icon: null,
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">
          ERP Dashboard
        </h1>
        <p className="text-slate-500 mt-1 font-medium">
          Mona Interior: Real-time business intelligence.
        </p>
      </div>

      {/* Finance Related Section */}
      <section className="mb-12">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          Finance Related
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financeStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.title}
                </h3>
                <div className="text-slate-300">{stat.icon}</div>
              </div>
              <div
                className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Activity Column & Graphs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Activity Analysis
              </h2>
              <select className="bg-slate-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                <option>Profit View</option>
                <option>Expense View</option>
              </select>
            </div>

            {/* Graph Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-64">
              <div className="bg-slate-50 rounded-3xl p-4 flex flex-col justify-end border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4">
                  Revenue Graph
                </p>
                <div className="flex items-end gap-2 h-full pb-2">
                  {[40, 70, 45, 90, 65].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-indigo-500 rounded-t-lg"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-3xl p-4 flex flex-col justify-end border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4">
                  Income Graph
                </p>
                <div className="flex items-end gap-2 h-full pb-2">
                  {[60, 30, 80, 50, 75].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className="flex-1 bg-emerald-500 rounded-t-lg"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CRM Hierarchical Graph */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-8">
              CRM Pipeline Progress
            </h2>
            <div className="flex items-center justify-between px-10">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black mx-auto mb-2 text-xl">
                  12
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase">
                  Leads
                </p>
              </div>
              <div className="h-px bg-slate-100 flex-1 mx-4"></div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black mx-auto mb-2 text-xl">
                  08
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase">
                  Contacted
                </p>
              </div>
              <div className="h-px bg-slate-100 flex-1 mx-4"></div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black mx-auto mb-2 text-xl">
                  05
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase">
                  Negotiated
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Column: Recent Activity & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Actions */}
          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-xl border border-slate-800">
            <h2 className="text-lg font-black mb-6 uppercase tracking-tight">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate("/quotations")}
                className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Create Quotation
              </button>
              <button
                onClick={() => navigate("/billing")}
                className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Create Invoice
              </button>
            </div>
          </div>

          {/* Recent Customer Activity */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">
              Recent Activity
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-lg">
                  24
                </div>
                <div>
                  <p className="text-xs font-black text-slate-800 uppercase">
                    Invoices Generated
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Last 30 Days
                  </p>
                </div>
              </div>
              <div className="h-px bg-slate-50"></div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Lead Follow-up: ID-402{i}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">
                        2 Hours Ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
