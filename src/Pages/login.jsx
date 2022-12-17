import React from "react";
import LoginProp from "../components/Login/login";
import { Link } from "react-router-dom";

const Login = () => {

  return (
    <>
    
    <nav id="navbar">
      <Link to="/" className="flex gap-4 items-center">
        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" />
      </Link>
      <div className="hidden sm:flex flex-row gap-9">
      </div>
    </nav>
    
    <br></br>
    <LoginProp />
    </>
  );
};

export default Login;
