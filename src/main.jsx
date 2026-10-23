import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";
import "./styles/tokens.css";
import "./styles/bootstrap-overrides.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "@/app/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
