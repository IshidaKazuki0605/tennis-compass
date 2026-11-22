import Home from "@/pages/Home";
import Beta from "@/pages/Beta";

export default function App() {
  const isBeta = window.location.hash.replace(/^#/, "").replace(/\/$/, "") === "/beta";
  return isBeta ? <Beta /> : <Home />;
}