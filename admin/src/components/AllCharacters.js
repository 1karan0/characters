import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AllCharacters = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("");
  const [universes, setUniverses] = useState([]);
  const [characterToDelete, setCharacterToDelete] = useState(null);
  const [expandedChars, setExpandedChars] = useState({});
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      const response = await axios.get(`${BASE_URL}/characters`);
      const allChars = response?.data?.data;

      setAllCharacters(allChars);

      // Extract unique universe names
      const uniqueUniverses = [
        ...new Set(
          allChars
            .map((char) => char.univers?.univers)
            .filter((u) => u && typeof u === "string")
        )
      ];
      setUniverses(uniqueUniverses);

      // Set default tab
      if (uniqueUniverses.length > 0) {
        setSelectedTab(uniqueUniverses[0]);
      }
    } catch (err) {
      console.error("Error fetching characters:", err);
      toast.error("Failed to fetch characters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    if (selectedTab) {
      const filtered = allCharacters.filter(
        (char) => char.univers?.univers === selectedTab
      );
      setCharacters(filtered);
    }
  }, [selectedTab, allCharacters]);

  const DeleteCharacter = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/characters/${id}`);
      toast.success("Deleted Successfully");
      setCharacterToDelete(null);
      fetchCharacters(); // Re-fetch after delete
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Deletion failed");
    }
  };

  return (
    <div className="min-h-screen text-white p-6 relative">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "linear-gradient(135deg, rgba(33,33,33,0.95), rgba(66,66,66,0.95))",
            color: "#fff",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
            backdropFilter: "blur(4px)",
          },
        }}
      />
      <h1 className="text-3xl font-bold text-center mb-6">All Characters</h1>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {universes.map((universe) => (
          <button
            key={universe}
            onClick={() => setSelectedTab(universe)}
            className={`px-4 py-2 rounded-full font-semibold border transition ${
              selectedTab === universe
                ? "bg-white text-black border-white"
                : "bg-gray-700 text-white border-gray-500"
            }`}
          >
            {universe?.charAt(0).toUpperCase() + universe?.slice(1)}
          </button>
        ))}
      </div>

      {/* Loader or Characters */}
      {loading ? (
        <div className="min-h-screen flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-purple-800 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-xl font-medium text-white">Loading character...</p>
          </div>
        </div>
      ) : characters.length === 0 ? (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center">
            <div className="inline-block p-4 rounded-full bg-gray-700 mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14v-4m-4 4h8"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Character Not Found</h2>
            <p className="text-gray-300">The character you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((char) => (
            <div
              key={char._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700 hover:shadow-lg transition duration-300"
            >
              <img
                onClick={() => navigate(`/character/${char._id}`)}
                src={char.image}
                alt={char.name}
                className="h-[50vh] w-full object-contain p-3 cursor-pointer"
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
                      className="text-orange-300 font-bold ml-2 hover:underline"
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
                  </button>
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

      {/* Delete Modal */}
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
                  className="w-[10vw]"
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
