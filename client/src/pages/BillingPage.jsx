import React, { useState } from "react";

export default function BillingPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ description: "", price: "" });
  const [clientName, setClientName] = useState("");

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.description || !newItem.price) return;
    setItems([...items, { ...newItem, id: Date.now() }]);
    setNewItem({ description: "", price: "" });
  };

  const total = items.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0,
  );

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        Generate Quotation
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold mb-4">Add Item</h2>
          <form onSubmit={addItem} className="space-y-4">
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
              placeholder="Price"
              className="w-full p-3 border rounded-xl"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition">
              Add Item
            </button>
          </form>
        </div>
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Quote for: {clientName || "..."}
          </h2>
          <input
            placeholder="Enter Client Name"
            className="w-full p-2 border-b mb-6 outline-none"
            onChange={(e) => setClientName(e.target.value)}
          />
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.description}</span>
                <span className="font-semibold">₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-6 border-t">
            <span className="text-2xl font-bold">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
