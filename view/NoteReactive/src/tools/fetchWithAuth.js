import { authServices } from "../services/authServices";

const NO_INTENTOS = 3;

const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

const fetchAction = async (url, options) => {
  const bearerToken = JSON.parse(localStorage.getItem("token")) || "";

  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      ["Authorization"]: `Bearer ${bearerToken.accessToken}`,
    },
  };
  const response = await fetch(url, newOptions);
  const result = await response.json();
  return result;
};

const fetchWithAuth = async (url, options = {}, defaultResult = []) => {
  const response = await fetchAction(url, options);
  if (!response.isSuccess) {
    const refreshResponse = await authServices.refresh();

    if (!refreshResponse) return defaultResult;

    const secondResponse = await fetchAction(url, options);

    if (!secondResponse.isSuccess) return defaultResult;

    return secondResponse.result;
  }

  return response.result;
};

export default fetchWithAuth;
