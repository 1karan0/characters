import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  FaUser,
  FaFeatherAlt,
  FaAlignLeft,
  FaScroll,
  FaGlobe,
  FaImage,
  FaCheckCircle,
} from "react-icons/fa";

const CreateCharacter = () => {
  const [character, setCharacter] = useState({
    name: "",
    title: "",
    shortdescription: "",
    fulldescription: "",
    univers: "",
    file: null,
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    if (e.target.name === "file") {
      setCharacter({ ...character, file: e.target.files[0] });
    } else {
      setCharacter({ ...character, [e.target.name]: e.target.value });
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", character.name);
    formData.append("title", character.title);
    formData.append("shortdescription", character.shortdescription);
    formData.append("fulldescription", character.fulldescription);
    formData.append("univers", character.univers);
    formData.append("file", character.file);

    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/createchar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response?.data);
      toast.success("Character created successfully", {
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
      // Reset form
      setCharacter({
        name: "",
        title: "",
        shortdescription: "",
        fulldescription: "",
        univers: "",
        file: null,
      });
    } catch (err) {
      setLoading(false);
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
    }
  };

  return (
    <div className="text-white">
      <Toaster
        position="top-right"
        toastOptions={{
          // Default options for all toasts
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
          Create Character
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
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

          {/* Title */}
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

          {/* Short Description */}
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaAlignLeft />
            <input
              type="text"
              name="shortdescription"
              value={character?.shortdescription}
              onChange={handleChange}
              placeholder="Short description"
              required
              className="w-full p-3 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          {/* Full Description */}
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

          {/* Universe Select */}
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaGlobe />
            <select
              name="univers"
              value={character?.univers}
              onChange={handleChange}
              required
              className="w-full p-3 text-white bg-gray-800 cursor-pointer outline-none"
            >
              <option value="" disabled>
                Choose Universe
              </option>
              <option value="ramayan">Ramayan</option>
              <option value="mahabharat">Mahabharat</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded">
            <FaImage />
            <input
              type="file"
              name="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleChange}
              required
              className="w-full p-2 text-white bg-gray-800 cursor-pointer outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 flex items-center justify-center gap-2 rounded bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-white font-semibold hover:from-gray-600 hover:to-gray-900 transition-all duration-300"
          >
            <FaCheckCircle />
            {loading ? "submiting..." : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacter;
