import React from "react";
import { Switch, Route } from "react-router-dom";
import { P1, P2, P3 } from "./components/index";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/p1" component={P1} />
      <Route exact path="/p2" component={P2} />
      <Route exact path="/p3" component={P3} />
    </Switch>
  );
}
