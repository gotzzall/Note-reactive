import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import fetchWithAuth from "../tools/fetchWithAuth";
const PROFILE_URL = import.meta.env.VITE_PROFILE_API_URL;

export const withAuth = (Component) => {
  const Wrapper = (...params) => {
    let navigate = useNavigate();
    const isAuth = async () => {
      const response = await fetchWithAuth(`${PROFILE_URL}/me`, {}, null);
      return response;
    };

    useEffect(() => {
      isAuth().then((result) => {
        if (!result) navigate("/auth");
        console.log("se verifica");
      });
    });

    return <Component />;
  };

  return Wrapper;
};
