import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login";
import Tasks from "./Pages/Tasks";
import AllContexts from "./Contexts/AllContexts";
import AuthProvider from "./Providers/AuthProvider";
import SignUp from "./Pages/SignUp";
import UserProfile from "./Pages/UserProfile";
import ResetPassword from "./Pages/RestPassword";
import {
  COLLECTIONS_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  PROFILE_PAGE_ROUTE,
  RESET_PASSWORD,
  TASK_BOARD_ROUTE,
} from "./Routes/routes";
import Collections from "./Pages/Collections";
import ForgotPassword from "./Pages/ForgotPassword";

const App = () => {
  return (
    <main className="flex flex-col h-screen bg-gray-100">
      <AllContexts>
        <Navbar />
        <div className="flex flex-col h-full mt-16 overflow-y-auto">
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route element={<ForgotPassword />} path={FORGOT_PASSWORD_ROUTE} />
            <Route
              element={<ResetPassword />}
              path={RESET_PASSWORD + "/:token"}
            />

            <Route element={<AuthProvider />}>
              <Route element={<Collections />} path={COLLECTIONS_ROUTE} />
              <Route element={<Tasks />} path={TASK_BOARD_ROUTE + "/:id"} />
              <Route element={<UserProfile />} path={PROFILE_PAGE_ROUTE} />
            </Route>
          </Routes>
        </div>

        <ToastContainer position="bottom-right" />
      </AllContexts>
    </main>
  );
};

export default App;
