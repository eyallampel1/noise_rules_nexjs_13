"use client";
import React, { useState } from "react";

import Link from "next/link";
import Login from "@/app/components/Login_comp/Login";
import { State } from "../State";

const Help = () => {
  const [name, setName] = useState(State.user.profile.name.get());

  return (
    <>
      <h1>help </h1>
      <Link href={"/"}>Click to return</Link>
      <Login fromParent={"sent from help page"} />
      <button
        onClick={() => {
          setName("CHANGED");
        }}
      >
        change global var
      </button>

      <button
        onClick={() => {
          setName("LAMPEL");
        }}
      >
        change BACK
      </button>
      {name}
    </>
  );
};
export default Help;