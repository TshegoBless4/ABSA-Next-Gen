import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main
        style={{
          paddingTop: "90px",
          // maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
