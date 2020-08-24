import React from "react";
import { EventEmitter } from "events";
import { of } from "rxjs";

import moment from "moment";

import { render, waitForDomChange, screen } from "@testing-library/react";

import * as EventSource from "../EventSource";
import Dashboard from "./Dashboard";
import { TEMPERATURE_TYPE, PRESSURE_TYPE, HUMIDITY_TYPE } from "../App";
import { TestScheduler } from "rxjs/testing";

import { act } from "react-dom/test-utils";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

const values = {
  a: {
    type: TEMPERATURE_TYPE,
    title: "Temperature",
    value: 30,
    timestamp: moment(),
  },
  b: {
    type: TEMPERATURE_TYPE,
    title: "Temperature",
    value: 60,
    timestamp: moment(),
  },
  c: {
    type: PRESSURE_TYPE,
    title: "Air Pressure",
    value: 60,
    timestamp: moment(),
  },
  d: {
    type: PRESSURE_TYPE,
    title: "Air Pressure",
    value: 90,
    timestamp: moment(),
  },
  e: {
    type: HUMIDITY_TYPE,
    title: "Humidity",
    value: 90,
    timestamp: moment(),
  },
  f: {
    type: HUMIDITY_TYPE,
    title: "Humidity",
    value: 120,
    timestamp: moment(),
  },
};

it("default dashboard with values", async () => {
  testScheduler.run((helpers) => {
    const { cold, expectSubscriptions } = helpers;
    const mockTemperature$ = cold("-a--b--|", values);
    const mockPressure$ = cold("-c--d--|", values);
    const mockHumidity$ = cold("-e--f--|", values);
    const subs = "^------!";

    EventSource.getTemperature = jest.fn();
    EventSource.getTemperature.mockImplementation(() => mockTemperature$);

    EventSource.getPressure = jest.fn();
    EventSource.getPressure.mockImplementation(() => mockPressure$);

    EventSource.getHumidity = jest.fn();
    EventSource.getHumidity.mockImplementation(() => mockHumidity$);

    
    render(<Dashboard />);
    
    expectSubscriptions(mockTemperature$.subscriptions).toBe(subs);
    expectSubscriptions(mockPressure$.subscriptions).toBe(subs);
    expectSubscriptions(mockHumidity$.subscriptions).toBe(subs);
  });

  expect(screen.queryByText("Temperature")).toBeTruthy();
  expect(screen.queryByText("Air Pressure")).toBeTruthy();
  expect(screen.queryByText("Humidity")).toBeTruthy();

  expect(screen.queryByText("60")).toBeTruthy();
  expect(screen.queryByText("90")).toBeTruthy();
  expect(screen.queryByText("120")).toBeTruthy();
});

it("dashboard with missing values from one of the source should display N/A", async () => {
    testScheduler.run((helpers) => {
      const { cold, expectSubscriptions } = helpers;
      const mockTemperature$ = cold("-a--b--|", values);
      const mockPressure$ = cold("-c--d--|", values);
      const mockHumidity$ = cold("-e-- 1100ms --|", values);
      const subs = "-------^------!";
      const subs2 = "-------^------ 994ms !";
  
      EventSource.getTemperature = jest.fn();
      EventSource.getTemperature.mockImplementation(() => mockTemperature$);
  
      EventSource.getPressure = jest.fn();
      EventSource.getPressure.mockImplementation(() => mockPressure$);
  
      EventSource.getHumidity = jest.fn();
      EventSource.getHumidity.mockImplementation(() => mockHumidity$);
  
      
      render(<Dashboard />);
      
      expectSubscriptions(mockTemperature$.subscriptions).toBe(subs);
      expectSubscriptions(mockPressure$.subscriptions).toBe(subs);
      expectSubscriptions(mockHumidity$.subscriptions).toBe(subs2);
    });

    expect(screen.queryByText("Temperature")).toBeTruthy();
    expect(screen.queryByText("Air Pressure")).toBeTruthy();
    expect(screen.queryByText("Humidity")).toBeTruthy();
    
    expect(screen.queryByText("60")).toBeTruthy();
    expect(screen.queryByText("90")).toBeTruthy();
    expect(screen.queryByText("N/A")).toBeTruthy();
  });
