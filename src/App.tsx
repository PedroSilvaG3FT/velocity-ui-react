import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { WrapperProvider } from "./contexts/wrapper.context.tsx";
import RouteGuardWrapper from "./modules/@shared/guard/route.guard.tsx";
import { AUTHENTICATION_ROUTES } from "./modules/authentication/pages/routes.tsx";
import { CHAT_ROUTES } from "./modules/chat/pages/routes.tsx";

const router = createBrowserRouter([
  { path: "*", element: <RouteGuardWrapper /> },
  {
    path: "/",
    element: <RouteGuardWrapper />,
    children: [...CHAT_ROUTES, ...AUTHENTICATION_ROUTES],
  },
]);

function App() {
  return (
    <WrapperProvider>
      <RouterProvider router={router} />
    </WrapperProvider>
  );
}

export default App;
