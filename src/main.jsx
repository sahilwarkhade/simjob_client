import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 30 minutes
    },
  },
});

const clientId =
  "639628443314-3p7dilpqcmn5o1gotlo1mvcimff5s7qv.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
      </Router>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);
