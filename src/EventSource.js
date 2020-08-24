import { EventEmitter } from "events";
import { interval, Observable } from "rxjs";
import moment from "moment";

import { TEMPERATURE_TYPE, PRESSURE_TYPE, HUMIDITY_TYPE } from "./App";

const temperature = new EventEmitter();
const temperature$ = Observable.create((observer) => {
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
const pressure$ = Observable.create((observer) => {
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
const humidity$ = Observable.create((observer) => {
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

export function getTemperature(){
  return temperature$;
}

export function getPressure(){
  return pressure$;
}

export function getHumidity(){
  return humidity$;
}