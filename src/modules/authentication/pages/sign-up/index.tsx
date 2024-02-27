import React, { useState } from "react";
import LogoCBYK from "../../../../assets/images/logo-cbyk.svg";

import { useNavigate } from "react-router-dom";
import AppInput from "../../../@shared/components/form/app-input";
import "./styles.scss";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <section id="sign-up">
      <article>
        <img src={LogoCBYK} alt="CBYK" />

        <AppInput
          value={name}
          label="Name"
          containerClassname="mb-2"
          onValueChange={(value) => setName(value)}
        />

        <AppInput
          value={password}
          label="Password"
          containerClassname="mb-2"
          onValueChange={(value) => setEmail(value)}
        />

        <AppInput
          value={email}
          label="e-mail"
          containerClassname="mb-2"
          onValueChange={(value) => setPassword(value)}
        />

        <AppInput
          value={confirmPassword}
          label="Confirm password"
          containerClassname="mb-2"
          onValueChange={(value) => setConfirmPassword(value)}
        />

        <button className="btn-primary">Sign up</button>

        <span>
          Already have a registration?{" "}
          <a onClick={() => navigate("/auth/sign-in")}>Sign in</a>
        </span>
      </article>
    </section>
  );
};

export default SignUp;
