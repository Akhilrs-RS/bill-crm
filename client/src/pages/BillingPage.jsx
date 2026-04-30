import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";
import {
  Plus,
  Trash2,
  Printer,
  Save,
  RotateCcw,
  CreditCard,
  User,
  Hash,
} from "lucide-react";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate] = useState(new Date().toLocaleDateString("en-GB"));

  // Logic for Auto-Incrementing Invoice Number
  useEffect(() => {
    const lastNum = localStorage.getItem("lastInvoiceNumber") || "1000";
    const newNum = parseInt(lastNum) + 1;
    setInvoiceNo(`MI/SRV/${newNum}/26-27`); // Mona Interior / Service / Number / Year
  }, []);

  const [newItem, setNewItem] = useState({
    category: "Design Services",
    hsn: "9983", // Standard SAC for Interior Design
    name: "",
    qty: 1,
    rate: "",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.rate) return;
    const amount = parseFloat(newItem.qty) * parseFloat(newItem.rate);
    setItems([...items, { ...newItem, amount, id: Date.now() }]);
    setNewItem({ ...newItem, name: "", qty: 1, rate: "" });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + item.amount, 0);
  const tax = subTotal * 0.18; // 18% GST for professional services
  const grandTotal = subTotal + tax;

  const saveInvoice = () => {
    // Extract number from MI/SRV/1001/26-27
    const currentNum = invoiceNo.split("/")[2];
    localStorage.setItem("lastInvoiceNumber", currentNum);
    alert("Invoice Saved & Sequence Updated");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-700">
      {/* Refined Modern Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Invoice Generator
          </h1>
          <p className="text-slate-500 text-sm">
            Professional billing for Mona Interior Studio
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-right mr-4">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Status
            </span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              ● Draft
            </span>
          </div>
          <button
            onClick={saveInvoice}
            className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200"
          >
            <Save size={18} /> Save Invoice
          </button>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Left Section: Details Entry */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Client & Metadata Card */}
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-2">
                <User size={18} className="text-indigo-500" />
                <h3 className="font-bold text-slate-900">Client Details</h3>
              </div>
              <input
                placeholder="Client Full Name"
                className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500 transition"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <textarea
                placeholder="Site Address"
                rows="2"
                className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500 transition"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-50 pb-2">
                <Hash size={18} className="text-indigo-500" />
                <h3 className="font-bold text-slate-900">Invoice Info</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Invoice No
                  </label>
                  <input
                    disabled
                    value={invoiceNo}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl font-mono font-bold text-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Date
                  </label>
                  <input
                    disabled
                    value={invoiceDate}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Line Item Entry */}
          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-12 gap-4 items-end">
              <div className="col-span-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Service Category
                </label>
                <select
                  className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500 font-bold text-sm"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                >
                  <option>Design Consultation</option>
                  <option>3D Rendering</option>
                  <option>Project Management</option>
                  <option>Execution Work</option>
                  <option>Furniture Supply</option>
                </select>
              </div>
              <div className="col-span-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Description
                </label>
                <input
                  placeholder="e.g. Living Room False Ceiling"
                  className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500 font-bold"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                  Rate (₹)
                </label>
                <input
                  type="number"
                  className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500 font-bold"
                  value={newItem.rate}
                  onChange={(e) =>
                    setNewItem({ ...newItem, rate: e.target.value })
                  }
                />
              </div>
              <div className="col-span-3">
                <button
                  onClick={addItem}
                  className="w-full bg-indigo-600 text-white p-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="p-5">Service Details</th>
                  <th className="p-5 text-right">SAC</th>
                  <th className="p-5 text-right">Amount</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-5">
                      <span className="block font-black text-slate-900">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-indigo-500 font-bold uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-5 text-right font-mono text-slate-400">
                      {item.hsn}
                    </td>
                    <td className="p-5 text-right font-black text-slate-900 text-lg">
                      ₹{item.amount.toLocaleString()}
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-red-500 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && (
              <div className="p-20 text-center text-slate-300 font-bold uppercase tracking-widest italic">
                No items added to invoice
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Totals & Actions */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <CreditCard size={120} />
            </div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-8">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-slate-100 pb-6 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-slate-900 font-bold">
                  ₹{subTotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span className="text-slate-400">GST (18%)</span>
                <span className="text-slate-900 font-bold">
                  ₹{tax.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                Total Payable
              </span>
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                ₹{grandTotal.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setItems([])}
                className="bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Reset
              </button>
              <button
                onClick={handlePrint}
                className="bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
              >
                <Printer size={18} /> Print
              </button>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-[32px] border border-amber-100">
            <h4 className="text-amber-800 font-bold text-sm mb-2">
              Billing Note:
            </h4>
            <p className="text-amber-700/70 text-xs leading-relaxed">
              This is a computer-generated document for Mona Interior Studio.
              50% advance is required to initiate 3D rendering services.
            </p>
          </div>
        </div>
      </div>

      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableInvoice
          ref={componentRef}
          data={{
            customer: clientName,
            address: clientAddress,
            items,
            invoiceNo,
            invoiceDate,
            tax,
            grandTotal,
          }}
          docType="Invoice"
        />
      </div>
    </div>
  );
}
