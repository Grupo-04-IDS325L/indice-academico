import React from "react";

import Header from "../Header";
import Footer from "../Footer";

import "typeface-source-sans-pro";

const Layout = props => {
  return (
    <div className="layout">
      <Header />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
