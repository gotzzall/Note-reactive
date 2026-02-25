const AUTH_URL = import.meta.env.VITE_AUTH_API_URL;

export const authServices = {
  login: async (data) => {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  register: async (data) => {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  refresh: async () => {
    const refresh = JSON.parse(localStorage.getItem("token"));

    const response = await fetch(`${AUTH_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken: refresh.refreshToken }),
    });
    const result = await response.json();
    if (!result.isSuccess) return false;

    localStorage.removeItem("token");

    localStorage.setItem("token", JSON.stringify(result.result));
    return true;
  },
};
