import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./features/home/Home";
import Login from "./features/auths/Login";
import Register from "./features/auths/Register";
import Profile from "./features/profile/Profile";
import PrivetRoute from "./routes/PrivetRoute";
import UnauthorizedAccess from "./routes/UnauthorizedAccess";
import Pricing from "./features/pricing/Pricing";
import PaymentPage from "./features/pricing/PaymentPage";
import Chats from "./features/chat-and-image-ganeration/Chats";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/chats" element={<Chats />} />

          <Route element={<PrivetRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivetRoute />}>
            <Route path="/payment" element={<PaymentPage />} />
          </Route>

          <Route element={<UnauthorizedAccess />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="*" element={<h2 className="text-7xl">Not Found!</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
