import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "./lib/axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import 'semantic-ui-css/semantic.min.css';

const defaultQueryFn = async ({ queryKey }: any) => {
  const [key, args] = queryKey;
  const response = await axios.get(`${key}`, {});
  return response?.data;
};

// const mutationFn = async ({}) => {
//   const key = "ll";
//   const response = await axios.get(`/api/${key}`, {});
//   return response?.data;
// };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { networkMode: "offlineFirst", queryFn: defaultQueryFn },
    mutations: { mutationFn: async () => {} },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
