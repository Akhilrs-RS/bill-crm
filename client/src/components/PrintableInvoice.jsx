import React, { forwardRef } from "react";

const PrintableInvoice = forwardRef(({ data, docType }, ref) => {
  const safeData = data || {};
  const items = safeData.items || [];

  // Math Logic (9% CGST + 9% SGST = 18% Total)
  const subtotal = items.reduce(
    (sum, item) =>
      sum + parseFloat(item.area || 0) * parseFloat(item.rate || 0),
    0,
  );
  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;

  return (
    <div
      ref={ref}
      className="p-10 bg-white text-black font-sans w-full max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex justify-between border-b-2 border-slate-900 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mona Interior Studio</h1>
          <p>Professional Interior Design Services</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold uppercase">{docType}</h2>
          <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-8">
        <p className="font-bold text-slate-500 uppercase text-xs">Client:</p>
        <p className="text-lg font-semibold">
          {safeData.customer || "Client Name"}
        </p>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Area (Sq.ft)</th>
            <th className="p-3 border">Rate (₹)</th>
            <th className="p-3 border">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="p-3 border">{item.description}</td>
              <td className="p-3 border text-center">{item.area}</td>
              <td className="p-3 border text-center">{item.rate}</td>
              <td className="p-3 border text-right">
                {(item.area * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="w-64 ml-auto space-y-2 text-right">
        <div className="flex justify-between">
          <span>Subtotal:</span> <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>CGST (9%):</span> <span>₹{cgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>SGST (9%):</span> <span>₹{sgst.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
          <span>Total:</span> <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
});

export default PrintableInvoice;
