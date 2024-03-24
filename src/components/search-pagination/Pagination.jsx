import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Card from "../Card";
import MoviesData from "./Moviedata";
import axios from "axios";

function Cards({ currentItems }) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {currentItems &&
        currentItems.map((movie) => <Card key={movie.id} movie={movie} />)}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = MoviesData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(MoviesData.length / itemsPerPage);

  // useEffect(() => {
  //   axios
  //     .get("/user?ID=12345")
  //     .then(function (response) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % MoviesData.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="flex flex-col justify-center items-center py-4 relative h-screen w-full">
      <Cards currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        className="bottom-5 absolute flex justify-center items-center gap-2 "
        linkClass=" p-2 rounded-md border border-black"
        pageLinkClassName="p-2 rounded-md border"
        activeLinkClassName="bg-primary-red text-white p-2 rounded-md"
        previousLinkClassName="p-2 rounded-md border"
        nextLinkClassName="p-2 rounded-md border"
        breakLinkClassName="p-2 rounded-md border"
        disabledLinkClassName="text-primary-black border-0 cursor-default"
      />
    </div>
  );
}
export default PaginatedItems;
