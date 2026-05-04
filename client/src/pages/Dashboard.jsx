import React, { useState, useEffect } from "react";
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
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // 1. DYNAMIC DATA CALCULATION (Intelligence Hub Logic)
  // In a real app, these would be fetched from your /accounts and /crm modules
  const [financials, setFinancials] = useState({
    revenue: 820000,
    expense: 450000,
    income: 510000,
    leads: 14,
    attendance: "22/28",
  });

  const profit = financials.income - financials.expense;

  const financeStats = [
    {
      title: "Total Revenue",
      value: `₹${(financials.revenue / 100000).toFixed(1)}L`,
      color: "from-blue-600 to-indigo-500",
      icon: <TrendingUp size={20} />,
    },
    {
      title: "Net Profit",
      value: `₹${(profit / 100000).toFixed(1)}L`,
      color: "from-emerald-500 to-teal-400",
      icon: <ArrowUpRight size={20} />,
    },
    {
      title: "Total Expense",
      value: `₹${(financials.expense / 100000).toFixed(1)}L`,
      color: "from-red-500 to-orange-400",
      icon: <Receipt size={20} />,
    },
    {
      title: "Total Income",
      value: `₹${(financials.income / 100000).toFixed(1)}L`,
      color: "from-indigo-500 to-purple-500",
      icon: <Wallet size={20} />,
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Intelligence Hub
          </h1>
          <p className="text-slate-500 mt-1 font-medium uppercase text-xs tracking-widest">
            Mona Interior: Real-time business analytics
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Current Session
          </p>
          <p className="font-bold text-slate-900">
            {new Date().toLocaleDateString("en-GB", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* 2. DYNAMIC FINANCIAL KPI CARDS */}
      <section className="mb-12">
        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
          Financial Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financeStats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white p-8 rounded-[35px] border-2 border-slate-50 shadow-sm hover:shadow-2xl hover:border-slate-200 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-slate-900 transition-colors">
                  {stat.icon}
                </div>
                <div className="h-2 w-10 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.color} w-2/3`}
                  ></div>
                </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {stat.title}
              </p>
              <div
                className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color} tracking-tighter`}
              >
                {stat.value}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* 3. HIERARCHICAL CRM PIPELINE PROGRESS */}
          <div className="bg-white p-10 rounded-[45px] border-2 border-slate-50 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                CRM Pipeline flow
              </h2>
              <button
                onClick={() => navigate("/crm")}
                className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
              >
                View Full Pipeline <ArrowRight size={14} />
              </button>
            </div>

            <div className="flex items-center justify-between relative">
              {/* Connector Line */}
              <div className="absolute top-8 left-0 w-full h-0.5 bg-slate-100 -z-0"></div>

              {[
                { label: "Leads", count: 12, color: "blue", bg: "bg-blue-600" },
                {
                  label: "Contacted",
                  count: 8,
                  color: "indigo",
                  bg: "bg-indigo-600",
                },
                {
                  label: "Negotiated",
                  count: 5,
                  color: "emerald",
                  bg: "bg-emerald-600",
                },
              ].map((stage, i) => (
                <div
                  key={i}
                  className="text-center relative z-10 bg-white px-4"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    className={`w-16 h-16 rounded-[22px] ${stage.bg} text-white flex items-center justify-center font-black mx-auto mb-4 shadow-xl shadow-${stage.color}-100 text-xl`}
                  >
                    {stage.count < 10 ? `0${stage.count}` : stage.count}
                  </motion.div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                    {stage.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Analysis Graphs */}
          <div className="bg-white p-10 rounded-[45px] border-2 border-slate-50 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                Activity Analysis
              </h2>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>{" "}
                  Revenue
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>{" "}
                  Income
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-64">
              <div className="bg-slate-50/50 rounded-[30px] p-6 flex flex-col justify-end border border-slate-100">
                <div className="flex items-end gap-3 h-full">
                  {[40, 70, 45, 90, 65, 80].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="flex-1 bg-indigo-500 rounded-t-xl shadow-lg shadow-indigo-100"
                    ></motion.div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50/50 rounded-[30px] p-6 flex flex-col justify-end border border-slate-100">
                <div className="flex items-end gap-3 h-full">
                  {[60, 30, 80, 50, 75, 40].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="flex-1 bg-emerald-500 rounded-t-xl shadow-lg shadow-emerald-100"
                    ></motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-10 rounded-[45px] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            <h2 className="text-lg font-black mb-8 uppercase tracking-tighter relative z-10">
              Operations Center
            </h2>
            <div className="space-y-4 relative z-10">
              <button
                onClick={() => navigate("/quotations")}
                className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-white/5"
              >
                <Plus size={16} /> New Quotation
              </button>
              <button
                onClick={() => navigate("/billing")}
                className="w-full bg-white/10 hover:bg-white text-white hover:text-slate-900 py-5 rounded-[22px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 border border-white/5"
              >
                <FileText size={16} /> Generate Invoice
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[45px] border-2 border-slate-50 shadow-sm">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
              Workforce Status
            </h2>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-[25px] bg-amber-50 text-amber-600 flex flex-col items-center justify-center border border-amber-100">
                <span className="text-2xl font-black leading-none">22</span>
                <span className="text-[8px] font-bold uppercase mt-1">
                  Present
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
                  Staff Attendance
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                  Shift: 04 May 2026
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-500 uppercase">
                    Recent Hire
                  </span>
                  <span className="text-[10px] font-black text-indigo-600 uppercase">
                    Designer
                  </span>
                </div>
                <p className="font-bold text-slate-900 mt-1 uppercase text-xs">
                  Arjun Sharma
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
