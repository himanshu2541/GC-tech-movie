import React from "react";
import { Hero, MovieSections } from "../components";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mt-16 px-8">
        <MovieSections title="Top Movies" />
        <MovieSections title="Top Shows" />
        <MovieSections title="Most Liked" />
      </div>
    </div>
  );
};

export default Home;
