import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";
import { Trash2, Printer, Save, RotateCcw, Search, History, X, Eye } from "lucide-react";

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

  const [newItem, setNewItem] = useState({
    work: "",
    unit: "Sq.Ft",
    area: "",
    price: "",
    gstPerc: 18,
  });

  // Load Data
  useEffect(() => {
    const lastNum = localStorage.getItem("lastInvoiceNumber") || "1000";
    const newNum = parseInt(lastNum) + 1;
    setInvoiceNo(`MI/SRV/${newNum}/26-27`); 
    
    setSavedQuotations(JSON.parse(localStorage.getItem("savedQuotations") || "[]"));
    setSavedInvoices(JSON.parse(localStorage.getItem("savedInvoices") || "[]"));
  }, []);

  const fetchFromQuote = (quote) => {
    setClientName(quote.clientName);
    setClientAddress(quote.clientAddress || "");
    
    // Map quote items to invoice items with default GST
    const mappedItems = quote.items.map(i => ({
      work: i.description,
      unit: "Sq.Ft",
      area: i.area,
      price: i.rate,
      gstPerc: 18,
      taxableAmount: parseFloat(i.area) * parseFloat(i.rate),
      gstAmount: (parseFloat(i.area) * parseFloat(i.rate) * 18) / 100,
      amount: (parseFloat(i.area) * parseFloat(i.rate)) * 1.18,
      id: Date.now() + Math.random()
    }));
    setItems(mappedItems);
    setShowQuoteSearch(false);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newItem.work || !newItem.price) return;
    
    const taxableAmount = parseFloat(newItem.area || 1) * parseFloat(newItem.price);
    const gstAmount = (taxableAmount * parseFloat(newItem.gstPerc || 0)) / 100;
    const totalAmount = taxableAmount + gstAmount;

    setItems([...items, { 
      ...newItem, 
      taxableAmount,
      gstAmount,
      amount: totalAmount, 
      id: Date.now() 
    }]);
    setNewItem({ work: "", unit: "Sq.Ft", area: "", price: "", gstPerc: 18 });
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subTotal = items.reduce((sum, item) => sum + item.taxableAmount, 0);
  const totalGst = items.reduce((sum, item) => sum + item.gstAmount, 0);
  const totalArea = items.reduce((sum, item) => sum + parseFloat(item.area || 0), 0);
  
  const discountAmt = (subTotal * (parseFloat(discount) || 0)) / 100;
  const grandTotal = (subTotal - discountAmt - (parseFloat(lessAmount) || 0)) + totalGst;
  const balanceAmount = grandTotal - (parseFloat(advanceAmount) || 0) - (parseFloat(receivedAmount) || 0);

  const saveInvoice = () => {
    if (!clientName || items.length === 0) return alert("Missing client or items");
    
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
      balanceAmount
    };
    
    const existing = JSON.parse(localStorage.getItem("savedInvoices") || "[]");
    const updated = [newInvoice, ...existing];
    localStorage.setItem("savedInvoices", JSON.stringify(updated));
    setSavedInvoices(updated);
    
    alert("Invoice Saved Successfully");
  };

  const loadOldInvoice = (inv) => {
    setInvoiceNo(inv.invoiceNo);
    setClientName(inv.clientName);
    setClientAddress(inv.clientAddress);
    setItems(inv.items);
    setDiscount(inv.discount);
    setLessAmount(inv.lessAmount);
    setAdvanceAmount(inv.advanceAmount);
    setReceivedAmount(inv.receivedAmount);
    setShowInvoiceHistory(false);
  };

  const clearForm = () => {
    if(window.confirm("Clear all data?")) {
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
      <div className="bg-blue-50 p-2 grid grid-cols-12 gap-2 border-b border-blue-200 items-end text-slate-600">
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Invoice Number</label>
          <div className="flex">
            <input disabled value={invoiceNo} className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-bold text-blue-800 outline-none" />
            <button onClick={() => setShowInvoiceHistory(true)} className="bg-blue-600 text-white px-2 hover:bg-blue-700 transition"><History size={14}/></button>
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Invoice Date</label>
          <input disabled value={invoiceDate} className="w-full bg-blue-100 border border-blue-200 px-2 py-1 text-sm font-bold text-slate-700" />
        </div>
        <div className="col-span-3">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Client Name</label>
          <div className="flex">
            <input 
              placeholder="Search Client..." 
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-white border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-400" 
            />
            <button onClick={() => setShowQuoteSearch(true)} className="bg-amber-600 text-white px-2 text-[10px] font-bold hover:bg-amber-700">FROM QUOTE</button>
          </div>
        </div>
        <div className="col-span-3">
          <label className="block text-[10px] font-bold text-slate-500 uppercase">Site Address</label>
          <input 
            placeholder="Work site address..." 
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            className="w-full bg-white border border-blue-200 px-2 py-1 text-sm outline-none focus:border-blue-400" 
          />
        </div>
        <div className="col-span-2 flex justify-between text-[10px] font-bold pt-4">
          <div>CGST 9%: <span className="text-blue-700">₹{(totalGst/2).toFixed(2)}</span></div>
          <div>SGST 9%: <span className="text-blue-700">₹{(totalGst/2).toFixed(2)}</span></div>
        </div>
      </div>

      {/* Work Entry Row */}
      <div className="bg-orange-50 p-1 grid grid-cols-12 gap-1 border-b border-orange-200">
        <div className="col-span-5">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">Work Description</label>
          <input 
            placeholder="e.g. Living Room False Ceiling"
            value={newItem.work}
            onChange={(e) => setNewItem({...newItem, work: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm outline-none focus:border-orange-400 font-medium" 
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">Unit</label>
          <select 
            value={newItem.unit}
            onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm outline-none focus:border-orange-400"
          >
            <option>Sq.Ft</option>
            <option>L.Ft</option>
            <option>Nos</option>
            <option>LS</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">Area</label>
          <input 
            type="number"
            value={newItem.area}
            onChange={(e) => setNewItem({...newItem, area: e.target.value})}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-center outline-none focus:border-orange-400" 
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase tracking-tighter">Price / Unit(₹)</label>
          <input 
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-right outline-none focus:border-orange-400 font-bold" 
          />
        </div>
        <div className="col-span-1">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">GST %</label>
          <input 
            type="number"
            value={newItem.gstPerc}
            onChange={(e) => setNewItem({...newItem, gstPerc: e.target.value})}
            className="w-full bg-white border border-orange-200 px-2 py-1 text-sm text-center outline-none focus:border-orange-400" 
          />
        </div>
        <div className="col-span-2">
          <label className="block text-[10px] font-bold text-orange-800 text-center uppercase">Total Incl Tax ₹</label>
          <div className="w-full bg-orange-100 border border-orange-200 px-2 py-1 text-sm text-right font-bold text-orange-700 h-[26px]">
            {((parseFloat(newItem.area || 1) * parseFloat(newItem.price || 0)) * (1 + (parseFloat(newItem.gstPerc || 0)/100))).toFixed(2)}
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-grow bg-white overflow-y-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-gray-100 border-b border-gray-300 sticky top-0">
            <tr className="uppercase text-gray-600 font-bold">
              <th className="px-2 py-1 border-r border-gray-300 text-center w-12">Rem</th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-10">S#</th>
              <th className="px-2 py-1 border-r border-gray-300 text-left">Work Description</th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-16">Unit</th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-16">Area</th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-24">Price</th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-24">Taxable</th>
              <th className="px-2 py-1 border-r border-gray-300 text-center w-12">GST%</th>
              <th className="px-2 py-1 border-r border-gray-300 text-right w-20">GST ₹</th>
              <th className="px-2 py-1 text-right w-24">Net Amt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-blue-50">
                <td className="px-2 py-1 border-r border-gray-200 text-center">
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={12} />
                  </button>
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center font-bold text-gray-400">{idx + 1}</td>
                <td className="px-2 py-1 border-r border-gray-200 uppercase font-medium">{item.work}</td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-gray-500">{item.unit}</td>
                <td className="px-2 py-1 border-r border-gray-200 text-center">{item.area}</td>
                <td className="px-2 py-1 border-r border-gray-200 text-right">{parseFloat(item.price).toFixed(2)}</td>
                <td className="px-2 py-1 border-r border-gray-200 text-right font-semibold text-gray-600">{item.taxableAmount.toFixed(2)}</td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-blue-600">{item.gstPerc}%</td>
                <td className="px-2 py-1 border-r border-gray-200 text-right text-blue-700 font-medium">{item.gstAmount.toFixed(2)}</td>
                <td className="px-2 py-1 text-right font-black text-slate-900">{item.amount.toFixed(2)}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="10" className="py-20 text-center text-gray-300 font-bold uppercase tracking-widest italic">
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
            <span className="text-[10px] font-bold text-blue-800 uppercase">Tot Taxable:</span>
            <span className="text-sm font-bold text-blue-900">₹{subTotal.toFixed(2)}</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-3 py-1 flex gap-2 items-center">
            <span className="text-[10px] font-bold text-blue-800 uppercase">Tot GST:</span>
            <span className="text-sm font-bold text-blue-900">₹{totalGst.toFixed(2)}</span>
          </div>
        </div>

        {/* Center: Adjustments */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 bg-orange-50/50 p-2 border border-orange-100 rounded-lg">
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Invoice Disc %</label>
            <input 
              type="number" 
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none" 
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Advance Amount</label>
            <input 
              type="number" 
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none" 
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Invoice Less ₹</label>
            <input 
              type="number" 
              value={lessAmount}
              onChange={(e) => setLessAmount(e.target.value)}
              className="w-20 bg-white border border-orange-200 px-1 py-0.5 text-xs text-right outline-none" 
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Amount Received</label>
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
            <div className="text-[10px] font-bold text-yellow-800 uppercase -mb-1">Net Payable</div>
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
        <button onClick={clearForm} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm">
          <RotateCcw size={14} /> Clear - F8
        </button>
        <button onClick={() => setShowInvoiceHistory(true)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm">
          <History size={14} /> History - F9
        </button>
        <button onClick={() => window.alert("Delete function")} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm">
          <Trash2 size={14} /> Delete - F1
        </button>
        <button onClick={handlePrint} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm">
          <Printer size={14} /> Print - F5
        </button>
        <button onClick={saveInvoice} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-1.5 rounded flex items-center gap-2 text-xs font-bold transition shadow-sm">
          <Save size={14} /> Save - F2
        </button>
      </div>

      {/* MODALS */}
      {showQuoteSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-amber-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><Search size={20}/> Fetch from Saved Quotations</h3>
              <button onClick={() => setShowQuoteSearch(false)}><X size={24}/></button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {savedQuotations.length === 0 && <p className="text-center text-gray-400 py-10">No saved quotations found.</p>}
              <div className="grid gap-2">
                {savedQuotations.map(q => (
                  <div key={q.id} className="border p-3 rounded-xl hover:bg-amber-50 flex justify-between items-center transition">
                    <div>
                      <p className="font-bold text-slate-800">{q.clientName}</p>
                      <p className="text-xs text-slate-500">{q.date} | {q.items.length} Items</p>
                      <p className="text-[10px] text-gray-400">{q.clientAddress}</p>
                    </div>
                    <button 
                      onClick={() => fetchFromQuote(q)}
                      className="bg-amber-100 text-amber-700 px-4 py-2 rounded-lg font-bold text-xs hover:bg-amber-200"
                    >
                      SELECT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showInvoiceHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
            <div className="bg-blue-700 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2"><History size={20}/> Saved Invoices History</h3>
              <button onClick={() => setShowInvoiceHistory(false)}><X size={24}/></button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              {savedInvoices.length === 0 && <p className="text-center text-gray-400 py-10">No saved invoices found.</p>}
              <div className="grid gap-2">
                {savedInvoices.map(inv => (
                  <div key={inv.invoiceNo} className="border p-3 rounded-xl hover:bg-blue-50 flex justify-between items-center transition">
                    <div>
                      <p className="font-bold text-blue-800">{inv.invoiceNo}</p>
                      <p className="text-xs font-bold text-slate-700">{inv.clientName}</p>
                      <p className="text-[10px] text-slate-500">{inv.invoiceDate} | ₹{inv.grandTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => loadOldInvoice(inv)}
                        className="bg-blue-100 text-blue-700 p-2 rounded-lg hover:bg-blue-200"
                        title="Load to Editor"
                      >
                        <Eye size={16}/>
                      </button>
                      <button 
                        onClick={() => {
                          loadOldInvoice(inv);
                          setTimeout(handlePrint, 500);
                        }}
                        className="bg-teal-100 text-teal-700 p-2 rounded-lg hover:bg-teal-200"
                        title="Quick Print"
                      >
                        <Printer size={16}/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableInvoice
          ref={componentRef}
          data={{
            customer: clientName,
            address: clientAddress,
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
            balanceAmount
          }}
          docType="Invoice"
        />
      </div>
    </div>
  );
}
