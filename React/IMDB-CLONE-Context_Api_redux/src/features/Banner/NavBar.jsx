import React from "react";
import Logo from "../../assets/MovieLogo.png";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-8 items-center pl-3 py-4">
        <li>
          <NavLink
            to="/"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            <img src={Logo} alt="Movie Logo" className="w-[50px]" />
          </NavLink>
        </li>
        <li className="text-2xl font-bold text-blue-500">
          <NavLink
            to="/home"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            Home
          </NavLink>
        </li>
        <li className="text-2xl font-bold text-blue-500">
          <NavLink
            to="/watchlist"
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            WatchList
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
