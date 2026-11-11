import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { readTheme } from "./components/customer/ThemeSwitcher";
document.documentElement.dataset.theme = readTheme();

createRoot(document.getElementById("root")!).render(<App />);
