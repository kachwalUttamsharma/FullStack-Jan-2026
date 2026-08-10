import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="h-[10vh] bg-gray-800 px-10 py-5 flex justify-between items-center">
      <NavLink to="/">
        <img
          className=" w-30 rounded-lg cursor-pointer"
          src={logo}
          alt="IMDB Logo"
        />
      </NavLink>
      <div className="flex gap-5">
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `text-lg ${
              isActive ? "text-yellow-400 font-semibold" : "text-white"
            }`
          }
        >
          Watchlist
        </NavLink>
        <NavLink
          to="/GPTsearch"
          className={({ isActive }) =>
            `text-lg ${
              isActive ? "text-yellow-400 font-semibold" : "text-white"
            }`
          }
        >
          GPT Suggestion
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
