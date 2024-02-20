// Header.js

import React, { Children } from "react";
import "./Header.css";

function Layout({ children }) {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>
     <div>{children}</div>
    </>
  );
}

export default Layout;
