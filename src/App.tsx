import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AllContexts from "./Contexts/AllContexts";
import AuthProvider from "./Providers/AuthProvider";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import {
  COLLECTIONS_ROUTE,
  PROFILE_PAGE_ROUTE,
  TASK_BOARD_ROUTE,
} from "./Routes/routes";
import Collections from "./Pages/Collections";

const App = () => {
  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <AllContexts>
        <Navbar />

        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />

          <Route element={<AuthProvider />}>
            <Route element={<Collections />} path={COLLECTIONS_ROUTE} />
            <Route element={<Dashboard />} path={TASK_BOARD_ROUTE + "/:id"} />
            <Route element={<UserProfile />} path={PROFILE_PAGE_ROUTE} />
          </Route>
        </Routes>

        <ToastContainer position="bottom-right" />
      </AllContexts>
    </main>
  );
};

export default App;
