import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import {
  User,
  Briefcase,
  Calendar,
  Plus,
  Phone,
  MapPin,
  Bell,
  Search,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  X,
} from "lucide-react";

const CRMPage = () => {
  const [activeTab, setActiveTab] = useState("activities"); // Default to activities per image
  const [searchTerm, setSearchTerm] = useState("");

  // 1. FINANCIAL KPI DATA (Intelligence Hub Integration)
  const kpis = [
    {
      label: "Revenue",
      value: "₹4,25,000",
      change: "+12.5%",
      icon: <TrendingUp size={20} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Income",
      value: "₹2,85,000",
      change: "+8.2%",
      icon: <ArrowUpRight size={20} />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Expenses",
      value: "₹1,40,000",
      change: "-2.4%",
      icon: <ArrowDownRight size={20} />,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Profit",
      value: "₹1,45,000",
      change: "+14.1%",
      icon: <Wallet size={20} />,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  // 2. DATA STATES
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

  const [pipeline, setPipeline] = useState({
    LEAD: { id: "LEAD", title: "Lead Inbound", deals: [] },
    CONTACTED: {
      id: "CONTACTED",
      title: "Initial Contact",
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
      title: "Proposal Sent",
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
      title: "Negotiation Stage",
      deals: [
        {
          id: "deal-3",
          contactId: "c3",
          title: "Full Office Interior",
          value: 150000,
        },
      ],
    },
    WON: { id: "WON", title: "Closed Won", deals: [] },
  });

  const [activities] = useState([
    {
      id: 1,
      type: "Payment Reminder",
      date: "05/01",
      client: "Rajesh Gowda",
      status: "Pending",
    },
    {
      id: 2,
      type: "Client Field Visit",
      date: "05/03",
      client: "Anita Nair",
      status: "Scheduled",
    },
  ]);

  // Global Search Logic
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
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* 1. FINANCIAL KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${kpi.bg} ${kpi.color}`}>
                {kpi.icon}
              </div>
              <span
                className={`text-xs font-black px-2 py-1 rounded-lg ${kpi.bg} ${kpi.color}`}
              >
                {kpi.change}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {kpi.label}
              </p>
              <h2 className="text-2xl font-black">{kpi.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* 2. HEADER & SEARCH BAR AREA */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">
            CRM Hub
          </h1>
          <p className="text-slate-500 font-medium">
            Relationships, Pipeline, and Tasks.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="w-full md:w-80 pl-12 pr-6 py-3 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl border-2 border-slate-100 shadow-sm">
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
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-900"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="bg-white rounded-[40px] border-2 border-slate-100 shadow-sm overflow-hidden">
        {/* SECTION: ACTIVITIES (Matches Screenshot 2026-05-04 at 10.54.28 AM.jpg) */}
        {activeTab === "activities" && (
          <div className="p-10 space-y-10 animate-in fade-in duration-300">
            {/* Quick Action Top Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Payment Reminder", "Follow-up Call", "Client Field Visit"].map(
                (type) => (
                  <button
                    key={type}
                    className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-[28px] hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-50 text-orange-500 p-3 rounded-2xl group-hover:bg-orange-100 transition-colors">
                        <Bell size={20} />
                      </div>
                      <span className="font-black text-slate-700 uppercase text-xs tracking-wider">
                        {type}
                      </span>
                    </div>
                    <Plus
                      size={20}
                      className="text-slate-300 group-hover:text-indigo-600"
                    />
                  </button>
                ),
              )}
            </div>

            {/* Custom Activity Button */}
            <button className="w-full md:w-1/3 border-2 border-dashed border-slate-200 p-5 rounded-[24px] flex items-center justify-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 hover:border-slate-400 transition-all">
              <Plus size={18} /> Add Custom Activity
            </button>

            {/* Upcoming Schedule List */}
            <div className="pt-6 border-t border-slate-50">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">
                Upcoming Schedule
              </h3>
              <div className="space-y-4">
                {filteredActivities.map((act) => (
                  <div
                    key={act.id}
                    className="flex items-center justify-between p-6 bg-slate-50/50 border border-slate-100 rounded-[32px] hover:bg-white hover:shadow-xl transition-all group"
                  >
                    <div className="flex gap-6 items-center">
                      <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border-2 border-slate-50 text-center min-w-[70px]">
                        <p className="text-[10px] font-black text-indigo-600 uppercase mb-1">
                          {act.date.split("/")[0]}
                        </p>
                        <p className="text-xl font-black text-slate-900">
                          {act.date.split("/")[1]}
                        </p>
                      </div>
                      <div>
                        <p className="font-black text-slate-900 uppercase text-sm tracking-tight">
                          {act.type}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mt-1">
                          With:{" "}
                          <span className="text-indigo-500 uppercase">
                            {act.client}
                          </span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black px-4 py-1.5 rounded-full border-2 uppercase tracking-widest ${
                        act.status === "Pending"
                          ? "bg-orange-50 text-orange-600 border-orange-100"
                          : "bg-blue-50 text-blue-600 border-blue-100"
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: DEALS (KANBAN) */}
        {activeTab === "deals" && (
          <div className="p-8 animate-in fade-in duration-300">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {Object.values(pipeline).map((column) => (
                  <div key={column.id} className="min-w-[280px] flex-1">
                    <div className="flex items-center justify-between mb-6 px-2">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        {column.title}
                      </h3>
                      <span className="bg-slate-100 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-md">
                        {column.deals.length}
                      </span>
                    </div>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="space-y-4 min-h-[500px] bg-slate-50/50 p-4 rounded-[32px] border border-transparent hover:border-slate-200 transition-colors"
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
                                      className="bg-white p-5 rounded-[24px] shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all group"
                                    >
                                      <h4 className="font-black text-slate-900 text-sm mb-1 uppercase tracking-tight group-hover:text-indigo-600">
                                        {deal.title}
                                      </h4>
                                      <p className="text-[10px] font-bold text-slate-400 mb-4">
                                        {contact?.name}
                                      </p>
                                      <div className="text-lg font-black text-slate-900 italic">
                                        ₹{deal.value.toLocaleString()}
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

        {/* SECTION: CONTACTS */}
        {activeTab === "contacts" && (
          <div className="overflow-x-auto animate-in fade-in duration-300">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 bg-slate-50/50">
                  <th className="p-8">Client Identity</th>
                  <th className="p-8">Active Project</th>
                  <th className="p-8">Contact Info</th>
                  <th className="p-8 text-right">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredContacts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="p-8">
                      <div className="font-black text-slate-900 text-base uppercase">
                        {c.name}
                      </div>
                      <div className="text-[10px] font-bold text-indigo-500 uppercase">
                        Registered Client
                      </div>
                    </td>
                    <td className="p-8 font-bold text-slate-600 italic">
                      {c.project}
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                        <Phone size={14} className="text-slate-300" /> {c.phone}
                      </div>
                    </td>
                    <td className="p-8 text-right font-bold text-slate-400 text-xs uppercase tracking-tighter">
                      <MapPin size={14} className="inline mr-1" /> {c.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMPage;
