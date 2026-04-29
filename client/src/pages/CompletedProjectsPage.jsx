import React, { useState } from "react";
import {
  ImagePlus,
  Users,
  FolderCheck,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";

export default function CompletedProjectsPage() {
  const [selectedClient, setSelectedClient] = useState(null);

  // Mock Data for Client History
  const [clients] = useState([
    {
      id: 1,
      name: "Rajesh Gowda",
      location: "Kochi",
      employees: ["Rahul Kumar (Lead)", "Suresh P. (Carpenter)"],
      works: [
        {
          id: "w1",
          category: "Living Room Design",
          image:
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400",
          desc: "Modern minimalist theme with teak finish.",
        },
        {
          id: "w2",
          category: "Kitchen Design",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400",
          desc: "Modular parallel kitchen with granite top.",
        },
      ],
    },
    {
      id: 2,
      name: "Anita Nair",
      location: "Trivandrum",
      employees: ["Rahul Kumar (Lead)"],
      works: [
        {
          id: "w3",
          category: "Bedroom Design",
          image:
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=400",
          desc: "Master bedroom with walk-in wardrobe.",
        },
      ],
    },
  ]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Completed Projects
          </h1>
          <p className="text-slate-500 font-medium">
            Showcase of finished works and client archives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Client History List */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">
            Project Archives
          </h3>
          <div className="bg-white border border-slate-900 rounded-[30px] overflow-hidden shadow-sm">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`w-full text-left p-6 flex justify-between items-center border-b last:border-0 transition-colors ${
                  selectedClient?.id === client.id
                    ? "bg-indigo-50"
                    : "hover:bg-slate-50"
                }`}
              >
                <div>
                  <p className="font-black text-slate-900">{client.name}</p>
                  <p className="text-xs text-slate-400">
                    {client.location} Project
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className={
                    selectedClient?.id === client.id
                      ? "text-indigo-600"
                      : "text-slate-300"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Project Work Cards */}
        <div className="lg:col-span-8">
          {selectedClient ? (
            <div className="space-y-8">
              {/* Client & Employee Info Header */}
              <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black">
                      {selectedClient.name}
                    </h2>
                    <p className="text-indigo-400 font-bold uppercase text-xs tracking-widest mt-1">
                      Project Portfolio
                    </p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition">
                    <ImagePlus size={24} />
                  </button>
                </div>

                <div className="flex items-center gap-3 border-t border-white/10 pt-6">
                  <Users size={18} className="text-slate-400" />
                  <div className="text-sm">
                    <span className="text-slate-400 font-medium">Team: </span>
                    <span className="font-bold">
                      {selectedClient.employees.join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Work Category Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedClient.works.map((work) => (
                  <div
                    key={work.id}
                    className="group border border-slate-900 rounded-[35px] overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={work.image}
                        alt={work.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {work.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-slate-900 mb-2 uppercase text-sm tracking-tight">
                        {work.category}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {work.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Upload Provision Placeholder */}
                <button className="border-2 border-dashed border-slate-300 rounded-[35px] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all gap-3 bg-white/50">
                  <ImagePlus size={32} />
                  <span className="font-black text-xs uppercase tracking-widest">
                    Upload New Category
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[500px] border-2 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center text-slate-300">
              <FolderCheck size={64} className="mb-4" />
              <p className="font-bold text-lg uppercase tracking-widest">
                Select a client to view works
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
