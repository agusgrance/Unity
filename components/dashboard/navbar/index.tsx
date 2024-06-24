// React
import React from "react";

// Components
import Logo from "../logo";
import Actions from "../actions";

const NavBar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] bg-[#1e1e22] px-2 lg:px-4 flex justify-between items-center shadosm">
      <Logo />
      <Actions />
    </nav>
  );
};

export default NavBar;
