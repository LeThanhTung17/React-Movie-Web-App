import React from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import Header from "../elements/Header";
import Home from "../Home";
import NotFound from "../NotFound";
import Movie from "../Movie";

const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/:movieId" component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};

export default App;
