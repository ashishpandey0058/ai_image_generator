import React from "react";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <section className="p-10 h-screen overflow-scroll w-full flex justify-start items-center bg-slate-800 text-white flex-col gap-5">
      <h2 className="text-5xl uppercase font-semibold">Stable Diffusion</h2>
      <Outlet />
    </section>
  );
};

export default App;
