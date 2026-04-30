import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  User,
  Briefcase,
  Calendar,
  Plus,
  MoreVertical,
  Phone,
  MapPin,
  Bell,
  CheckCircle,
  Search, // Added Search icon
} from "lucide-react";

const CRMPage = () => {
  const [activeTab, setActiveTab] = useState("deals");
  const [searchTerm, setSearchTerm] = useState(""); // State for search

  // 1. CONTACTS STATE
  const [contacts] = useState([
    {
      id: "c1",
      name: "Rajesh Gowda",
      project: "Villa Interior",
      phone: "9876543210",
      address: "Kochi, Kerala",
    },
    {
      id: "c2",
      name: "Anita Nair",
      project: "Kitchen Remodel",
      phone: "9845012345",
      address: "Trivandrum, Kerala",
    },
    {
      id: "c3",
      name: "Tech Corp",
      project: "Enterprise Software",
      phone: "9900112233",
      address: "Bangalore, KA",
    },
  ]);

  // 2. KANBAN PIPELINE
  const [pipeline, setPipeline] = useState({
    LEAD: { id: "LEAD", title: "LEAD", deals: [] },
    CONTACTED: {
      id: "CONTACTED",
      title: "CONTACTED",
      deals: [
        {
          id: "deal-1",
          contactId: "c1",
          title: "Villa Design Quote",
          value: 45000,
        },
      ],
    },
    PROPOSAL: {
      id: "PROPOSAL",
      title: "PROPOSAL",
      deals: [
        {
          id: "deal-2",
          contactId: "c2",
          title: "Modular Kitchen Setup",
          value: 85000,
        },
      ],
    },
    NEGOTIATION: {
      id: "NEGOTIATION",
      title: "NEGOTIATION",
      deals: [
        {
          id: "deal-3",
          contactId: "c3",
          title: "Full Office Interior",
          value: 150000,
        },
      ],
    },
    WON: { id: "WON", title: "WON", deals: [] },
    LOST: { id: "LOST", title: "LOST", deals: [] },
  });

  // 3. ACTIVITIES STATE
  const [activities] = useState([
    {
      id: 1,
      type: "Payment Reminder",
      date: "2024-05-01",
      client: "Rajesh Gowda",
      status: "Pending",
    },
    {
      id: 2,
      type: "Client Field Visit",
      date: "2024-05-03",
      client: "Anita Nair",
      status: "Scheduled",
    },
  ]);

  // Filter Logic
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.project.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredActivities = activities.filter(
    (a) =>
      a.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const sourceCol = pipeline[source.droppableId];
    const destCol = pipeline[destination.droppableId];
    const sourceDeals = [...sourceCol.deals];
    const destDeals = [...destCol.deals];
    const [movedDeal] = sourceDeals.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceDeals.splice(destination.index, 0, movedDeal);
      setPipeline({
        ...pipeline,
        [source.droppableId]: { ...sourceCol, deals: sourceDeals },
      });
    } else {
      destDeals.splice(destination.index, 0, movedDeal);
      setPipeline({
        ...pipeline,
        [source.droppableId]: { ...sourceCol, deals: sourceDeals },
        [destination.droppableId]: { ...destCol, deals: destDeals },
      });
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header & Search Bar Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">CRM Hub</h1>
          <p className="text-slate-500">Relationships, Pipeline, and Tasks.</p>
        </div>

        {/* --- NEW SEARCH BAR --- */}
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 bg-white p-1.5 rounded-2xl border shadow-sm">
          {[
            { id: "contacts", label: "Contacts", icon: <User size={18} /> },
            { id: "deals", label: "Deals", icon: <Briefcase size={18} /> },
            {
              id: "activities",
              label: "Activities",
              icon: <Calendar size={18} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSearchTerm("");
              }} // Clear search on tab change
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        {/* SECTION 1: CONTACTS */}
        {activeTab === "contacts" && (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b">
              <tr className="text-slate-500 text-sm uppercase">
                <th className="p-5 font-bold">Name</th>
                <th className="p-5 font-bold">Project</th>
                <th className="p-5 font-bold">Phone</th>
                <th className="p-5 font-bold">Address</th>
                <th className="p-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-slate-50 transition"
                >
                  <td className="p-5 font-bold text-slate-900">{c.name}</td>
                  <td className="p-5 text-slate-600">{c.project}</td>
                  <td className="p-5 text-indigo-600 flex items-center gap-2 font-medium">
                    <Phone size={14} /> {c.phone}
                  </td>
                  <td className="p-5 text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} /> {c.address}
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 font-bold px-2">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* SECTION 2: DEALS */}
        {activeTab === "deals" && (
          <div className="p-6 overflow-x-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-800">
                Deals Pipeline
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2">
                <Plus size={16} /> Add Deal
              </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-4 min-w-[1200px]">
                {Object.values(pipeline).map((column) => (
                  <div
                    key={column.id}
                    className="flex-1 bg-slate-50/50 rounded-2xl p-3"
                  >
                    <h3 className="text-[10px] font-black text-slate-400 mb-4 tracking-widest uppercase text-center">
                      {column.title}
                    </h3>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="min-h-[400px]"
                        >
                          {column.deals
                            .filter((d) =>
                              d.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase()),
                            )
                            .map((deal, index) => {
                              const contact = contacts.find(
                                (c) => c.id === deal.contactId,
                              );
                              return (
                                <Draggable
                                  key={deal.id}
                                  draggableId={deal.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-3 hover:border-blue-400 transition-all"
                                    >
                                      <h4 className="font-bold text-slate-900 text-sm mb-1">
                                        {deal.title}
                                      </h4>
                                      <p className="text-[11px] text-slate-400 mb-3">
                                        {contact?.name}
                                      </p>
                                      <div className="text-lg font-black text-blue-600 mb-2">
                                        ₹{deal.value.toLocaleString()}
                                      </div>
                                      <div className="pt-2 border-t flex justify-between items-center text-[10px] text-slate-400">
                                        <span className="flex items-center gap-1">
                                          <Phone size={10} /> {contact?.phone}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        )}

        {/* SECTION 3: ACTIVITIES */}
        {activeTab === "activities" && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {["Payment Reminder", "Follow-up Call", "Client Field Visit"].map(
                (type) => (
                  <button
                    key={type}
                    className="flex items-center justify-between p-4 border rounded-2xl hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 text-amber-600 p-2 rounded-lg">
                        <Bell size={18} />
                      </div>
                      <span className="font-bold text-slate-700">{type}</span>
                    </div>
                    <Plus size={16} className="text-slate-400" />
                  </button>
                ),
              )}
              <button className="flex items-center justify-center p-4 border-2 border-dashed rounded-2xl hover:border-indigo-400 hover:bg-indigo-50 transition group">
                <span className="font-bold text-slate-400 group-hover:text-indigo-600">
                  + Add Custom Activity
                </span>
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">
                Upcoming Schedule
              </h3>
              <div className="space-y-3">
                {filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="bg-white px-3 py-1 rounded-lg shadow-sm border text-center">
                        <p className="text-xs font-bold text-indigo-600 uppercase">
                          {act.date.split("-")[1]}
                        </p>
                        <p className="text-lg font-black">
                          {act.date.split("-")[2]}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{act.type}</p>
                        <p className="text-sm text-slate-500">
                          With: {act.client}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-white border rounded-full text-slate-500">
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMPage;
