import React, { useState } from "react";
import {
  ImagePlus,
  Users,
  FolderCheck,
  ChevronRight,
  Plus,
  X,
  Upload,
  FileDown,
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function CompletedProjectsPage() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    employees: "",
    category: "",
    desc: "",
    image: "",
  });

  const exportProjectPDF = (client) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42);
    doc.text("MONA INTERIOR STUDIO", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Project Completion Certificate & Portfolio", 14, 28);
    doc.line(14, 32, 196, 32);
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`CLIENT: ${client.name.toUpperCase()}`, 14, 45);
    doc.text(`LOCATION: ${client.location}`, 14, 52);
    doc.text(`TEAM: ${client.employees.join(", ")}`, 14, 59);

    const tableRows = client.works.map((work) => [work.category, work.desc]);
    doc.autoTable({
      startY: 70,
      head: [["Category", "Description"]],
      body: tableRows,
      headStyles: { fillColor: [15, 23, 42] },
    });
    doc.save(`${client.name}_Portfolio.pdf`);
  };

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
    <div className="p-8 bg-slate-50 min-h-screen font-sans text-slate-900">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Completed Projects
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Verified Archives & Portfolio
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition active:scale-95"
        >
          <Plus size={20} /> Register Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">
            Historical Records
          </h3>
          <div className="bg-white border-2 border-slate-900 rounded-[30px] overflow-hidden">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`w-full text-left p-6 flex justify-between items-center border-b last:border-0 ${selectedClient?.id === client.id ? "bg-indigo-50" : ""}`}
              >
                <div>
                  <p className="font-black text-slate-900 uppercase text-sm">
                    {client.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {client.location}
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

        <div className="lg:col-span-8">
          {selectedClient ? (
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl relative">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-black uppercase">
                      {selectedClient.name}
                    </h2>
                    <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest">
                      Location: {selectedClient.location}
                    </p>
                  </div>
                  <button
                    onClick={() => exportProjectPDF(selectedClient)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2"
                  >
                    <FileDown size={16} /> Export PDF
                  </button>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                    Project Team
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedClient.employees.map((emp, i) => (
                      <span
                        key={i}
                        className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase"
                      >
                        {emp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedClient.works.map((work) => (
                  <div
                    key={work.id}
                    className="group border-2 border-slate-900 rounded-[35px] overflow-hidden bg-white shadow-md"
                  >
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={work.image}
                        alt={work.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                        {work.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest border-b border-slate-100 pb-2">
                        {work.category}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {work.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[600px] border-4 border-dashed border-slate-200 rounded-[50px] flex flex-col items-center justify-center text-slate-300">
              <FolderCheck size={80} className="mb-4 opacity-20" />
              <p className="font-black text-xl uppercase tracking-[0.3em]">
                Select Archives
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSaveProject}
            className="bg-white p-10 rounded-[40px] w-full max-w-2xl shadow-2xl relative border-2 border-slate-900 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-black mb-8 text-slate-900 uppercase tracking-tighter">
              Register Project
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <input
                required
                placeholder="Client Name"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                required
                placeholder="Location"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <input
              required
              placeholder="Team (Comma separated)"
              className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold mb-6"
              value={formData.employees}
              onChange={(e) =>
                setFormData({ ...formData, employees: e.target.value })
              }
            />
            <div className="border-t-2 border-slate-50 pt-6 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <input
                  required
                  placeholder="Initial Category"
                  className="p-4 border-2 border-slate-100 rounded-2xl font-bold"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <input
                  placeholder="Image URL"
                  className="p-4 border-2 border-slate-100 rounded-2xl font-bold"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <textarea
                required
                rows="3"
                placeholder="Description"
                className="w-full p-4 border-2 border-slate-100 rounded-2xl font-bold"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black uppercase tracking-widest hover:bg-indigo-600 transition duration-300"
            >
              Finalize & Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
