import React from "react";

const ReportsPage = () => {
  const stats = [
    { label: "Total Revenue", value: "₹12.4L", change: "+14%" },
    { label: "New Projects", value: "24", change: "+5%" },
    { label: "Conversion Rate", value: "68%", change: "+2%" },
    { label: "Avg. Project Value", value: "₹45k", change: "-3%" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Business Reports</h1>
        <p className="text-slate-500">
          Monitor your studio's performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h2 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h2>
              <span
                className={`text-sm font-semibold ${stat.change.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center text-slate-400">
          [Revenue Chart Placeholder - Integrate Recharts here]
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-64 flex items-center justify-center text-slate-400">
          [Lead Sources Placeholder]
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-lg mb-4">Project Performance</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 text-sm">
              <th className="pb-4 font-medium">Project Name</th>
              <th className="pb-4 font-medium">Progress</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="text-slate-800">
                <td className="py-4">Mona Residence Project {i}</td>
                <td className="py-4">
                  <div className="w-full bg-slate-100 rounded-full h-2 w-32">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </td>
                <td className="py-4 text-emerald-600 font-medium">On Track</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
