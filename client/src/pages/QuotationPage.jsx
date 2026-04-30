import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableQuotation from "../components/PrintableQuotation";
import { FileText, Plus, Printer, Save } from "lucide-react";

export default function QuotationPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    description: "",
    area: "",
    rate: "",
  });
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.description || !newItem.area || !newItem.rate) return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ description: "", area: "", rate: "" });
  };

  const saveQuotation = () => {
    if (!clientName || items.length === 0) return alert("Add client and items first");
    const newQuote = {
      id: `QT-${Date.now()}`,
      clientName,
      clientAddress,
      items,
      date: new Date().toLocaleDateString("en-GB"),
      total: items.reduce((s, i) => s + i.area * i.rate, 0)
    };
    const existing = JSON.parse(localStorage.getItem("savedQuotations") || "[]");
    localStorage.setItem("savedQuotations", JSON.stringify([newQuote, ...existing]));
    alert("Quotation Saved Successfully");
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-amber-700 text-white rounded-lg">
          <FileText size={28} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Generate Quotation
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Entry Sidebar */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4 text-amber-900 border-b pb-2 uppercase tracking-wide">
            Add Work Item
          </h2>
          <form onSubmit={addItem} className="space-y-4">
            <input
              placeholder="Description (e.g., Living Room Design)"
              className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-amber-600"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Qty/Area"
                className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-amber-600"
                value={newItem.area}
                onChange={(e) =>
                  setNewItem({ ...newItem, area: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Unit Price"
                className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-amber-600"
                value={newItem.rate}
                onChange={(e) =>
                  setNewItem({ ...newItem, rate: e.target.value })
                }
              />
            </div>
            <button className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
              <Plus size={20} /> Add to Details
            </button>
          </form>
        </div>

        {/* Preview and Header Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Customer Information
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Full Client Name"
                className="w-full text-xl font-bold border-b-2 border-slate-100 py-2 outline-none focus:border-amber-600"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <input
                placeholder="Site / Client Address"
                className="w-full text-sm border-b-2 border-slate-100 py-2 outline-none focus:border-amber-600"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>

            <div className="mt-8 flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500 font-medium">
                  Total Items:{" "}
                  <span className="text-amber-700 font-bold">
                    {items.length}
                  </span>
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  Estimated Total:{" "}
                  <span className="text-amber-700 font-bold">
                    ₹
                    {items
                      .reduce((s, i) => s + i.area * i.rate, 0)
                      .toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={saveQuotation}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-amber-100"
                >
                  <Save size={20} /> Save Quote
                </button>
                <button
                  onClick={handlePrint}
                  disabled={items.length === 0}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3 transition-all disabled:opacity-50"
                >
                  <Printer size={20} /> Print
                </button>
              </div>
            </div>
          </div>

          {/* Mini Table Preview */}
          {items.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Qty</th>
                    <th className="px-6 py-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} className="border-t text-sm">
                      <td className="px-6 py-4 font-medium">{i.description}</td>
                      <td className="px-6 py-4">{i.area}</td>
                      <td className="px-6 py-4 font-bold">
                        ₹{(i.area * i.rate).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Hidden PDF Section */}
      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableQuotation
          ref={componentRef}
          data={{ customer: clientName, items }}
        />
      </div>
    </div>
  );
}
