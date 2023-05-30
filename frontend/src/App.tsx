import Aside from "./components/Layout/Aside";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Categories from "./pages/Categories";
import Add from "./pages/Add";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PersistAuth from "./middleware/PersistAuth";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import Expenses from "./pages/Expenses";
import Budgets from "./pages/Budgets";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <PersistAuth />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <Aside />,
            children: [
              {
                path: "/",
                element: <Home />,
              },
              {
                path: "/expenses",
                element: <Expenses />,
              },
              {
                path: "/budgets",
                element: <Budgets />,
              },
              {
                path: "/categories",
                element: <Categories />,
              },
              {
                path: "/add",
                element: <Add />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
