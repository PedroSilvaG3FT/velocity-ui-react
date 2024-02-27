import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoCBYK from "../../../../assets/images/logo-cbyk.svg";

import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthContext } from "../../../../contexts/auth.context";
import { authActions } from "../../../../store/reducers/auth.reducer";
import AppInput from "../../../@shared/components/form/app-input";
import "./styles.scss";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { microsoftSignIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginTestMode = () => {
    authActions.setToken(
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiI4NzljYzllYi0xZGIyLTRjMmMtODAyNC1jYzI3OTRkMjU3ZTkiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZDFmMzEyNDQtZWQ1NC00YzMzLWFjODMtNWM2Y2YyN2M2ZTBlL3YyLjAiLCJpYXQiOjE3MDg2MjkxNzgsIm5iZiI6MTcwODYyOTE3OCwiZXhwIjoxNzA4NjMzMDc4LCJuYW1lIjoiUGVkcm8gSGVucmlxdWUgU291emEgRGUgT2xpdmVpcmEgU2lsdmEiLCJub25jZSI6IjAxOGRkMjQyLWY0ODAtN2RkZC04NGE3LTUxODI2ZjEyMWMzZiIsIm9pZCI6IjA1YjViN2Q0LWY3MTMtNGQ1Ni1hZTRiLTg1MWE1ZDU3MGY4NiIsInByZWZlcnJlZF91c2VybmFtZSI6InBlZHJvLnNpbHZhQGNieWsuY29tLmJyIiwicmgiOiIwLkFTWUFSQkx6MFZUdE0weXNnMXhzOG54dUR1dkpuSWV5SFN4TWdDVE1KNVRTVi1rbUFNcy4iLCJzdWIiOiJ4RHp0WWQzaGszNlZwQ2ZvLTlQdjk2YVY0eVNHT3Voc3dIdkpMeUNad2hFIiwidGlkIjoiZDFmMzEyNDQtZWQ1NC00YzMzLWFjODMtNWM2Y2YyN2M2ZTBlIiwidXRpIjoiWS1SWGJsWVliVUtLYVY4YWxLYU5BQSIsInZlciI6IjIuMCJ9.TW9LOqvHBMHluyuzE6ASn65GQJCVo9-N60NB3a_9W96LI1I9LgQVRCTCbj9u4msQu9_U9YCsqnBAcmRfQvmgV0x5og5cIIQXlPBlP3OtsXjzRxRqpJldpTqpB5thDL1IsHFZ1YLQjKRuMSES1-y9_vPRoCjLRsFuibJtFiF4TCZ2jBciAXI4p7d_FQh0Ii0RXM0gE0R7UZzcK11dk5l2rdnxGdINNpTEcshM1FGmUGg6ADsOHuF-fQSPGegeobaHbcdF4VGnr1bSXnbHUa49dVZU4vSGmTC5Y2yYeNJHIHuB4RdJA5Ys3OyUHsoBhW9YTLuNQK2B77qZR9pp8ee0qw`
    );
    authActions.setTokenType(`Bearer`);
    authActions.setUserData({
      id: 17,
      isAllow: 1,
      email: "pedro.silva@cbyk.com.br",
      message: "Autenticação bem-sucedida",
      name: "Pedro Henrique Souza De Oliveira Silva",
    });
  };

  return (
    <section id="sign-in" className="app-container">
      <article>
        <img src={LogoCBYK} alt="CBYK" />

        <AppInput
          value={email}
          label="e-mail"
          containerClassname="mb-2"
          onValueChange={(value) => setEmail(value)}
        />

        <AppInput
          value={password}
          label="Password"
          onValueChange={(value) => setPassword(value)}
        />

        <button className="btn-primary">Login</button>

        <a onClick={handleLoginTestMode}>
          Sign in with test mode
          <Icon icon="grommet-icons:test" />
        </a>

        <a onClick={microsoftSignIn}>
          Sign in with Microsoft
          <Icon icon="logos:microsoft-icon" />
        </a>

        <span>
          Don’t have an account?{" "}
          <a onClick={() => navigate("/auth/sign-up")}>Sign up</a>
        </span>
      </article>
    </section>
  );
};

export default SignIn;
