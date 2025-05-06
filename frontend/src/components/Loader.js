
const Loader = () => {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#22130d] to-[#0e0422]">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 rounded-full bg-purple-500 blur-md opacity-20 animate-pulse"></div>
        
        {/* Main spinner container */}
        <div className="relative flex justify-center items-center w-40 h-40">
          {/* Spinning outer ring */}
          <div className="absolute w-40 h-40 border-4 border-t-purple-500 border-r-amber-400 border-b-cyan-400 border-l-pink-500 rounded-full animate-spin"></div>
          
          {/* Secondary spinning ring */}
          <div className="absolute w-32 h-32 border-4 border-t-transparent border-r-blue-400 border-b-transparent border-l-blue-400 rounded-full animate-spin "></div>
          
          <div className="flex flex-col items-center justify-center w-24 h-24 bg-black bg-opacity-80 rounded-full shadow-lg">
            <div className=" text-gray-300 mt-1">Loading</div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Loader;