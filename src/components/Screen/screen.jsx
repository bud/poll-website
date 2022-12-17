import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/user/userContext";
import Navigate from "../Navigation/navigate";
import AlertOverlay from "./alertOverlay";

const Screen = () => {
  const { userState } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.id === null || userState.id === undefined) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-50">
      <Navigate />
      <section className="h-screen max-w-4xl flex flex-col gap-12 mx-auto py-10 pt-24 px-4 overflow-y-hidden">
        <Outlet />
      </section>
      <AlertOverlay />
    </main>
  );
};

export default Screen;
