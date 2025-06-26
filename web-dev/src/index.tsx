import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { ErrorPage } from "./Pages/ErrorPage";
import { RecipesPage } from "./Pages/RecipesPage";
import { HomePage } from "./Pages/HomePage";
import { ShoppingListPage } from "./Pages/ShoppingListPage";
import { CommonLayout } from "./Components/CommonLayout";
import { ParametersPages } from "./Pages/ParametersPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { IngredientPage } from "./Pages/IngredientPage";
import { Box } from "@mui/material";
import { AppBarCustom } from "./Components/AppBarCustom";
import { ShoppingListDetails } from "./Pages/ShoppingListDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/recipes",
    element: <RecipesPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/ingredients",
    element: <IngredientPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shopping-list",
    element: <ShoppingListPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/shopping-list/:id",
    element: <ShoppingListDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/parameters",
    element: <ParametersPages />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Box>
        <AppBarCustom />
      </Box>
      <CommonLayout>
        <RouterProvider router={router} />
      </CommonLayout>{" "}
    </QueryClientProvider>
  </React.StrictMode>
);
