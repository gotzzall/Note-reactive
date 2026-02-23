import { useState } from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";

export const AuthComponent = ({ data, actions, monitors }) => {
  console.log("authComponent", actions);

  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="m-20">
      {isRegister ? (
        <RegisterComponent
          onLogin={() => setIsRegister(false)}
          onSubmit={actions.auth.register}
        />
      ) : (
        <LoginComponent
          onRegister={() => setIsRegister(true)}
          onSubmit={actions.auth.login}
        />
      )}
    </div>
  );
};
