import React from "react";
import { Link } from "react-router-dom";
import { directories } from "./directories";

const Navigate = () => {
  return (
    <nav id="navbar">
      <Link to="/" className="flex gap-4 items-center">
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" />
        <p className="text-title-md sm:text-headline-sm">Poll Requested</p>
      </Link>
      <div className="hidden sm:flex flex-row gap-9">
        {directories.map((link) => {
          return (
            <li key={link.to} className="list-none text-button-lg">
              <Link to={link.to}>{link.name}</Link>
            </li>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigate;
