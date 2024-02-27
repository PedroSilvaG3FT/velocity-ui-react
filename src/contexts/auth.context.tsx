import { AuthenticationResult } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import React, { createContext } from "react";
import { useSelector } from "react-redux";
import { IAuthUserByEmailResponse } from "../modules/authentication/interfaces/authentication.interface";
import { AuthService } from "../modules/authentication/services/auth.service";
import { RootState } from "../store";
import { authActions } from "../store/reducers/auth.reducer";

interface IAuthContext {
  shortUserName: string;
  logout: () => void;
  signIn: () => Promise<void>;
  microsoftSignIn: () => void;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const authService = new AuthService();

const AuthContext = createContext<IAuthContext>({
  shortUserName: "",
  logout: () => {},
  microsoftSignIn: () => {},
  signIn: () => new Promise<void>(() => {}),
});

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const { instance: msalInstanceContext } = useMsal();
  const { userData } = useSelector((state: RootState) => state.auth);

  const handleMicrosoftSignin = (data: IAuthUserByEmailResponse) => {
    authActions.setUserData(data);
  };

  const handleMicrosoftSignup = (data: AuthenticationResult) => {
    authService
      .microsoftCreateUser(data.account.username, String(data.account.name))
      .then(() => {})
      .catch((error) => {
        console.error("[handleMicrosoftSignup:error] ", error);
      });
  };

  const checkMicrosoftUser = (data: AuthenticationResult) => {
    authService
      .getUserByEmail(data.account.username)
      .then((response) => {
        authActions.setToken(data.idToken);
        authActions.setTokenType(data.tokenType);

        if (response.data.email) handleMicrosoftSignin(response.data);
        else handleMicrosoftSignup(data);
      })
      .catch((error) => {
        console.error("[checkMicrosoftUser:error] ", error);
      });
  };

  const microsoftSignIn = () => {
    msalInstanceContext
      .loginPopup()
      .then((response) => {
        checkMicrosoftUser(response);
        authActions.setToken(response.idToken);
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const logout = () => {
    authActions.reset();
  };

  const signIn = async () => {};

  const getShortUserName = () => {
    const { name } = userData;

    if (!name) return "";

    const splitedName = name.split(" ");

    const firstName = splitedName[0];
    const lastName = splitedName[splitedName.length - 1];

    if (firstName === lastName) return firstName;
    else return `${firstName} ${lastName}`;
  };

  const providerValue = {
    signIn,
    logout,
    microsoftSignIn,
    shortUserName: getShortUserName(),
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
