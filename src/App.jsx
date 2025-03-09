import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./features/auths/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* <Route path="/resister" element={<Home />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
