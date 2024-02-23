import { RouteObject } from "react-router-dom";

import SignIn from "./sign-in";
import SignUp from "./sign-up";

export const AUTHENTICATION_ROUTES: RouteObject[] = [
  { path: "/auth/sign-in", Component: SignIn },
  { path: "/auth/sign-up", Component: SignUp },
];
