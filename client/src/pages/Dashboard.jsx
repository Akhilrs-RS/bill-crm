import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { title: "Active Leads", value: "12", color: "from-blue-500 to-cyan-400" },
    {
      title: "Pending Quotes",
      value: "08",
      color: "from-amber-500 to-orange-400",
    },
    {
      title: "Attendance",
      value: "24/28",
      color: "from-emerald-500 to-teal-400",
    },
    {
      title: "Monthly Revenue",
      value: "₹4.5L",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 mt-2 text-lg">
          Mona Interior Studio: Overview of business operations.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              {stat.title}
            </h3>
            <div
              className={`mt-3 text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}
            >
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity: CRM & Leads Tracking */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Recent Customer Activity{" "}
          </h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
              >
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-4"></div>
                <div>
                  <p className="text-slate-800 font-semibold">
                    Project Lead Updated: ID-{1000 + i}
                  </p>
                  <p className="text-slate-400 text-sm">
                    Communication history updated 2 hours ago [cite: 41]
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions: Navigation to Core ERP Modules */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/billing")}
                className="bg-white text-blue-700 py-3 rounded-xl font-bold hover:bg-blue-50 transition"
              >
                Create Quotation [cite: 44]
              </button>
              <button
                onClick={() => navigate("/employees")}
                className="bg-blue-800/50 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
              >
                Add Employee [cite: 59]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
