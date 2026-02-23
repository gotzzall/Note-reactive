import { useState } from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AuthComponent = ({ actions, monitors }) => {
  let navigate = useNavigate();

  console.log(monitors);

  useEffect(() => {
    if (monitors.login) {
      navigate("/notes");
    } else {
      navigate("/auth");
    }
  }, [monitors]);

  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="m-20">
      {isRegister ? (
        <RegisterComponent
          onLogin={() => setIsRegister(false)}
          onSubmit={(data) => {
            actions.auth.register(data);
            setIsRegister(false);
          }}
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
