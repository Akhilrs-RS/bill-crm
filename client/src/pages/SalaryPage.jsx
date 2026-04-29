import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PayslipDocument from "../components/PayslipDocument";

export default function SalaryPage() {
  const [data, setData] = useState({
    name: "",
    gender: "Male",
    paidDays: "30",
    lopDays: "0",
    basic: "",
    otHours: "",
    otRate: "",
    advance: "",
    otherDeductions: "",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  // Calculation Logic matching dc6ba1f9-5dad-4001-874e-d688ae450ce6.JPG
  const basic = parseFloat(data.basic || 0);
  const otPayment =
    parseFloat(data.otHours || 0) * parseFloat(data.otRate || 0);
  const totalPayment = basic + otPayment;

  const totalDeductions =
    parseFloat(data.advance || 0) + parseFloat(data.otherDeductions || 0);

  const netPay = totalPayment - totalDeductions;

  const handleChange = (field, value) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-slate-800">
        Salary Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                Employee Details
              </label>
              <input
                className="w-full p-3 mt-1 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white transition-all outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Employee Name"
                value={data.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>

            <select
              className="p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none"
              value={data.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Paid Days"
                className="p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none"
                value={data.paidDays}
                onChange={(e) => handleChange("paidDays", e.target.value)}
              />
              <input
                type="number"
                placeholder="LOP Days"
                className="p-3 border border-slate-200 rounded-xl bg-slate-50 outline-none"
                value={data.lopDays}
                onChange={(e) => handleChange("lopDays", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Earnings & OT
            </label>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="BASIC SALARY"
                className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                value={data.basic}
                onChange={(e) => handleChange("basic", e.target.value)}
              />
              <input
                type="number"
                placeholder="OT HOURS"
                className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                value={data.otHours}
                onChange={(e) => handleChange("otHours", e.target.value)}
              />
              <input
                type="number"
                placeholder="OT RATE"
                className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                value={data.otRate}
                onChange={(e) => handleChange("otRate", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">
              Deductions
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="SALARY ADVANCE"
                className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                value={data.advance}
                onChange={(e) => handleChange("advance", e.target.value)}
              />
              <input
                type="number"
                placeholder="OTHER DEDUCTIONS"
                className="p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                value={data.otherDeductions}
                onChange={(e) =>
                  handleChange("otherDeductions", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        {/* Totals & Preview */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-slate-400 font-medium mb-1">
              Total Net Payable
            </h2>
            <div className="text-6xl font-black text-emerald-400 mb-8">
              ₹{netPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span className="text-slate-400">
                  Gross Earnings (Basic + OT)
                </span>
                <span className="text-xl font-bold">
                  ₹{totalPayment.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <span className="text-slate-400">Total Deductions</span>
                <span className="text-xl font-bold text-red-400">
                  ₹{totalDeductions.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg mt-8"
          >
            Generate Payslip
          </button>
        </div>
      </div>

      {/* Hidden Print Container */}
      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PayslipDocument ref={componentRef} data={data} />
      </div>
    </div>
  );
}
