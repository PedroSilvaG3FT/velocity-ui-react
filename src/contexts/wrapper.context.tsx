import { MsalProvider } from "@azure/msal-react";
import React, { createContext } from "react";
import { MICROSOFT_INSTANCE } from "../modules/@shared/config/microsoft.config";
import { AuthProvider } from "./auth.context";
import { ChatProvider } from "./chat.context";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <MsalProvider instance={MICROSOFT_INSTANCE}>
      <WrapperContext.Provider value={{}}>
        <AuthProvider>
          <ChatProvider>{children}</ChatProvider>
        </AuthProvider>
      </WrapperContext.Provider>
    </MsalProvider>
  );
};

export { WrapperContext, WrapperProvider };
