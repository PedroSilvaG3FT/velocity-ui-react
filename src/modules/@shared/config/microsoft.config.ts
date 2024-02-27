/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  AuthenticationResult,
  Configuration,
  EventMessage,
  EventType,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

export const MICROSOFT_CONFIG: Configuration = {
  auth: {
    postLogoutRedirectUri: "/",
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_MSAL_TENANT_ID
    }`,
  },
  system: { allowNativeBroker: false },
};

export const MICROSOFT_LOGIN_REQUEST: PopupRequest = {
  scopes: ["User.Read"],
};

export const MICROSOFT_GRAPH_CONFIG = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const MICROSOFT_INSTANCE = new PublicClientApplication(MICROSOFT_CONFIG);

MICROSOFT_INSTANCE.initialize().then(() => {
  MICROSOFT_INSTANCE.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      MICROSOFT_INSTANCE.setActiveAccount(account);
    }
  });
});
