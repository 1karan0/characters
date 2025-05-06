import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaPlus, FaGlobe } from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [selectedTab, setSelectedTab] = useState("");
  const [loading, setLoading] = useState(true);
  const [uni, setUni] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/characters`);
      const allChars = response?.data?.data || [];

      setAllCharacters(allChars);

      // Extract unique universe names (strings)
      const uniqueUniverses = [
        ...new Set(allChars.map((char) => char.univers?.univers)),
      ].filter(Boolean); // remove undefined/null if any

      setUniverses(uniqueUniverses);

      if (!selectedTab && uniqueUniverses.length > 0) {
        setSelectedTab(uniqueUniverses[0]);
      }
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchUnivers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getunivers`);
      setUni(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCharacters();
    fetchUnivers();
  }, []);

  useEffect(() => {
    if (selectedTab) {
      const filtered = allCharacters.filter(
        (char) => char.univers?.univers === selectedTab
      );
      setCharacters(filtered);
    }
  }, [selectedTab, allCharacters]);

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {universes.map((universe) => (
          <button
            key={universe}
            className={`px-4 py-2 rounded-lg transition ${
              selectedTab === universe
                ? "bg-blue-600 font-bold"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => setSelectedTab(universe)}
          >
            {universe.charAt(0).toUpperCase() + universe.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link to="/Allcharacters" className="bg-gray-800 p-5 rounded-xl shadow-md flex items-center space-x-4">
          <FaUsers className="text-3xl text-blue-400" />
          <div>
            <p className="text-lg font-semibold">Characters ({selectedTab})</p>
            <p className="text-2xl">{characters.length}</p>
          </div>
        </Link>

        <Link to="/createunivers" className="bg-gray-800 p-5 rounded-xl shadow-md flex items-center space-x-4">
          <FaGlobe className="text-3xl text-green-400" />
          <div>
            <p className="text-lg font-semibold">Universes</p>
            <p className="text-2xl">{uni.length}</p>
          </div>
        </Link>
      </div>

      {/* Create Button */}
      <div className="mb-6">
        <Link
          to="/createcharacter"
          className="inline-flex items-center px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition"
        >
          <FaPlus className="mr-2" /> Create New Character
        </Link>
      </div>

      {/* Recent Characters Table */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Characters in {selectedTab}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Universe</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : characters.length > 0 ? (
                characters.map((char) => (
                  <tr key={char._id} className="border-b border-gray-700">
                    <td className="px-4 py-3">
                      <img
                        src={char.image}
                        alt={char.name}
                        className="h-12 w-12 object-cover rounded-full bg-gradient-to-br from-red-900 to-white border-4 border-lime-900"
                      />
                    </td>
                    <td className="px-4 py-3">{char.name}</td>
                    <td className="px-4 py-3">{char.univers?.univers}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/updatecharacter/${char._id}`}
                        className="text-blue-800 bg-white px-3 py-1 rounded-full"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No characters found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
