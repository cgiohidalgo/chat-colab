import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ChatWrapper from "./components/ChatWrapper";
import HomeChat from "./HomeChat";
import "../src/components/FontawesomeIcons";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/un_colab/:courseId/:taskId" component={HomeChat} />
      <Route path="/chat/:status" component={ChatWrapper} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("un-colab-root")
);
