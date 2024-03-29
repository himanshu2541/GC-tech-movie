import React from "react";
const SubsCard = ({ title, price, res, content }) => {
  return (
    <div className="flex flex-col justify-between text-primary-black p-8 transition-shadow duration-300 bg-white border-2 rounded shadow-sm sm:items-center hover:shadow-lg hover:cursor-pointer  group">
      <div className="text-center">
        <div className="text-lg font-semibold group-hover:text-primary-red transition">
          {title}
        </div>
        <div className="flex items-center justify-center mt-2">
          <div className="mr-1 text-5xl font-bold group-hover:text-primary-red transition">
            {price}
          </div>
          <div>/ mo</div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="font-semibold">{res}</div>
          <div className="font-semibold">{content}</div>
        </div>
        <div className="w-full mt-8 px-2">
          <button className="bg-black text-white w-full py-3 px-5 rounded-lg group-hover:bg-primary-red duration-300">
            Buy {title}
          </button>
        </div>
        <p className="max-w-xs mt-6 text-xs text-gray-600 sm:text-sm sm:text-center sm:max-w-sm sm:mx-auto">
          HD (720p), Full HD (1080p) availability subject to your internet
          service and device capabilities.
        </p>
      </div>
    </div>
  );
};

export default SubsCard;
