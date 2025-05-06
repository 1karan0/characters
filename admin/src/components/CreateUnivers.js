import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { PlusCircle, Loader2, Globe, Sparkles } from "lucide-react";

const CreateUnivers = () => {
  const [univers, setUnivers] = useState({
    univers: "",
  });
  const [getuni, setGetuni] = useState(null);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setUnivers({ ...univers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!univers.univers.trim()) {
      toast.error("Universe name cannot be empty", {
        style: {
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(60,0,0,0.95) 0%, rgba(120,0,0,0.95) 100%)",
          color: "#fff",
        },
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/createunivers`, univers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response?.data);
      toast.success("Universe created successfully", {
        style: {
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%)",
          color: "#fff",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
          backdropFilter: "blur(4px)",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#000",
        },
        duration: 3000,
      });

      setUnivers({
        univers: "",
      });

      // Refresh universe list
      fetchUnivers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Creation unsuccessful", {
        style: {
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(60,0,0,0.95) 0%, rgba(120,0,0,0.95) 100%)",
          color: "#fff",
          boxShadow:
            "0 4px 10px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1) inset",
          backdropFilter: "blur(4px)",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#800",
        },
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUnivers = async () => {
    try {
      setLoading2(true);
      const response = await axios.get(`${BASE_URL}/getunivers`);
      setGetuni(response.data.data);
    } catch (err) {
      console.error("Error fetching universes:", err);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    fetchUnivers();
  }, []);

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background:
              "linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%)",
            color: "#fff",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
            backdropFilter: "blur(4px)",
          },
        }}
      />

      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 mb-2">
            <Globe className="inline mr-2 mb-1" size={32} />
            Universe Creator
          </h1>
          <p className="text-gray-300">Explore and create new universes</p>
        </header>

        {/* Existing Universes Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Sparkles className="mr-2 text-purple-400" size={20} />
              Existing Universes
            </h2>

            {loading2 && (
              <div className="flex items-center">
                <Loader2
                  className="animate-spin text-indigo-400 mr-2"
                  size={18}
                />
                <span className="text-gray-400 text-sm">Loading...</span>
              </div>
            )}
          </div>

          {loading2 ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="animate-spin text-indigo-400" size={32} />
            </div>
          ) : !getuni || getuni.length === 0 ? (
            <div className="bg-gray-800/40 backdrop-blur-md rounded-xl p-10 text-center border border-gray-700/50">
              <Globe className="mx-auto text-gray-500 mb-3" size={48} />
              <h3 className="text-xl font-medium text-gray-300 mb-2">
                No Universes Yet
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Create your first universe to get started on your cosmic journey
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getuni.map((uni) => (
                <div
                  key={uni._id}
                  className={`bg-gradient-to-br  rounded-xl shadow-lg overflow-hidden h-20 relative group transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                >
                  <div className="absolute inset-0 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-2xl tracking-tight mb-1 group-hover:text-white">
                        {uni.univers}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create Universe Section */}
        <section className="max-w-xl mx-auto">
          <div className="bg-gray-800/50 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-gray-700/50">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <PlusCircle className="mr-2 text-indigo-400" size={20} />
              Create New Universe
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="univers"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Universe Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="univers"
                    placeholder="Enter a name for your new universe"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700/60 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition duration-200"
                    name="univers"
                    value={univers.univers}
                    onChange={handleChange}
                  />

                  <Globe
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-lg font-medium transition duration-200 shadow-lg disabled:opacity-70 flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Creating Universe...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2" size={18} />
                    Create Universe
                  </>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateUnivers;
