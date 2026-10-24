import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./styles/tokens.css";
import "./styles/bootstrap-overrides.css";
import { store } from "@/app/store";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
