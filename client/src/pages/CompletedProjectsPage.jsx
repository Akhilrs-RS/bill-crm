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
  Award, // Added for Certificate context
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
      employees: [
        "Rahul Kumar (Lead)",
        "Suresh P. (Carpenter)",
        "Anita M. (Designer)",
      ],
      works: [
        {
          id: "w1",
          category: "Living Room Design",
          image:
            "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400",
          desc: "Modern minimalist theme with premium teak finish and ambient cove lighting.",
        },
        {
          id: "w2",
          category: "Modular Kitchen",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=400",
          desc: "Parallel layout with high-gloss acrylic finish and Hafele hardware fittings.",
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

    // Header & Branding
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 40, "F");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("PROJECT COMPLETION CERTIFICATE", 105, 25, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("MONA INTERIOR STUDIO", 14, 55);

    // Project Details
    doc.setFontSize(11);
    doc.text(
      `Certificate No: CERT-${client.id}-${Date.now().toString().slice(-4)}`,
      14,
      65,
    );
    doc.text(`Date of Issue: ${new Date().toLocaleDateString()}`, 14, 72);

    doc.line(14, 78, 196, 78);

    doc.setFont(undefined, "bold");
    doc.text("CLIENT DETAILS", 14, 90);
    doc.setFont(undefined, "normal");
    doc.text(`Client Name: ${client.name}`, 14, 98);
    doc.text(`Site Location: ${client.location}`, 14, 105);

    doc.setFont(undefined, "bold");
    doc.text("PROJECT TEAM ATTRIBUTION", 14, 120);
    doc.setFont(undefined, "normal");
    doc.text(
      `The following team members were assigned to this project:`,
      14,
      128,
    );
    doc.text(client.employees.join(", "), 14, 135, { maxWidth: 180 });

    // Works Summary Table
    const tableRows = client.works.map((work) => [work.category, work.desc]);
    doc.autoTable({
      startY: 145,
      head: [["Category", "Scope of Work / Description"]],
      body: tableRows,
      headStyles: { fillColor: [15, 23, 42] },
      styles: { fontSize: 10, cellPadding: 5 },
    });

    // Footer
    const finalY = doc.lastAutoTable.finalY + 30;
    doc.line(14, finalY, 70, finalY);
    doc.text("Project Manager Signature", 14, finalY + 7);

    doc.save(`${client.name}_Completion_Certificate.pdf`);
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
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">
            <Award size={16} /> Quality Assured Portfolio
          </div>
          <h1 className="text-4xl font-black tracking-tight uppercase">
            Completed Projects
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Verified Archives & Project Showcase
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-800 transition active:scale-95 shadow-xl shadow-slate-200"
        >
          <Plus size={20} /> Register Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Client Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-2">
            Client Archives
          </h3>
          <div className="bg-white border-2 border-slate-900 rounded-[30px] overflow-hidden shadow-sm">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={`w-full text-left p-6 flex justify-between items-center border-b-2 border-slate-50 last:border-0 transition-all ${
                  selectedClient?.id === client.id
                    ? "bg-indigo-50 pl-8"
                    : "hover:bg-slate-50"
                }`}
              >
                <div>
                  <p className="font-black text-slate-900 uppercase text-sm">
                    {client.name}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
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

        {/* Right Side: Project Portfolio */}
        <div className="lg:col-span-8">
          {selectedClient ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Client Profile Header */}
              <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <FolderCheck size={120} />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter">
                        {selectedClient.name}
                      </h2>
                      <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
                        Completion Record: {selectedClient.location}
                      </p>
                    </div>
                    <button
                      onClick={() => exportProjectPDF(selectedClient)}
                      className="bg-white text-slate-900 px-5 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-indigo-400 hover:text-white transition shadow-lg"
                    >
                      <FileDown size={16} /> Export Certificate
                    </button>
                  </div>

                  {/* Team Attribution Chips */}
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Users size={14} /> Assigned Project Team
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.employees.map((emp, i) => (
                        <span
                          key={i}
                          className="bg-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-bold border border-white/10 hover:bg-indigo-600 transition-colors cursor-default"
                        >
                          {emp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Categorized Work Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedClient.works.map((work) => (
                  <div
                    key={work.id}
                    className="group border-2 border-slate-900 rounded-[35px] overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={work.image}
                        alt={work.category}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                        {work.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest border-b-2 border-slate-50 pb-2 flex justify-between items-center">
                        {work.category}
                        <ChevronRight size={14} className="text-slate-300" />
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        {work.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Add New Category Button (Visual Only) */}
                <button className="border-2 border-dashed border-slate-300 rounded-[35px] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-all gap-3 bg-white/50 group">
                  <div className="bg-slate-100 p-4 rounded-full group-hover:bg-indigo-50 transition-colors">
                    <ImagePlus size={32} />
                  </div>
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    Add Category Area
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="h-[600px] border-4 border-dashed border-slate-200 rounded-[50px] flex flex-col items-center justify-center text-slate-300 bg-white/30">
              <div className="bg-white p-8 rounded-full shadow-inner mb-6">
                <FolderCheck size={64} className="opacity-20 text-slate-900" />
              </div>
              <p className="font-black text-xl uppercase tracking-[0.3em] text-slate-400">
                Select Client Archive
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Register Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-6 z-50">
          <form
            onSubmit={handleSaveProject}
            className="bg-white p-10 rounded-[40px] w-full max-w-2xl shadow-2xl relative border-2 border-slate-900 max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 hover:rotate-90 transition-all duration-300"
            >
              <X size={28} />
            </button>
            <h2 className="text-3xl font-black mb-2 text-slate-900 uppercase tracking-tighter">
              Register Completed Project
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase mb-8 tracking-widest">
              Permanent archive entry for studio portfolio
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">
                  Client Name
                </label>
                <input
                  required
                  className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">
                  Site Location
                </label>
                <input
                  required
                  className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2 mb-1 block tracking-widest">
                Project Team (Comma separated)
              </label>
              <input
                required
                placeholder="Rahul Kumar (Lead), Suresh P. (Carpenter)..."
                className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold"
                value={formData.employees}
                onChange={(e) =>
                  setFormData({ ...formData, employees: e.target.value })
                }
              />
            </div>

            <div className="border-t-2 border-slate-50 pt-6 mb-6">
              <h3 className="text-xs font-black text-indigo-600 uppercase mb-4 tracking-widest">
                Primary Work Detail
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <input
                  required
                  placeholder="Category (e.g. Master Bedroom)"
                  className="p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold text-sm"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <input
                  placeholder="Cover Image URL"
                  className="p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold text-sm"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <textarea
                required
                rows="3"
                placeholder="Describe the aesthetic theme, materials used, and specific challenges overcome..."
                className="w-full p-4 border-2 border-slate-100 rounded-2xl bg-slate-50 outline-none focus:border-indigo-500 font-bold text-sm"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-5 rounded-[25px] font-black uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition duration-300"
            >
              Archive & Finalize Project
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
