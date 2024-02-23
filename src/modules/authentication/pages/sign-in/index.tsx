import React from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="sign-in">
      <h1>SignIn</h1>
      <button onClick={() => navigate("/auth/sign-up")}>SignUp</button>
    </section>
  );
};

export default SignIn;
