import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./index.css";
import { Toaster } from "sonner";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SendMoney from "./pages/SendMoney.jsx";
import NotFound from "./pages/NotFound.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster richColors />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<SendMoney />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

/*
  readme
  responsiveness
*/
