import React, { forwardRef } from "react";

const PayslipDocument = forwardRef(({ data }, ref) => {
  const gross =
    parseFloat(data.basic || 0) +
    parseFloat(data.hra || 0) +
    parseFloat(data.conv || 0);
  const deductions =
    parseFloat(data.pf || 0) +
    parseFloat(data.esi || 0) +
    parseFloat(data.pt || 0);
  const netPay = gross - deductions;

  return (
    <div
      ref={ref}
      className="p-10 bg-white text-black font-sans w-full max-w-2xl mx-auto border border-gray-200"
    >
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold uppercase">Payslip</h1>
        <p className="text-gray-500">Mona Interior Studio</p>
      </div>

      <div className="mb-6">
        <p>
          <strong>Employee Name:</strong> {data.name || "N/A"}
        </p>
        <p>
          <strong>Month:</strong>{" "}
          {new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold border-b mb-2">Earnings</h3>
          <p>Basic: ₹{data.basic}</p>
          <p>HRA: ₹{data.hra}</p>
          <p>Conveyance: ₹{data.conv}</p>
          <p className="font-bold mt-2">Gross: ₹{gross.toFixed(2)}</p>
        </div>
        <div>
          <h3 className="font-bold border-b mb-2">Deductions</h3>
          <p>PF: ₹{data.pf}</p>
          <p>ESI: ₹{data.esi}</p>
          <p>Prof. Tax: ₹{data.pt}</p>
          <p className="font-bold mt-2">Total: ₹{deductions.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t-2 border-slate-900 flex justify-between text-xl font-bold">
        <span>Net Salary Payable:</span>
        <span>₹{netPay.toFixed(2)}</span>
      </div>
    </div>
  );
});

export default PayslipDocument;
