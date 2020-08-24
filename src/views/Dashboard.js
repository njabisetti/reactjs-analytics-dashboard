import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import DashboardStat from "./components/DashboardStat";

import { of } from "rxjs";
import {
  getTemperature,
  getPressure,
  getHumidity
} from "../EventSource";
import {
  TEMPERATURE_TYPE,
  PRESSURE_TYPE,
  HUMIDITY_TYPE,
} from "../App";

import { timeoutWith } from "rxjs/operators";

import { unique } from "../observables/unique";

const TIMEOUT_VALUE = 1000;
const DEBOUNCE_TIME = 100;

function Dashboard() {
  const [stats, setStats] = useState();

  useEffect(() => {    
    const stats$ = unique(
      DEBOUNCE_TIME,
      TIMEOUT_VALUE,
      getTemperature().pipe(
        timeoutWith(
          TIMEOUT_VALUE,
          of({ type: TEMPERATURE_TYPE, title: "Temperature", value: "N/A" })
        )
      ),
      getPressure().pipe(
        timeoutWith(
          TIMEOUT_VALUE,
          of({ type: PRESSURE_TYPE, title: "Air Pressure", value: "N/A" })
        )
      ),
      getHumidity().pipe(
        timeoutWith(
          TIMEOUT_VALUE,
          of({ type: HUMIDITY_TYPE, title: "Humidity", value: "N/A" })
        )
      )
    );    
    const subscription = stats$.subscribe(setStats, (error) => {
      console.log(`${error}`);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Container>
      <Row>
        {stats &&
          stats.map((statsItem, index) => {
            return (
              <Col key={index}>
                <DashboardStat {...statsItem} />
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default Dashboard;
