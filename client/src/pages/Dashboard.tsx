import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
  });

  const fetchLeads = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      const res = await api.get(
        `/leads?search=${search}&status=${status}`
      );

      setLeads(res.data.leads);

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchLeads();

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSave = async () => {
    try {
      if (
        !newLead.name ||
        !newLead.email ||
        !newLead.company
      ) {
        alert("Fill all fields");
        return;
      }

      const token = localStorage.getItem("token");

      await api.post(
        "/leads",
        newLead,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewLead({
        name: "",
        email: "",
        company: "",
        status: "new",
      });

      setShowModal(false);

      fetchLeads();

    } catch (err: any) {
      console.log(err);

      alert(
        err?.response?.data?.message ||
        "Save failed"
      );
    }
  };

  const statusClass = (s: string) => {
    if (s === "qualified")
      return "bg-green-100 text-green-700";

    if (s === "lost")
      return "bg-red-100 text-red-700";

    if (s === "contacted")
      return "bg-blue-100 text-blue-700";

    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Smart Leads Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Track and manage your leads
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
          >
            + Add Lead
          </button>

          <button
            onClick={handleLogout}
            className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-xl"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-5 mb-8">

        <div className="bg-gray-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Total Leads
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {leads.length}
          </h2>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Qualified
          </p>

          <h2 className="text-4xl text-green-400 font-bold mt-2">
            {
              leads.filter(
                (l)=>l.status==="qualified"
              ).length
            }
          </h2>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6">
          <p className="text-gray-400">
            Lost
          </p>

          <h2 className="text-4xl text-red-400 font-bold mt-2">
            {
              leads.filter(
                (l)=>l.status==="lost"
              ).length
            }
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-gray-900 rounded-2xl p-5 mb-8">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            value={search}
            onChange={(e)=>
              setSearch(e.target.value)
            }
            placeholder="Search by name or email..."
            className="flex-1 p-4 rounded-xl bg-gray-800 outline-none"
          />

          <select
            value={status}
            onChange={(e)=>
              setStatus(e.target.value)
            }
            className="p-4 rounded-xl bg-gray-800"
          >
            <option value="">
              All
            </option>

            <option value="new">
              New
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="lost">
              Lost
            </option>

          </select>

          <button
            onClick={fetchLeads}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl"
          >
            {loading ? "Loading..." : "Search"}
          </button>

        </div>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {leads.map((lead)=>(

          <div
            key={lead._id}
            className="bg-gray-900 rounded-2xl p-5 hover:scale-105 duration-300"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="font-bold text-xl">
                  {lead.name}
                </h2>

                <p className="text-gray-400">
                  {lead.company}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {lead.email}
                </p>

              </div>

              <span
                className={`px-3 py-1 h-fit rounded-full text-xs ${statusClass(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>

            </div>

          </div>

        ))}

      </div>

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">

          <div className="bg-slate-900 p-8 rounded-3xl w-[450px]">

            <h2 className="text-3xl font-bold text-center mb-6">
              Add Lead
            </h2>

            <div className="space-y-4">

              <input
                placeholder="Name"
                value={newLead.name}
                onChange={(e)=>
                  setNewLead({
                    ...newLead,
                    name:e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800"
              />

              <input
                placeholder="Email"
                value={newLead.email}
                onChange={(e)=>
                  setNewLead({
                    ...newLead,
                    email:e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800"
              />

              <input
                placeholder="Company"
                value={newLead.company}
                onChange={(e)=>
                  setNewLead({
                    ...newLead,
                    company:e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800"
              />

              <select
                value={newLead.status}
                onChange={(e)=>
                  setNewLead({
                    ...newLead,
                    status:e.target.value
                  })
                }
                className="w-full p-4 rounded-xl bg-gray-800"
              >
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="contacted">Contacted</option>
                <option value="lost">Lost</option>
              </select>

              <div className="flex justify-end gap-3 pt-4">

                <button
                  onClick={()=>
                    setShowModal(false)
                  }
                  className="border px-5 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
                >
                  Save
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;