import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChatProvider } from "./contexts/chat.context.tsx";
import { AUTHENTICATION_ROUTES } from "./modules/authentication/pages/routes.tsx";
import { CHAT_ROUTES } from "./modules/chat/pages/routes.tsx";

const router = createBrowserRouter([
  { path: "*", element: <Outlet /> },
  {
    path: "/",
    element: <Outlet />,
    children: [...CHAT_ROUTES, ...AUTHENTICATION_ROUTES],
  },
]);

function App() {
  return (
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  );
}

export default App;
