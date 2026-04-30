import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";
import { Trash2, Printer, Save, RotateCcw, Search, History, X, Eye } from "lucide-react";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [clientName, setClientName] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate] = useState(new Date().toLocaleDateString("en-GB"));

  // Footer fields
  const [discount, setDiscount] = useState(0);
  const [lessAmount, setLessAmount] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [receivedAmount, setReceivedAmount] = useState(0);

  const [newItem, setNewItem] = useState({
    work: "",
    unit: "Sq.Ft",
    area: "",
    price: "",
    gstPerc: 18,
  });

  // Logic for Auto-Incrementing Invoice Number
  useEffect(() => {
    const lastNum = localStorage.getItem("lastInvoiceNumber") || "1000";
    const newNum = parseInt(lastNum) + 1;
    setInvoiceNo(`MI/SRV/${newNum}/26-27`);
  }, []);

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
    setNewItem({ work: "", unit: "Sq.Ft", area: "", price: "", gstPerc: 18 });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + item.taxableAmount, 0);
  const totalGst = items.reduce((sum, item) => sum + item.gstAmount, 0);
  const totalArea = items.reduce(
    (sum, item) => sum + parseFloat(item.area || 0),
    0,
  );

  const discountAmt = (subTotal * (parseFloat(discount) || 0)) / 100;
  const grandTotal =
    subTotal - discountAmt - (parseFloat(lessAmount) || 0) + totalGst;
  const balanceAmount =
    grandTotal -
    (parseFloat(advanceAmount) || 0) -
    (parseFloat(receivedAmount) || 0);

  const saveInvoice = () => {
    const currentNum = invoiceNo.split("/")[2];
    localStorage.setItem("lastInvoiceNumber", currentNum);
    alert("Invoice Saved Successfully");
  };

  const clearForm = () => {
    if (window.confirm("Clear all data?")) {
      setItems([]);
      setClientName("");
      setDiscount(0);
      setLessAmount(0);
      setAdvanceAmount(0);
      setReceivedAmount(0);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen font-sans text-slate-800 flex flex-col">
      {/* Invoice Info Bar */}
      <div className="bg-blue-50 p-2 grid grid-cols-12 gap-2 border-b border-blue-200 items-end text-slate-600">
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">
            Invoice Number
          </label>
          <input
            disabled
            value={invoiceNo}
            className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-bold text-blue-800 outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">
            Invoice Date
          </label>
          <input
            disabled
            value={invoiceDate}
            className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-bold text-slate-700"
          />
        </div>
        <div className="col-span-4">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">
            Client / Site Selection
          </label>
          <div className="flex">
            <input
              placeholder="Search Client Name..."
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-white border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-400"
            />
            <button className="bg-blue-600 text-white px-2 text-xs font-bold">
              NEW
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
            Total Taxable Value
          </label>
          <div className="bg-orange-100 border border-orange-200 px-2 py-1 text-sm font-bold text-orange-700 text-right">
            ₹{subTotal.toFixed(2)}
          </div>
        </div>
        <div className="col-span-2 flex justify-between text-[10px] font-bold pt-4">
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

      {/* Work Entry Row */}
      <div className="bg-orange-50 p-1 grid grid-cols-12 gap-1 border-b border-orange-200">
        <div className="col-span-5">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">
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
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">
            Unit
          </label>
          <select
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm outline-none focus:border-orange-400"
          >
            <option>Sq.Ft</option>
            <option>L.Ft</option>
            <option>Nos</option>
            <option>LS</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">
            Area
          </label>
          <input
            type="number"
            value={newItem.area}
            onChange={(e) => setNewItem({ ...newItem, area: e.target.value })}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-center outline-none focus:border-orange-400"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase tracking-tighter">
            Price / Unit(₹)
          </label>
          <input
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            onKeyPress={(e) => e.key === "Enter" && addItem()}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-right outline-none focus:border-orange-400 font-bold"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">
            GST %
          </label>
          <input
            type="number"
            value={newItem.gstPerc}
            onChange={(e) =>
              setNewItem({ ...newItem, gstPerc: e.target.value })
            }
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-center outline-none focus:border-orange-400"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">
            Total Incl Tax ₹
          </label>
          <div className="w-full bg-orange-100 border border-orange-200 px-2 py-1 text-sm text-right font-bold text-orange-700 h-[26px]">
            {(
              parseFloat(newItem.area || 1) *
              parseFloat(newItem.price || 0) *
              (1 + parseFloat(newItem.gstPerc || 0) / 100)
            ).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-grow bg-white overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-gray-100 border-b border-gray-300 sticky top-0">
            <tr className="uppercase text-gray-600 font-bold">
              <th className="px-2 py-1 border-r border-gray-300 text-center w-12">
                Rem
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-10">
                S#
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-left">
                Work Description
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-16">
                Unit
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-16">
                Area
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-24">
                Price
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-24">
                Taxable
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-12">
                GST%
              </th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-20">
                GST ₹
              </th>
              <th className="px-2 py-1 text-right w-24">Net Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-blue-50">
                <td className="px-2 py-1 border-r border-gray-200 text-center">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center font-bold text-gray-400">
                  {idx + 1}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 uppercase font-medium">
                  {item.work}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-gray-500">
                  {item.unit}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center">
                  {item.area}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-right">
                  {parseFloat(item.price).toFixed(2)}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-right font-semibold text-gray-600">
                  {item.taxableAmount.toFixed(2)}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-blue-600">
                  {item.gstPerc}%
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-right text-blue-700 font-medium">
                  {item.gstAmount.toFixed(2)}
                </td>
                <td className="px-2 py-1 text-right font-black text-slate-900">
                  {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest italic"
                >
                  No work details added to invoice
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 p-2 border-t border-gray-300 flex justify-between items-end gap-4">
        {/* Left: Stats */}
        <div className="flex gap-4 mb-2">
          <div className="bg-blue-50 border border-blue-200 px-3 py-1 flex gap-2 items-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase">
              Tot Taxable:
            </span>
            <span className="text-sm font-bold text-blue-900">
              ₹{subTotal.toFixed(2)}
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-3 py-1 flex gap-2 items-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase">
              Tot GST:
            </span>
            <span className="text-sm font-bold text-blue-900">
              ₹{totalGst.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Center: Adjustments */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-orange-50/50 p-2 border border-orange-100 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">
              Invoice Disc %
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">
              Advance Amount
            </label>
            <input
              type="number"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">
              Invoice Less ₹
            </label>
            <input
              type="number"
              value={lessAmount}
              onChange={(e) => setLessAmount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none"
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">
              Amount Received
            </label>
            <input
              type="number"
              value={receivedAmount}
              onChange={(e) => setReceivedAmount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none"
            />
          </div>
        </div>

        {/* Right: Big Total */}
        <div className="flex items-center gap-4">
          <div className="text-4xl text-slate-400 font-light">₹</div>
          <div className="bg-yellow-100 border border-yellow-200 px-10 py-2 rounded shadow-inner text-right min-w-[200px]">
            <div className="text-[10px] font-bold text-yellow-800 uppercase -mb-1">
              Net Payable
            </div>
            <div className="text-5xl font-black text-emerald-600 tracking-tighter">
              {grandTotal.toFixed(2)}
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
              Bal: ₹{balanceAmount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-slate-800 p-1 flex justify-center gap-1">
        <button
          onClick={clearForm}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm"
        >
          <RotateCcw size={14} /> Clear - F8
        </button>
        <button
          onClick={handlePrint}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm"
        >
          <Printer size={14} /> Print - F5
        </button>
        <button
          onClick={saveInvoice}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm"
        >
          <Save size={14} /> Save - F2
        </button>
      </div>

      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableInvoice
          ref={componentRef}
          data={{
            customer: clientName,
            items,
            invoiceNo,
            invoiceDate,
            discount,
            lessAmount,
            advanceAmount,
            receivedAmount,
            subTotal,
            totalGst,
            grandTotal,
            balanceAmount,
          }}
          docType="Invoice"
        />
      </div>
    </div>
  );
}
