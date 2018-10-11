import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Refs from "./pages/Refs";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Refs} />
        <Route exact path="/refs" component={Refs} />
        <Route exact path="/refs/:id" component={Detail} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
