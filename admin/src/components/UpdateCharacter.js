import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaUser,
  FaFeatherAlt,
  FaAlignLeft,
  FaScroll,
  FaGlobe,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";

const UpdateCharacter = () => {
  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [universes, setUniverses] = useState([]);

  const [character, setCharacter] = useState({
    name: "",
    title: "",
    shortdescription: "",
    fulldescription: "",
    univers: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const fetchCharacter = async () => {
    try {
      const response = await axios(`${BASE_URL}/characters/${id}`);
      setCharacter({
        ...response.data.data,
        univers: response.data.data.univers._id,
      });
    } catch (err) {
      console.error("Error fetching character:", err);
      toast.error(
        err.response?.data?.message || "Failed to load character data"
      );
    }
  };
  const fetchUnivers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getunivers`);
      setUniverses(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", character.name);
      formData.append("title", character.title);
      formData.append("shortdescription", character.shortdescription);
      formData.append("fulldescription", character.fulldescription);
      formData.append("univers", character.univers);

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const response = await axios.put(
        `${BASE_URL}/updatecharacter/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("character updated successfully", {
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
      setLoading(false);
      navigate("/Allcharacters");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to update character", {
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
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchCharacter();
    fetchUnivers();
  }, [id]);

  return (
    <div className="text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
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

      <div className="relative flex flex-col z-10 backdrop-blur-sm bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl shadow-2xl w-full max-w-3xl mx-auto border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Update Character
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaUser />
            <input
              type="text"
              name="name"
              value={character?.name}
              onChange={handleChange}
              placeholder="Character name"
              required
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaFeatherAlt />
            <input
              type="text"
              name="title"
              value={character?.title}
              onChange={handleChange}
              placeholder="Character title"
              required
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaAlignLeft />

            <textarea
              name="shortdescription"
              value={character?.shortdescription}
              onChange={handleChange}
              placeholder="Short description"
              required
              rows={3}
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            ></textarea>
          </div>

          <div className="flex items-start gap-3 bg-gray-800 p-3 rounded">
            <FaScroll className="mt-3" />
            <textarea
              name="fulldescription"
              value={character?.fulldescription}
              onChange={handleChange}
              placeholder="Full description"
              required
              rows={4}
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            ></textarea>
          </div>

          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaGlobe />
            <select
              name="univers"
              value={character.univers}
              onChange={handleChange}
              required
              className="w-full p-3 text-white bg-gray-800 cursor-pointer outline-none"
            >
              <option value="" disabled>
                Choose Universe
              </option>
              {universes.map((uni) => (
                <option key={uni._id} value={uni._id}>
                  {uni.univers}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaImage />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 text-white bg-gray-800 cursor-pointer outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 rounded bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white font-semibold hover:from-gray-600 hover:to-gray-900 transition-all duration-300"
          >
            <FaCheckCircle />
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCharacter;
