"use client";

import Login from "@/app/components/Login_comp/Login";
import Signin from "@/app/components/Signin_comp/Signin";

export default function Home() {
  return (
    <>
      {/*<main>*/}
      <h1>LOGIN COMP</h1>
      <Signin />
      <Login fromParent={"bla bla"} />
      {/*</main>*/}
    </>
  );
}