import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PayslipDocument from "../components/PayslipDocument";

export default function SalaryPage() {
  const [data, setData] = useState({
    name: "",
    basic: "",
    hra: "",
    conv: "",
    pf: "",
    esi: "",
    pt: "",
  });
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const gross =
    parseFloat(data.basic || 0) +
    parseFloat(data.hra || 0) +
    parseFloat(data.conv || 0);
  const deductions =
    parseFloat(data.pf || 0) +
    parseFloat(data.esi || 0) +
    parseFloat(data.pt || 0);
  const net = gross - deductions;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Salary Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <input
            className="w-full p-3 mb-6 border rounded-xl"
            placeholder="Employee Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            {["basic", "hra", "conv", "pf", "esi", "pt"].map((field) => (
              <input
                key={field}
                type="number"
                placeholder={field.toUpperCase()}
                className="p-3 border rounded-xl"
                value={data[field]}
                onChange={(e) => setData({ ...data, [field]: e.target.value })}
              />
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col">
          <h2 className="text-xl font-bold mb-6">
            Net Salary: ₹{net.toFixed(2)}
          </h2>
          <div className="space-y-4 flex-1">
            <div className="flex justify-between border-b pb-2">
              <span>Gross</span> <span>₹{gross.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Deductions</span> <span>₹{deductions.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handlePrint}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-6"
          >
            Generate Payslip
          </button>
        </div>
      </div>
      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PayslipDocument ref={componentRef} data={data} />
      </div>
    </div>
  );
}
