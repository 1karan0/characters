import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import Loader from "./Loader";

const Character = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [character, setCharacter] = useState(null);

  const fetchCharacter = async () => {
    try {
      const response = await fetch(`${BASE_URL}/characters/${id}`);
      const data = await response.json();
      setCharacter(data.data);
    } catch (err) {
      console.error("Error fetching character:", err);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <div className="bg-[#0b0016] text-white  font-[Marcellus,serif]">
        <div className=" flex items-center w-full gap-8 p-8  bg-gradient-to-r from-[#0e0422]  to-[#331307]  ">
          <span className="p-2 cursor-pointer" onClick={() => navigate(-1)}>
            <FaArrowLeftLong />
          </span>

          {/* Page Title */}
          <h1
            className="text-5xl font-bold uppercase "
            style={{
              background: "linear-gradient(180deg, #FEE9BE, #F6CF7F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {character.univers} Characters
          </h1>
        </div>
      </div>
      <div className="bg-gradient-to-t font-[Marcellus,serif] from-[#22130d] to-[#0e0422] min-h-screen text-white px-8 md:px-16 py-8 ">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center mb-20 overflow-hidden">
            <img
              src={`https://characters-backend-3twu.onrender.com/uploads/${character.image}`}
              alt={character.name}
              className="w-16  rounded-full bg-gradient-to-r from-sky-300 to-[#642fa6]  border-2 "
            />
          </div>
          <img
            src={`https://characters-backend-3twu.onrender.com/uploads/${character.image}`}
            alt={character.name}
            className="h-[60vh] object-contain mb-8"
          />
          <h2
            className="text-4xl font-semibold mb-2 capitalize"
            style={{
             
              background: "linear-gradient(180deg, #FEE9BE, #F6CF7F)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {character.name}
          </h2>
          <h3 className="text-orange-300 uppercase text-lg mb-4">
            {character.title}
          </h3>
          <p className="text-gray-300 mb-12 max-w-2xl text-xl ">
            {character.shortdescription}
          </p>

          <div
            className="max-w-4xl text-xl text-gray-400 leading-relaxed space-y-8 text-justify"
          >
            {character.fulldescription}
          </div>
        </div>
      </div>
    </>
  );
};

export default Character;
