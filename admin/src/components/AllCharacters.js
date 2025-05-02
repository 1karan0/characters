import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const AllCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("ramayan");
  const [characterToDelete, setCharacterToDelete] = useState(null);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [expandedChars, setExpandedChars] = useState({});
  const navigate = useNavigate();


  const toggleExpanded = (id) => {
    setExpandedChars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/characters/univres/${selectedTab}`
      );
      setCharacters(response?.data?.data);
      
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [selectedTab]);

  const DeleteCharacter = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/characters/${id}`);
      toast.success("Deleted Successfully");
      setCharacterToDelete(null);
      fetchCharacters(); // Refresh data
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="min-h-screen  text-white p-6 relative">
      <Toaster 
              position="top-right"
              toastOptions={{
                // Default options for all toasts
                className: '',
                duration: 3000,
                style: {
                  background: 'linear-gradient(135deg, rgba(33,33,33,0.95) 0%, rgba(66,66,66,0.95) 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
                  backdropFilter: 'blur(4px)',
                },
              }}
            />
      <h1 className="text-3xl font-bold text-center mb-6">All Characters</h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["ramayan", "mahabharat"].map((universe) => (
          <button
            key={universe}
            onClick={() => setSelectedTab(universe)}
            className={`px-4 py-2 rounded-full font-semibold border transition ${
              selectedTab === universe
                ? "bg-white text-black border-white"
                : "bg-gray-700 text-white border-gray-500"
            }`}
          >
            {universe.charAt(0).toUpperCase() + universe.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader or Characters */}
      {loading ? (
        <div className="text-center text-lg">Loading characters...</div>
      ) : characters.length === 0 ? (
        <div className="text-center text-lg">No characters found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char) => (
            <div
              key={char._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700 hover:shadow-lg transition duration-300"
            >
              <img
                src={char.image}
                alt={char.name}
                className="h-[50vh] w-full object-contain p-3"
              />
              <div className="p-4 bg-gray-800 h-full">
                <h2 className="text-2xl font-bold mb-2">{char.name}</h2>
                <p className="text-orange-300 text-xl mb-1">{char.title}</p>
                <p className="text-base text-gray-300 mb-2">
                  {expandedChars[char._id]
                    ? char.shortdescription
                    : char.shortdescription.slice(0, 100)}
                  {char.shortdescription.length > 100 && (
                    <button
                      onClick={() => toggleExpanded(char._id)}
                      className=" text-orange-300 font-bold ml-2 hover:underline"
                    >
                      {expandedChars[char._id] ? "See less" : "See more"}
                    </button>
                  )}
                </p>

                <div className="flex justify-between">
                  <button
                    onClick={() => navigate(`/updateCharacter/${char._id}`)}
                    className="bg-blue-800 py-1 px-3 rounded-full mt-3 hover:bg-blue-900 transition"
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => setCharacterToDelete(char)}
                    className="bg-red-500 py-1 px-3 rounded-full mt-3 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {characterToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-md shadow-xl text-white border border-gray-600">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 flex flex-col items-center gap-3">
              Are you sure you want to delete{" "}
              <div className="rounded-full overflow-hidden border-2 w-20 h-20">
                <img
                  src={characterToDelete?.image}
                  alt=""
                  className="w-[10vw] "
                />
              </div>
              <strong>{characterToDelete?.name}</strong>
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => DeleteCharacter(characterToDelete?._id)}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setCharacterToDelete(null)}
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCharacters;
