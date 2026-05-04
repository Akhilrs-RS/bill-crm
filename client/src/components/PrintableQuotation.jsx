import React, { forwardRef } from "react";

const PrintableQuotation = forwardRef(({ data }, ref) => {
  const subtotal = data.items.reduce(
    (sum, item) => sum + item.area * item.rate,
    0,
  );
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <div
      ref={ref}
      className="p-10 bg-white text-slate-800 font-sans w-[210mm] min-h-[297mm] mx-auto border shadow-lg text-sm"
    >
      {/* Header Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-amber-900 tracking-widest uppercase">
          Interior Quotation
        </h1>
        <div className="mt-4 space-y-1 font-semibold">
          <p>Quotation Number: QT-{Date.now().toString().slice(-6)}</p>
          <p>
            Date:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>Valid For: 30 Days</p>
        </div>
      </div>

      {/* From/To Section */}
      <div className="flex justify-between mb-8">
        <div className="w-1/2">
          <p className="font-bold">From:</p>
          <p className="font-bold text-base text-amber-900">Mona Interior Studio</p>
          <p>Professional Interior Design Services</p>
          <p>GSTIN: [Your GST Number Here]</p>
        </div>
        <div className="w-1/2 text-right">
          <p className="font-bold">To:</p>
          <p className="font-bold text-base">
            {data.customer || "Client Name"}
          </p>
          <p className="whitespace-pre-line">{data.address || "Client Address / Site Location"}</p>
        </div>
      </div>

      <p className="font-bold mb-2 uppercase text-amber-900 border-b border-amber-100 pb-1">Itemized Quotation Details:</p>

      {/* Table */}
      <table className="w-full border-collapse mb-6">
        <thead>
          <tr className="bg-amber-700 text-white uppercase text-[10px]">
            <th className="border p-2 text-left w-2/5">Work Description</th>
            <th className="border p-2">Area / Qty</th>
            <th className="border p-2">Unit Price (₹)</th>
            <th className="border p-2">Total (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2 text-left font-medium uppercase">{item.description}</td>
              <td className="border p-2">{item.area} units</td>
              <td className="border p-2">{parseFloat(item.rate).toFixed(2)}</td>
              <td className="border p-2 font-semibold">
                {(item.area * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
          {/* Subtotal Row */}
          <tr className="bg-slate-50 font-bold">
            <td colSpan="3" className="border p-2 text-right uppercase">
              Taxable Subtotal
            </td>
            <td className="border p-2 text-center">
              ₹{subtotal.toLocaleString()}
            </td>
          </tr>
          <tr className="bg-orange-50 font-bold text-orange-800">
            <td colSpan="3" className="border p-2 text-right uppercase">
              GST (18%)
            </td>
            <td className="border p-2 text-center">₹{tax.toLocaleString()}</td>
          </tr>
          <tr className="bg-amber-800 text-white font-bold text-lg">
            <td colSpan="3" className="border p-2 text-right uppercase">
              Grand Total
            </td>
            <td className="border p-2 text-center">₹{total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      {/* Terms and Conditions */}
      <div className="mb-12">
        <p className="font-bold uppercase mb-2">Terms and Conditions:</p>
        <ul className="list-disc ml-5 space-y-1 text-xs">
          <li>
            Payment Terms: Payment is due within 30 days of the invoice date.
          </li>
          <li>
            Delivery Time: Estimated delivery time is 7-10 business days after
            order confirmation.
          </li>
          <li>Validity: This quotation is valid until October 21, 2026.</li>
          <li>Warranty: All products come with a warranty of 1 year.</li>
          <li>
            Shipping: Shipping cost is calculated based on the delivery
            location.
          </li>
        </ul>
      </div>

      {/* Footer Signatures */}
      <div className="flex justify-between items-end mt-10">
        <div>
          <p className="mb-8">Prepared By:</p>
          <p className="font-bold">Matt Zhang</p>
          <p className="text-xs">Sales Manager</p>
        </div>
        <div className="text-right">
          <p className="mb-8">Approved By:</p>
          <p className="font-bold">Hannah Morales</p>
          <p className="text-xs">Client</p>
        </div>
      </div>
    </div>
  );
});

export default PrintableQuotation;
