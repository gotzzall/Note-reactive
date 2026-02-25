import {
  EyeDropperIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/16/solid";
import { useState } from "react";

const DEFAULT_DATA = { email: "", password: "", username: "" };

export const RegisterForm = ({
  onSubmit,
  onLogin,
  dataInit = DEFAULT_DATA,
}) => {
  const [form, setForm] = useState(dataInit);

  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(DEFAULT_DATA);
  }

  function handleEmail({ target }) {
    setForm((currentData) => {
      return { ...currentData, email: target.value };
    });
  }

  function handlePassword({ target }) {
    setForm((currentData) => {
      return { ...currentData, password: target.value };
    });
  }
  function handleUsername({ target }) {
    setForm((currentData) => {
      return { ...currentData, username: target.value };
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label className="floating-label">
        <span>Username:</span>
        <input
          type="text"
          placeholder="Username"
          className="input input-md w-full"
          value={form.username}
          onChange={handleUsername}
        />
      </label>
      <label className="floating-label">
        <span>Email:</span>
        <input
          type="text"
          placeholder="Email"
          className="input input-md w-full"
          value={form.email}
          onChange={handleEmail}
        />
      </label>
      <div className="join w-full">
        <label className="floating-label join-item w-full">
          <span>Password:</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-md w-full"
            value={form.password}
            onChange={handlePassword}
          />
        </label>
        <button
          className="btn join-item"
          type="button"
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? (
            <EyeSlashIcon className="size-6" />
          ) : (
            <EyeIcon className="size-6" />
          )}
        </button>
      </div>

      <a className="underline hover:text-gray-500" onClick={onLogin}>
        Did you have an acount?
      </a>

      <button className="btn w-full mt-8" type="submit">
        Submit
      </button>
    </form>
  );
};
