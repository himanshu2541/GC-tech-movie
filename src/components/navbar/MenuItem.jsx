import React from "react";

const MenuItem = ({ onClick, label, className }) => {
  return (
    <div
      className={`px-4 py-3 hover:bg-neutral-100 transition font-semibold ${className}`}
      onClick={onClick}
    >{label}</div>
  );
};

export default MenuItem;