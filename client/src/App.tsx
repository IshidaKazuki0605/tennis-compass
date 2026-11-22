import Home from "@/pages/Home";
import Beta from "@/pages/Beta";

export default function App() {
  return window.location.pathname.replace(/\/$/, "").endsWith("/beta")
    ? <Beta />
    : <Home />;
}