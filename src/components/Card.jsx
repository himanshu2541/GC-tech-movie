import React from "react";
function Card({ movie }) {
  return (
    <div
      key={movie.id}
      className=" rounded-lg overflow-hidden hover:scale-110 transition duration-700 relative group space-between hover:backdrop:blur-xl hover:z-40 hover:cursor-pointer "
    >
      <img
        src={movie.image}
        alt={movie.name}
        className="w-full z-1 h-64 object-cover object-center "
      />

      <div>
        <div className="text-white absolute w-full h-full bg-gradient-to-r from-black to-black/60 rounded-lg top-0 left-0 opacity-0 px-4 py-4 group-hover:opacity-100">
          <h2 className="text-xl font-semibold group-hover:line-clamp-2">
            {movie.name}
          </h2>
          <p className="text-sm font-light text-white line-clamp-2 mt-1">
            {movie.desc}
          </p>
          <div className="flex mt-2">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="">{movie.rating}</p>
            </div>
            <div className="mx-2">•</div>
            <p className="">{movie.year}</p>
          </div>
          <div className="mt-4">
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
