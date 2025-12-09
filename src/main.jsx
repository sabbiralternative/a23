// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "rsuite/Pagination/styles/index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.jsx";
import StateProvider from "./context/StateProvider.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageProvider from "./context/LanguageProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <StateProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          success: {
            style: {
              backgroundColor: "#39da8a",
              color: "#fff",
              padding: "10px 30px",
            },
          },
          error: {
            style: {
              backgroundColor: "#ff5b5c",
              color: "#fff",
              padding: "10px 30px",
            },
          },
        }}
      />
    </LanguageProvider>
  </StateProvider>
  // {/* </React.StrictMode> */}
);
