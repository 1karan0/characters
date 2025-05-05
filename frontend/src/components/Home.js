import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Home = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [characters, setCharacters] = useState([]);
  const [universes, setUniverses] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedTab, setSelectedTab] = useState("ramayan");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCharacter = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/characters`);
      const allCharacters = response.data.data;
      setCharacters(allCharacters);

      const uniqueUniverses = [...new Set(allCharacters.map(c => c.univers))];
      setUniverses(uniqueUniverses);

      const defaultCharacters = allCharacters.filter(c => c.univers === selectedTab);
      setSelectedCharacter(defaultCharacters[0]);
    } catch (err) {
      console.error("Error fetching characters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [selectedTab]);

  if (loading) {
    return <Loader />;
  }

  const filteredCharacters = characters.filter(c => c.univers === selectedTab);

  return (
    <div className="bg-gradient-to-b min-h-screen xsm:py-4 font-[Marcellus,serif] from-[#22130d] to-[#0e0422] text-white flex flex-col items-center relative overflow-hidden">
      {/* Hero Section */}
      <h1
        style={{
          background: "linear-gradient(180deg, #FEE9BE, #F6CF7F)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-5xl xsm:text-xl md:text-3xl sm:text-xl mb-4 mt-4 text-center"
      >
        CRAFTED BY TITANS FOR YOUR LEGACY
      </h1>
      <p className="text-gray-300 xsm:text-xs md:text-base sm:text-base mb-12 text-center text-lg">
        Prove your skills in the arena forged by game industry veterans and TCG fanatics
      </p>

      {/* Universe Tabs */}
      <div className="flex gap-7 mb-8 ">
        {universes.map((uni) => (
          <button
            key={uni}
            onClick={() => setSelectedTab(uni)}
            className={`hover:text-white xsm:text-xs capitalize ${
              selectedTab === uni ? "text-white border-b-2 border-yellow-400" : "text-gray-400"
            }`}
          >
            {uni}
          </button>
        ))}
      </div>

      {/* Character Select */}
      <div className="flex xsm:flex-col sm:flex-col md:flex-col">
        <div className="flex flex-col xsm:flex-row sm:flex-row md:flex-row md:justify-center sm:justify-center xsm:justify-center items-center gap-6 mb-8">
          {filteredCharacters.map((character) => (
            <button
              key={character?._id}
              onClick={() => setSelectedCharacter(character)}
              className={`rounded-full overflow-hidden border-2 ${
                selectedCharacter?._id === character?._id
                  ? "border-orange-400"
                  : "border-gray-700"
              }`}
            >
              <img
                src={character?.image}
                alt={character?.name}
                className="w-16 h-16 xsm:w-8 xsm:h-8 sm:w-12 sm:h-12 object-cover bg-gradient-to-r from-sky-300 to-[#642fa6]"
              />
            </button>
          ))}
        </div>

        {/* Selected Character Display */}
        {selectedCharacter && (
          <div className="flex flex-col ml-36 xsm:ml-0 md:ml-0 items-center sm:ml-0 text-center">
            <div className="flex items-center xsm:flex-col sm:flex-col justify-center">
              <div>
                <h2
                  style={{
                    background: "linear-gradient(180deg, #FEE9BE, #F6CF7F)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  className="text-3xl xsm:text-xl sm:text-2xl capitalize mb-2"
                >
                  {selectedCharacter.name}
                </h2>
                <h3 className="text-orange-300 xsm:text-sm sm:text-base uppercase mb-4">
                  {selectedCharacter.title}
                </h3>
                <p className="text-gray-400 text-xl xsm:text-xs md:text-base sm:text-sm sm:p-4 xsm:p-3 max-w-lg mb-6">
                  {selectedCharacter.shortdescription}
                </p>
              </div>
              <img
                src={selectedCharacter?.image}
                alt={selectedCharacter?.name}
                className="h-[64vh] w-[30vw] xsm:w-full sm:w-[60%] object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => navigate(`/character/${selectedCharacter?._id}`)}
        className="px-6 py-2 border xsm:text-xs xsm:px-3 xsm:py-1 border-white rounded-md hover:bg-white hover:text-black transition"
      >
        READ MORE
      </button>
    </div>
  );
};

export default Home;
