import React from "react";
import MovieSections from "../home/MovieSections";
const Hero = () => {
  return (
    <div className="w-full h-[50rem] text-white relative select-none">
      <div className="w-full h-full ">
        <div className="absolute w-full h-inherit bg-gradient-to-r from-black z-10" />
        <img
          className="w-full h-full object-cover"
          src={`/register.jpg`}
          alt="{movie background}"
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8 z-20">
          <h1 className="text-3xl md:4xl font-bold ">
            Transformers: Age of Extinction
          </h1>
          <div className="my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5 ml-4">
              Watch Later
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Released : 2008</p>
            <p className="w-full md:w-[70%] lg:w-[50%] xl:w-[35%] text-gray-200">
              8.3
            </p>
          </div>
        </div>
      </div>

      <div className="absolute w-full h-64 bottom-0 z-10 bg-gradient-to-b from-transparent to-primary-black" />

      <div className="absolute w-full -bottom-5 z-20 px-8">
        <div className="relative overflow-visible">
          <MovieSections />
        </div>
      </div>
    </div>
  );
};

export default Hero;
