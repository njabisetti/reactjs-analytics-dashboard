import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faMeteor,
  faTemperatureHigh,
} from "@fortawesome/free-solid-svg-icons";

const typeIconMap = {
  1: faTemperatureHigh,
  2: faMeteor,
  3: faCloud,
};

const DashboardStat = ({ type, title, value }) => {
  return (
    <div className="dashboardStat">
      <Card>
        <CardBody>
          <FontAwesomeIcon icon={typeIconMap[type]} />
          <CardTitle>{title}</CardTitle>
          <CardText>{value}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardStat;
