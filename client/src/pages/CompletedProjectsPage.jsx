import React, { useState } from "react";
import {
  ImagePlus,
  Users,
  FolderCheck,
  ChevronRight,
  Plus,
  X,
  Upload,
} from "lucide-react";

export default function CompletedProjectsPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. DYNAMIC STATE FOR CLIENTS
  const [clients, setClients] = useState([
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
      ],
    },
  ]);

  // 2. FORM STATE FOR NEW PROJECT
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    employees: "",
    category: "",
    desc: "",
    image: "",
  });

  // 3. HANDLER TO SAVE NEW PROJECT
  const handleSaveProject = (e) => {
    e.preventDefault();
    const newProject = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      employees: formData.employees.split(",").map((item) => item.trim()),
      works: [
        {
          id: `w-${Date.now()}`,
          category: formData.category,
          image:
            formData.image ||
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400",
          desc: formData.desc,
        },
      ],
    };

    setClients([newProject, ...clients]);
    setIsModalOpen(false);
    setFormData({
      name: "",
      location: "",
      employees: "",
      category: "",
      desc: "",
      image: "",
    });
  };

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
        {/* ADD NEW PROJECT TRIGGER */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 shadow-lg flex items-center gap-2 transition active:scale-95"
        >
          <Plus size={20} /> Add New Project
        </button>
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
                    <Upload size={24} />
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
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border-2 border-dashed border-slate-300 rounded-[35px] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all gap-3 bg-white/50"
                >
                  <ImagePlus size={32} />
                  <span className="font-black text-xs uppercase tracking-widest">
                    Add Category to Project
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

      {/* 4. MODAL FOR NEW PROJECT & CLIENT DETAILS */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSaveProject}
            className="bg-white p-10 rounded-[40px] w-full max-w-2xl shadow-2xl relative border border-slate-900 overflow-y-auto max-h-[90vh]"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tighter">
              Register Completed Project
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                  Client Name
                </label>
                <input
                  required
                  className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                  Location
                </label>
                <input
                  required
                  className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block">
                Team Members (Comma separated)
              </label>
              <input
                required
                placeholder="Rahul Kumar (Lead), Suresh P., ..."
                className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                value={formData.employees}
                onChange={(e) =>
                  setFormData({ ...formData, employees: e.target.value })
                }
              />
            </div>

            <div className="border-t border-slate-100 pt-6 mb-6">
              <h3 className="text-sm font-black text-indigo-600 uppercase mb-4 tracking-widest">
                Initial Work Category
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <input
                  required
                  placeholder="Category (e.g. Master Bedroom)"
                  className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <input
                  placeholder="Image URL (Optional)"
                  className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <textarea
                required
                rows="3"
                placeholder="Work Description..."
                className="w-full p-4 border rounded-2xl bg-slate-50 outline-none border-slate-200 focus:border-indigo-500 font-bold"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black uppercase tracking-widest shadow-xl hover:bg-slate-800 transition"
            >
              Finalize & Save Project
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
