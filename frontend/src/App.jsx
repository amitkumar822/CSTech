import React from "react";
import { Login } from "./pages/Login";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <Navbar />
      
      <Outlet />
    </div>
  );
};

export default App;
