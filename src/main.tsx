import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
document.documentElement.dataset.theme = "rounded";

createRoot(document.getElementById("root")!).render(<App />);
