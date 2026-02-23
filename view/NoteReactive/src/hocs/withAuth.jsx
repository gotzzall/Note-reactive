import { useEffect, useState } from "react";
import { Link } from "react-router";

import fetchWithAuth from "../tools/fetchWithAuth";
const PROFILE_URL = import.meta.env.VITE_PROFILE_API_URL;
export const withAuth = (Component) => {
  const Wrapper = (...params) => {
    const isAuth = async () => {
      const response = await fetchWithAuth(`${PROFILE_URL}/me`, {}, null);
      if (response) return <Link to={"/auth"} />;

      return <Component />;
    };
  };

  return Wrapper;
};
