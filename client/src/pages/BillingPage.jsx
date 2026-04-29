import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";
import { Plus, Trash2, Printer, Save, RotateCcw } from "lucide-react";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [clientName, setClientName] = useState("");
  const [invoiceNo] = useState(`RJ/${Math.floor(Math.random() * 10000)}/23-24`);
  const [invoiceDate] = useState(new Date().toLocaleDateString());

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    qty: "",
    rate: "",
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.qty || !newItem.rate) return;
    const amount = parseFloat(newItem.qty) * parseFloat(newItem.rate);
    setItems([...items, { ...newItem, amount, id: Date.now() }]);
    setNewItem({ code: "", name: "", qty: "", rate: "" });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-xs">
      {/* Top Purple Header Bar */}
      <div className="bg-purple-700 text-white px-4 py-1 flex justify-between items-center font-bold">
        <span>SALES INVOICE</span>
        <span className="bg-emerald-500 px-2 rounded">
          Financial Year 23-24
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Metadata Section */}
        <div className="bg-white p-4 border-b shadow-sm grid grid-cols-4 gap-4">
          <div>
            <label className="block text-gray-500 mb-1">Invoice Number</label>
            <input
              disabled
              value={invoiceNo}
              className="w-full bg-slate-50 p-2 border border-blue-200 rounded text-blue-800 font-bold"
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Invoice Date</label>
            <input
              disabled
              value={invoiceDate}
              className="w-full bg-cyan-50 p-2 border border-cyan-200 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-500 mb-1">Select Customer</label>
            <input
              placeholder="Enter Customer Name"
              className="w-full bg-yellow-50 p-2 border border-yellow-200 rounded outline-none focus:border-yellow-400"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
        </div>

        {/* Item Entry Row */}
        <div className="bg-white p-2 border shadow-sm grid grid-cols-12 gap-2 items-end">
          <div className="col-span-2">
            <label className="block mb-1 text-gray-400">Product Code</label>
            <input
              className="w-full p-2 border bg-orange-50 outline-none"
              value={newItem.code}
              onChange={(e) => setNewItem({ ...newItem, code: e.target.value })}
            />
          </div>
          <div className="col-span-4">
            <label className="block mb-1 text-gray-400">Product Name</label>
            <input
              className="w-full p-2 border bg-orange-50 outline-none"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 text-gray-400">Qty</label>
            <input
              type="number"
              className="w-full p-2 border bg-orange-50 outline-none"
              value={newItem.qty}
              onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-1 text-gray-400">Rate (₹)</label>
            <input
              type="number"
              className="w-full p-2 border bg-orange-50 outline-none"
              value={newItem.rate}
              onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <button
              onClick={addItem}
              className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 flex justify-center items-center gap-2"
            >
              <Plus size={16} /> ADD
            </button>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="bg-white border shadow-sm h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b sticky top-0">
              <tr className="text-gray-600 text-left uppercase">
                <th className="p-2 border-r w-16">Remove</th>
                <th className="p-2 border-r w-12 text-center">S.No</th>
                <th className="p-2 border-r w-32">Code</th>
                <th className="p-2 border-r">Product Name</th>
                <th className="p-2 border-r w-24 text-right">Qty</th>
                <th className="p-2 border-r w-24 text-right">Rate</th>
                <th className="p-2 text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-slate-50">
                  <td className="p-2 border-r text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                  <td className="p-2 border-r text-center">{index + 1}</td>
                  <td className="p-2 border-r uppercase">
                    {item.code || "---"}
                  </td>
                  <td className="p-2 border-r font-medium">{item.name}</td>
                  <td className="p-2 border-r text-right font-mono">
                    {parseFloat(item.qty).toFixed(2)}
                  </td>
                  <td className="p-2 border-r text-right font-mono">
                    {parseFloat(item.rate).toFixed(2)}
                  </td>
                  <td className="p-2 text-right font-bold font-mono">
                    ₹{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Stats & Actions */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white p-4 border shadow-sm grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tot Nos:</span>{" "}
                <span className="font-bold text-blue-600">{items.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Tot Qty:</span>{" "}
                <span className="font-bold text-blue-600">
                  {items.reduce((a, b) => a + parseFloat(b.qty), 0)}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center items-end">
              <span className="text-gray-400">Total Amount Received</span>
              <div className="text-5xl font-black text-emerald-600 font-mono">
                {totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setItems([])}
              className="bg-yellow-500 text-white font-bold p-2 rounded flex flex-col items-center justify-center gap-1"
            >
              <RotateCcw size={18} /> Clear - F8
            </button>
            <button
              onClick={handlePrint}
              className="bg-emerald-600 text-white font-bold p-2 rounded flex flex-col items-center justify-center gap-1"
            >
              <Printer size={18} /> Print - F9
            </button>
            <button className="bg-red-500 text-white font-bold p-2 rounded flex flex-col items-center justify-center gap-1">
              <Trash2 size={18} /> Delete - F11
            </button>
            <button className="bg-indigo-600 text-white font-bold p-2 rounded flex flex-col items-center justify-center gap-1 shadow-lg border-b-4 border-indigo-800 active:border-b-0">
              <Save size={18} /> Save - F2
            </button>
          </div>
        </div>
      </div>

      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableInvoice
          ref={componentRef}
          data={{ customer: clientName, items, invoiceNo, invoiceDate }}
          docType="Invoice"
        />
      </div>
    </div>
  );
}
