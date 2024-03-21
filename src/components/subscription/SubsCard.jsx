import React from "react";
const SubsCard = ({ title, price, res, content }) => {
  return (
    <div className="flex flex-col justify-between p-8 transition-shadow duration-300 bg-white border-2 rounded shadow-sm sm:items-center hover:shadow-lg hover:cursor-pointer hover:border-purple-400 group">
      <div className="text-center">
        <div className="text-lg font-semibold group-hover:text-purple-400 transition">
          {title}
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="mr-1 text-5xl font-bold group-hover:text-purple-400 transition">
            {price}
          </div>
          <div className="text-gray-700">/ mo</div>
        </div>
        <div className="mt-2 space-y-3">
          {/* <div className="text-gray-700">Resolution</div> */}
          <div className="text-gray-700 font-semibold">{res}</div>
          <div className="text-gray-700 font-semibold">{content}</div>
        </div>
      </div>
      <div>
        <a
          href="/"
          className="inline-flex items-center justify-center w-full h-12 px-6 mt-6 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-mdnpm strat focus:shadow-outline focus:outline-none group-hover:bg-purple-400"
        >
          Buy {title}
        </a>
        <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
          HD (720p), Full HD (1080p) availability subject to your internet
          service and device capabilities.
        </p>
      </div>
    </div>
  );
};

export default SubsCard;
