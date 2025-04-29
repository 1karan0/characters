import React from "react";

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#22130d] to-[#0e0422]">
          <div className="relative flex justify-center items-center">
            <div className="w-24 h-24 border-4  rounded-full animate-spin border-yellow-400"></div>
            <div
              className="absolute text-center text-white font-[Marcellus,serif] text-xl"
              style={{
                background: "linear-gradient(180deg, #FEE9BE, #F6CF7F)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Loading...
            </div>
          </div>
        </div>
      );
    
};

export default Loader;
