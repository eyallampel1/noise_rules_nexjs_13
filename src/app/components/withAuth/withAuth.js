"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      // Client-side-only code
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");

      if (!isLoggedIn) {
        router.push("/");
      }
    }, []);

    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("isLoggedIn");
      return isLoggedIn ? <Component {...props} /> : null;
    }

    // This will only be rendered on server-side
    return null;
  };
}