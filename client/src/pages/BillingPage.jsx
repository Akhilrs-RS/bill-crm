import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";
import {
  Trash2,
  Printer,
  Save,
  RotateCcw,
  Search,
  History,
  X,
  Eye,
  Plus,
} from "lucide-react";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate] = useState(new Date().toLocaleDateString("en-GB"));

  // Footer fields
  const [discount, setDiscount] = useState(0);
  const [lessAmount, setLessAmount] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);

  // Modal States
  const [showQuoteSearch, setShowQuoteSearch] = useState(false);
  const [showInvoiceHistory, setShowInvoiceHistory] = useState(false);
  const [savedQuotations, setSavedQuotations] = useState([]);
  const [savedInvoices, setSavedInvoices] = useState([]);

  // Updated Item State with Category and HSN/SAC
  const [newItem, setNewItem] = useState({
    category: "Design Consultation", // Industry-Specific Category
    hsn: "9983", // Standard SAC for Interior Services
    work: "",
    unit: "Sq.Ft",
    area: "",
    price: "",
    gstPerc: 18,
  });

  // Sequential ID Auto-Generation Logic
  useEffect(() => {
    const lastNum = localStorage.getItem("lastInvoiceNumber") || "1000";
    const newNum = parseInt(lastNum) + 1;
    setInvoiceNo(`MI/SRV/${newNum}/26-27`);

    setSavedQuotations(
      JSON.parse(localStorage.getItem("savedQuotations") || "[]"),
    );
    setSavedInvoices(JSON.parse(localStorage.getItem("savedInvoices") || "[]"));
  }, []);

  const fetchFromQuote = (quote) => {
    setClientName(quote.clientName);
    setClientAddress(quote.clientAddress || "");

    const mappedItems = quote.items.map((i) => ({
      ...newItem,
      work: i.description,
      area: i.area,
      price: i.rate,
      taxableAmount: parseFloat(i.area) * parseFloat(i.rate),
      gstAmount: (parseFloat(i.area) * parseFloat(i.rate) * 18) / 100,
      amount: parseFloat(i.area) * parseFloat(i.rate) * 1.18,
      id: Date.now() + Math.random(),
    }));
    setItems(mappedItems);
    setShowQuoteSearch(false);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newItem.work || !newItem.price) return;

    const taxableAmount =
      parseFloat(newItem.area || 1) * parseFloat(newItem.price);
    const gstAmount = (taxableAmount * parseFloat(newItem.gstPerc || 0)) / 100;
    const totalAmount = taxableAmount + gstAmount;

    setItems([
      ...items,
      {
        ...newItem,
        taxableAmount,
        gstAmount,
        amount: totalAmount,
        id: Date.now(),
      },
    ]);
    // Reset but keep industry defaults
    setNewItem({ ...newItem, work: "", area: "", price: "" });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + item.taxableAmount, 0);
  const totalGst = items.reduce((sum, item) => sum + item.gstAmount, 0);

  const discountAmt = (subTotal * (parseFloat(discount) || 0)) / 100;
  const grandTotal =
    subTotal - discountAmt - (parseFloat(lessAmount) || 0) + totalGst;
  const balanceAmount =
    grandTotal -
    (parseFloat(advanceAmount) || 0) -
    (parseFloat(receivedAmount) || 0);

  const saveInvoice = () => {
    if (!clientName || items.length === 0)
      return alert("Missing client or items");

    // Save current sequence number
    const currentNum = invoiceNo.split("/")[2];
    localStorage.setItem("lastInvoiceNumber", currentNum);

    const newInvoice = {
      invoiceNo,
      invoiceDate,
      clientName,
      clientAddress,
      items,
      subTotal,
      totalGst,
      grandTotal,
      discount,
      lessAmount,
      advanceAmount,
      receivedAmount,
      balanceAmount,
    };

    const existing = JSON.parse(localStorage.getItem("savedInvoices") || "[]");
    const updated = [newInvoice, ...existing];
    localStorage.setItem("savedInvoices", JSON.stringify(updated));
    setSavedInvoices(updated);

    alert(`Invoice ${invoiceNo} Saved. Sequence updated for next entry.`);
  };

  const clearForm = () => {
    if (window.confirm("Clear all data?")) {
      setItems([]);
      setClientName("");
      setClientAddress("");
      setDiscount(0);
      setLessAmount(0);
      setAdvanceAmount(0);
      setReceivedAmount(0);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans text-slate-800 flex flex-col">
      {/* Invoice Info Bar */}
      <div className="bg-blue-50 p-2 grid grid-cols-12 gap-2 border-b border-blue-200 items-end text-slate-600 font-bold uppercase tracking-tight">
        <div className="col-span-2">
          <label className="block text-[10px] text-slate-500">
            Invoice Number
          </label>
          <div className="flex">
            <input
              disabled
              value={invoiceNo}
              className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-black text-blue-800 outline-none"
            />
            <button
              onClick={() => setShowInvoiceHistory(true)}
              className="bg-blue-600 text-white px-2 hover:bg-blue-700 transition"
            >
              <History size={14} />
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] text-slate-500">
            Invoice Date
          </label>
          <input
            disabled
            value={invoiceDate}
            className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-bold text-slate-700"
          />
        </div>
        <div className="col-span-3">
          <label className="block text-[10px] text-slate-500">
            Client Name
          </label>
          <div className="flex">
            <input
              placeholder="Search Client..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-white border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-400"
            />
            <button
              onClick={() => setShowQuoteSearch(true)}
              className="bg-amber-600 text-white px-2 text-[10px] font-bold hover:bg-amber-700"
            >
              FROM QUOTE
            </button>
          </div>
        </div>
        <div className="col-span-3">
          <label className="block text-[10px] text-slate-500">
            Site Address
          </label>
          <input
            placeholder="Work site address..."
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="w-full bg-white border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-400"
          />
        </div>
        <div className="col-span-2 flex justify-between text-[10px] pt-4 italic">
          <div>
            CGST 9%:{" "}
            <span className="text-blue-700">₹{(totalGst / 2).toFixed(2)}</span>
          </div>
          <div>
            SGST 9%:{" "}
            <span className="text-blue-700">₹{(totalGst / 2).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Work Entry Row - Updated with Industry Dropdowns */}
      <div className="bg-orange-50 p-2 grid grid-cols-12 gap-2 border-b border-orange-200">
        <div className="col-span-2">
          <label className="block text-[10px] font-black text-orange-800 uppercase">
            Service Category
          </label>
          <select
            value={newItem.category}
            onChange={(e) =>
              setNewItem({ ...newItem, category: e.target.value })
            }
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm outline-none focus:border-orange-400 font-bold"
          >
            <option>Design Consultation</option>
            <option>3D Rendering</option>
            <option>Furniture Supply</option>
            <option>Execution Work</option>
            <option>Project Management</option>
          </select>
        </div>
        <div className="col-span-4">
          <label className="block text-[10px] font-black text-orange-800 uppercase">
            Work Description
          </label>
          <input
            placeholder="e.g. Living Room False Ceiling"
            value={newItem.work}
            onChange={(e) => setNewItem({ ...newItem, work: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm outline-none focus:border-orange-400 font-medium"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-black text-orange-800 uppercase">
            HSN/SAC
          </label>
          <input
            disabled
            value={newItem.hsn}
            className="w-full bg-orange-100 border border-orange-200 px-2 py-1 text-sm text-center text-orange-900 font-bold"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-black text-orange-800 uppercase">
            Area/Qty
          </label>
          <input
            type="number"
            value={newItem.area}
            onChange={(e) => setNewItem({ ...newItem, area: e.target.value })}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-center outline-none focus:border-orange-400 font-bold"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-black text-orange-800 uppercase text-center">
            Unit
          </label>
          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-xs outline-none"
          >
            <option>Sq.Ft</option>
            <option>L.Ft</option>
            <option>Nos</option>
            <option>LS</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-black text-orange-800 uppercase">
            Rate ₹
          </label>
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-right outline-none font-black text-slate-900"
          />
        </div>
        <div className="col-span-2">
          <button
            onClick={addItem}
            className="w-full h-full bg-indigo-600 text-white font-black uppercase text-xs rounded hover:bg-indigo-700 flex items-center justify-center gap-2 mt-2 py-1 shadow-md"
          >
            <Plus size={16} /> Add Service
          </button>
        </div>
      </div>

      {/* Table and Footer remain structurally similar but with updated styling for professionalism */}
      <div className="flex-grow bg-white overflow-y-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead className="bg-slate-800 text-white sticky top-0 uppercase tracking-widest">
            <tr>
              <th className="px-2 py-2 border-r border-slate-700 text-center w-12 italic">
                Act
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-left">
                Service & Category
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-center w-16 text-[10px]">
                SAC
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-center w-20 font-bold">
                Qty
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-right w-24">
                Rate
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-right w-24 font-bold">
                Taxable
              </th>
              <th className="px-2 py-2 border-r border-slate-700 text-center w-20">
                GST (18%)
              </th>
              <th className="px-2 py-2 text-right w-32 font-black">
                Net Total ₹
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-2 py-1 text-center border-r">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
                <td className="px-2 py-1 border-r">
                  <div className="font-black text-slate-900 uppercase">
                    {item.work}
                  </div>
                  <div className="text-[9px] text-indigo-500 font-bold tracking-wider uppercase">
                    {item.category}
                  </div>
                </td>
                <td className="px-2 py-1 text-center border-r text-gray-400">
                  {item.hsn}
                </td>
                <td className="px-2 py-1 text-center border-r font-bold">
                  {item.area}{" "}
                  <span className="text-[9px] text-gray-400 font-normal">
                    {item.unit}
                  </span>
                </td>
                <td className="px-2 py-1 text-right border-r font-mono">
                  {parseFloat(item.price).toFixed(2)}
                </td>
                <td className="px-2 py-1 text-right border-r font-bold text-slate-600">
                  {item.taxableAmount.toFixed(2)}
                </td>
                <td className="px-2 py-1 text-right border-r text-blue-700 font-medium">
                  ₹{item.gstAmount.toFixed(2)}
                </td>
                <td className="px-2 py-1 text-right font-black text-slate-900 bg-slate-50">
                  ₹{item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Adjustments Summary with Balance Tracking */}
      <div className="bg-white border-t-2 border-slate-200 p-4 grid grid-cols-12 gap-4 shadow-2xl">
        <div className="col-span-8 flex gap-6 items-center">
          <div className="text-right">
            <label className="block text-[10px] font-black text-slate-400 uppercase">
              Sub Total
            </label>
            <div className="text-xl font-bold text-slate-600">
              ₹{subTotal.toFixed(2)}
            </div>
          </div>
          <div className="h-10 w-px bg-gray-200"></div>
          <div className="text-right">
            <label className="block text-[10px] font-black text-slate-400 uppercase">
              Total GST (18%)
            </label>
            <div className="text-xl font-bold text-blue-600">
              ₹{totalGst.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-slate-900 text-white rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">
              Grand Payable
            </div>
            <div className="text-3xl font-black italic tracking-tighter">
              ₹{grandTotal.toFixed(2)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-bold text-slate-400 uppercase">
              Due Balance
            </div>
            <div className="text-sm font-black text-rose-400">
              ₹{balanceAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-slate-900 p-2 flex justify-center gap-2">
        <button
          onClick={clearForm}
          className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-xs font-black flex items-center gap-2 uppercase tracking-widest"
        >
          <RotateCcw size={14} /> Clear
        </button>
        <button
          onClick={saveInvoice}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-2 rounded-xl text-xs font-black flex items-center gap-2 uppercase tracking-widest shadow-xl"
        >
          <Save size={14} /> Finalize Invoice
        </button>
        <button
          onClick={handlePrint}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-2 rounded-xl text-xs font-black flex items-center gap-2 uppercase tracking-widest"
        >
          <Printer size={14} /> Print PDF
        </button>
      </div>

      {/* Hidden component for printing */}
      <div className="hidden">
        <PrintableInvoice
          ref={componentRef}
          data={{
            customer: clientName,
            address: clientAddress,
            items,
            invoiceNo,
            invoiceDate,
            subTotal,
            totalGst,
            grandTotal,
            balanceAmount,
          }}
        />
      </div>
    </div>
  );
}
