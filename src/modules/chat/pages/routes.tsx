import { RouteObject } from "react-router-dom";

import ChatLayout from "../components/layout";
import Chat from "./chat";
import History from "./history";

export const CHAT_ROUTES: RouteObject[] = [
  {
    path: "/chat",
    element: <ChatLayout />,
    children: [
      { path: "", Component: Chat },
      { path: "history", Component: History },
    ],
  },
];
