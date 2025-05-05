import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterById = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/characters/${id}`);
      setCharacter(response?.data?.data);
    } catch (err) {
      console.error("Error fetching character:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-purple-800 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-white">Loading character...</p>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900">
        <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center">
          <div className="inline-block p-4 rounded-full bg-gray-700 mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14v-4m-4 4h8"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Character Not Found</h2>
          <p className="text-gray-300">The character you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div 
        className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl" 
  
      >
        {/* Hero section */}
        <div className="relative h-64 bg-gray-800 bg-opacity-40">
     
          <div className="absolute -bottom-20 left-8">
            <img
              src={character.image}
              alt={character.name}
              className="w-40 h-40 object-cover bg-slate-600 rounded-2xl border-4 border-purple-800 shadow-xl"
            />
          </div>
        </div>

        {/* Content section */}
        <div className="pt-24 pb-12 px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-900 bg-opacity-70 text-blue-200 mb-3">
                {character.univers}
              </span>
              <h1 className="text-4xl font-extrabold text-white mb-1 capitalize">{character.name}</h1>
              <p className="text-xl text-gray-300 font-medium">{character.title}</p>
            </div>
            <div className="mt-4 md:mt-0 bg-gray-800 bg-opacity-50 px-4 py-2 rounded-lg text-sm text-gray-400">
              <div>Created: {new Date(character.createdAt).toLocaleDateString()}</div>
              <div>Updated: {new Date(character.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Character description sections */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-black bg-opacity-30 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Overview
              </h2>
              <p className="text-white leading-relaxed">{character.shortdescription}</p>
            </div>
            <div className="lg:col-span-2 bg-black bg-opacity-30 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Full Description
              </h2>
              <div className="text-gray-100 leading-relaxed space-y-4">
                {character.fulldescription.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterById;