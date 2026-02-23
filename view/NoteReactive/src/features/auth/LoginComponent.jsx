import { LoginForm } from "./components/LoginForm";

export const LoginComponent = ({ onRegister, onSubmit }) => {
  return (
    <>
      <h1 className="font-bold text-4xl mb-4">Log in</h1>
      <LoginForm onRegister={onRegister} onSubmit={onSubmit} />
    </>
  );
};
