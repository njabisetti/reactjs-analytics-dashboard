import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";

import { EventEmitter } from "events";
import { interval, Observable } from "rxjs";
import moment from "moment";

export const TEMPERATURE_TYPE = "1";
export const PRESSURE_TYPE = "2";
export const HUMIDITY_TYPE = "3";

const temperature = new EventEmitter();
export const temperature$ = Observable.create((observer) => {
  temperature.on("message", (val) =>
    observer.next({
      type: TEMPERATURE_TYPE,
      title: "Temperature",
      value: val + 30,
      timestamp: moment(),
    })
  );
  temperature.on("error", (err) => observer.error(err));
});

const pressure = new EventEmitter();
export const pressure$ = Observable.create((observer) => {
  pressure.on("message", (val) =>
    observer.next({
      type: PRESSURE_TYPE,
      title: "Air Pressure",
      value: val + 100,
      timestamp: moment(),
    })
  );
  pressure.on("error", (err) => observer.error(err));
});

const humidity = new EventEmitter();
export const humidity$ = Observable.create((observer) => {
  humidity.on("message", (val) =>
    observer.next({
      type: HUMIDITY_TYPE,
      title: "Humidity",
      value: val + 30,
      timestamp: moment(),
    })
  );
  humidity.on("error", (err) => observer.error(err));
});

interval(150).subscribe((val) => {
  temperature.emit("message", val);
});

interval(500).subscribe((val) => {
  pressure.emit("message", val);
});

interval(900).subscribe((val) => {
  if (val >= 30 || val <= 20) {
    humidity.emit("message", val);
  }
});

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
