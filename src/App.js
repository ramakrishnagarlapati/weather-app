import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home";
import WeatherPage from "./components/WeatherPage";

import "./App.css";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/weather/:cityName" component={WeatherPage} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
