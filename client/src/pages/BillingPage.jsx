import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "../components/PrintableInvoice";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    description: "",
    area: "",
    rate: "",
  });
  const [clientName, setClientName] = useState("");
  const [docType, setDocType] = useState("Quotation");
  const componentRef = useRef();

  const handlePrint = useReactToPrint({ contentRef: componentRef });

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.description || !newItem.area || !newItem.rate) return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ description: "", area: "", rate: "" });
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Billing & Quotation</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <select
            className="w-full p-3 mb-4 border rounded-xl"
            onChange={(e) => setDocType(e.target.value)}
          >
            <option>Quotation</option>
            <option>Invoice</option>
          </select>
          <form onSubmit={addItem} className="space-y-3">
            <input
              placeholder="Description"
              className="w-full p-3 border rounded-xl"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Area"
              className="w-full p-3 border rounded-xl"
              value={newItem.area}
              onChange={(e) => setNewItem({ ...newItem, area: e.target.value })}
            />
            <input
              type="number"
              placeholder="Rate"
              className="w-full p-3 border rounded-xl"
              value={newItem.rate}
              onChange={(e) => setNewItem({ ...newItem, rate: e.target.value })}
            />
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold">
              Add Item
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border shadow-sm">
          <input
            placeholder="Client Name"
            className="w-full text-lg border-b mb-6"
            onChange={(e) => setClientName(e.target.value)}
          />
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            Generate PDF
          </button>
        </div>
      </div>
      <div className="opacity-0 fixed top-0 left-0 pointer-events-none">
        <PrintableInvoice
          ref={componentRef}
          data={{ customer: clientName, items }}
          docType={docType}
        />
      </div>
    </div>
  );
}
