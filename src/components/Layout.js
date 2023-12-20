import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
const Layout = (props) => {
  return (
    <>
      <Navbar {...props} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
