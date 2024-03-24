import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import Layout from "./layout/Layout";
import FlowBiteCarousel from "./components/Carousel";
import PaginatedItems from "./components/search-pagination/Pagination";
import Subscription from "./pages/Subscription";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import GetAllUsers from "./pages/GetAllUsers";
import Links from "./pages/Links";
import Account from "./pages/Account";
import PersistLogin from "./components/persistance/PersistLogin";

const ROLES = {
  user: ["tier1", "tier2", "tier3", "tier4"],
  admin: ["admin"],
};

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/links" element={<Links />} />

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
              element={<PaginatedItems itemsPerPage={6} />}
            />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/me" element={<Account />} />
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
