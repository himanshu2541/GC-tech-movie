import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  NotFound,
  Subscription,
  Account,
  GetAllUsers,
  ChangePassword,
  Unauthorized,
  Test,
  MoviePage,
} from "./pages";

import Layout from "./layout/Layout";
import FlowBiteCarousel from "./components/Carousel";
import PaginatedItems from "./components/search-pagination/Pagination";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PersistLogin from "./components/persistance/PersistLogin";

const ROLES = {
  user: ["tier1", "tier2", "tier3", "tier4"],
  admin: ["admin"],
};

const App = () => {
  const movie = {
    id: 1,
    name: "The Avengers",
    image:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_SX677_AL_.jpg",
    rating: { imdb: "8.0" },
    year: "2012",
    desc: "In Naples, where prostitutes can pay their rent, Angela is sentenced to a year in the workhouse when she tries to steal(while streetwalking) to pay for medicine for her dying mother. She escapes and is hidden by a circus, where she's a natural talent and meets Gino, a painter. When she breaks her ankle in a fall, her career ends. What can she and Gino do? He wants to go to Naples, but the law may still be looking for her, and Gino doesn't know about her past. Starving artist and a beauty with a secret: is there room in this world for them?",
    genre: ["Action", "Adventure", "Sci-Fi"],
    totalRatings: 123456,
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
    director: "Joss Whedon",
    runtime: "143",
  };
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/test" element={<Test />} />

      {/* Private Routes */}
      {/* Persist User to pages */}
      <Route element={<PersistLogin />}>
        {/* User routes */}
        <Route element={<ProtectedRoutes allowedRoles={ROLES.user} />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="test" element={<FlowBiteCarousel />} />
            <Route
              path="/search/"
              element={<PaginatedItems itemsPerPage={10} />}
            />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/me" element={<Account />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path={`/movies/${movie.id}`}
              element={<MoviePage movie={movie} />}
            />
          </Route>
        </Route>

        {/* Admin routes */}
        <Route element={<ProtectedRoutes allowedRoles={ROLES.admin} />}>
          <Route path="/get-users" element={<GetAllUsers />} />
        </Route>
      </Route>

      {/* catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
