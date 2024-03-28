import React from "react";
import { IoPlay } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import MovieSections from "../components/home/MovieSections";

const MoviePage = ({ movie }) => {
  return (
    <div key={movie.id} className="h-[150vh] md:w-full relative select-none">
      <img
        className="w-full h-full object-cover blur-xl z-0 brightness-[0.15]"
        src={movie.image}
        alt="movie background"
      />
      {/* Movie Title and Ratings */}
      <div className="absolute top-[8%] w-full p-8">
        <div className="flex gap-14 absolute ml-2">
          <img
            src={movie.image}
            alt="title"
            className="w-auto h-[80vh] object-cover brightness-90"
          />
          <div>
            <div className=" w-full flex justify-between items-center mb-1 pr-10">
              <h1 className="text-5xl font-semibold  ">Matrix</h1>
              <div className="flex mt-1 mr-6 items-center text-3xl ">
                <p className=" font-semibold">8.3</p>
                <GoStarFill size={30} className="text-yellow-400 ml-2" />
              </div>
            </div>
            <div className="flex gap-4 text-gray-400 mb-6">
              <p>
                <span className="">{movie.year} </span>
              </p>
              <p>|</p>
              <p>
                <span className="">{movie.runtime} mins</span>
              </p>
            </div>
            <div className="flex flex-col text-lg gap-5">
              <div>
                <p className="mr-10 line-clamp-6">{movie.desc}</p>
              </div>
              <div className="space-y-4 my-6">
                <button
                  className="flex items-center gap-2 bg-white text-black py-2 pl-3 pr-4
                font-semibold rounded-md hover:bg-primary-red hover:text-white
                duration-300"
                >
                  <IoPlay /> Play
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-5">Details</h2>
                <div className="flex gap-7">
                  <div className="flex flex-col gap-2 ">
                    <p>Cast</p>
                    <p>Director</p>
                    <p>Genre</p>
                  </div>
                  <div className="flex flex-col gap-2 text-blue-600">
                    <div className="flex">
                      {movie.cast.map((actor, index) => (
                        <div className="mr-4" key={index}>
                          <p>{actor}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <p>{movie.director}</p>
                    </div>
                    <div className="flex">
                      {movie.genre.map((genre, index) => (
                        <div className="mr-4" key={index}>
                          <p>{genre}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-0 w-full z-20 px-8">
        <div className="relative overflow-visible">
          <MovieSections title="More Like This" />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
