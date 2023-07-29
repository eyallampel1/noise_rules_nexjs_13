"use client";

import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    useEffect(() => {
      if (!isLoggedIn) {
        router.push("/");
      }
    }, []);

    return isLoggedIn ? <Component {...props} /> : null;
  };
}