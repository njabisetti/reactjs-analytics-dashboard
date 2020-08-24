import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";

export const TEMPERATURE_TYPE = "1";
export const PRESSURE_TYPE = "2";
export const HUMIDITY_TYPE = "3";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={(props) => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                }}
              />
            );
          })}
        </div>
      </Router>
    </div>
  );
}

export default App;
