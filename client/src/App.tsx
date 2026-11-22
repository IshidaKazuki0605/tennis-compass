import Home from "@/pages/Home";
import Beta from "@/pages/Beta";
import { Route, Switch } from "wouter";
export default function App() {
  return <Switch>
    <Route path="/beta" component={Beta} />
    <Route path="/" component={Home} />
    <Route component={Home} />
  </Switch>;
}