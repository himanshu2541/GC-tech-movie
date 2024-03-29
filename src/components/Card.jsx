import React from "react";
import { GoStarFill } from "react-icons/go";
import { useNavigate } from "react-router";
function Card({ movie }) {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate(`/movies/${movie.id}`);
  }
  return (
    
    <div
      key={movie.id}
      className="sm:w-48 rounded-lg overflow-hidden hover:scale-110 transition duration-700 relative group space-between hover:backdrop:blur-xl hover:z-40 hover:cursor-pointer shrink-0"
      onClick = {clickHandler}
    >
      <img
        src={movie.image}
        alt={movie.name}
        className="w-full z-1 h-64 object-cover object-center"
      />

      <div>
        <div className="text-white absolute w-full h-full bg-gradient-to-r from-black to-black/60 rounded-lg top-0 left-0 opacity-0 py-3 px-3 group-hover:opacity-100">
          <h2 className="text-xl font-semibold group-hover:line-clamp-2">
            {movie.name}
          </h2>
          <p className="text-sm font-light text-white line-clamp-2 mt-1">
            {movie.desc}
          </p>
          <div className="flex mt-2">
            <div className="flex gap-1 items-center">
              <p className="">{movie.rating}</p>
              <GoStarFill className="text-yellow-400" />
            </div>
            <div className="mx-1">•</div>
            <p className="mx-1">{movie.year}</p>
          </div>
          <div className="mt-2">
            {movie.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-2 py-2 text-sm font-semibold text-gray-700 mr-1 mb-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
