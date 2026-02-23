import { RegisterForm } from "./components/RegisterForm";

export const RegisterComponent = ({ onLogin, onSubmit }) => {
  return (
    <>
      <h1 className="font-bold text-4xl mb-4">Sign in</h1>
      <RegisterForm onLogin={onLogin} onSubmit={onSubmit} />
    </>
  );
};
