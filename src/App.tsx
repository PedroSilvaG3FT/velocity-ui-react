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
    <>
      <nav className="w-full flex gap-4 items-center">
        <a href="/">Default</a>
        <a href="/auth/sign-in">SignIn</a>
        <a href="/auth/sign-up">SignUp</a>
        <a href="/chat">Chat</a>
        <a href="/chat/history">Chat History</a>
      </nav>

      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </>
  );
}

export default App;
