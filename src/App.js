import { Switch, Route } from "react-router-dom";


import Home from "./components/Home";
import WeatherPage from "./components/WeatherPage";

import "./App.css";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}

export default App;