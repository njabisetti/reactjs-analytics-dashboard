import React from "react";
import render from "riteway/render-component";

import DashboardStat from "./DashboardStat";

it("DashboardStat component type 1", () => {
  const statType = "1";
  const statTitle = "Title";
  const statValue = "10";

  const $ = render(
    <DashboardStat type={statType} title={statTitle} value={statValue} />
  );

  expect($("svg").html().trim()).toEqual(
    `<path fill=\"currentColor\" d=\"M416 0c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm-160-16C256 50.1 205.9 0 144 0S32 50.1 32 112v166.5C12.3 303.2 0 334 0 368c0 79.5 64.5 144 144 144s144-64.5 144-144c0-34-12.3-64.9-32-89.5V112zM144 448c-44.1 0-80-35.9-80-80 0-25.5 12.2-48.9 32-63.8V112c0-26.5 21.5-48 48-48s48 21.5 48 48v192.2c19.8 14.8 32 38.3 32 63.8 0 44.1-35.9 80-80 80zm16-125.1V112c0-8.8-7.2-16-16-16s-16 7.2-16 16v210.9c-18.6 6.6-32 24.2-32 45.1 0 26.5 21.5 48 48 48s48-21.5 48-48c0-20.9-13.4-38.5-32-45.1z\"></path>`
  );

  expect($(".card-title").html().trim()).toEqual(statTitle);
  expect($(".card-text").html().trim()).toEqual(statValue);
});

it("DashboardStat component type 2", () => {
  const statType = "2";
  const statTitle = "Title2";
  const statValue = "20";

  const $ = render(
    <DashboardStat type={statType} title={statTitle} value={statValue} />
  );

  expect($("svg").html().trim()).toEqual(
    `<path fill=\"currentColor\" d=\"M511.328,20.8027c-11.60759,38.70264-34.30724,111.70173-61.30311,187.70077,6.99893,2.09372,13.4042,4,18.60653,5.59368a16.06158,16.06158,0,0,1,9.49854,22.906c-22.106,42.29635-82.69047,152.795-142.47819,214.40356-.99984,1.09373-1.99969,2.5-2.99954,3.49995A194.83046,194.83046,0,1,1,57.085,179.41009c.99985-1,2.40588-2,3.49947-3,61.59994-59.90549,171.97367-120.40473,214.37343-142.4982a16.058,16.058,0,0,1,22.90274,9.49988c1.59351,5.09368,3.49947,11.5936,5.5929,18.59351C379.34818,35.00565,452.43074,12.30281,491.12794.70921A16.18325,16.18325,0,0,1,511.328,20.8027ZM319.951,320.00207A127.98041,127.98041,0,1,0,191.97061,448.00046,127.97573,127.97573,0,0,0,319.951,320.00207Zm-127.98041-31.9996a31.9951,31.9951,0,1,1-31.9951-31.9996A31.959,31.959,0,0,1,191.97061,288.00247Zm31.9951,79.999a15.99755,15.99755,0,1,1-15.99755-15.9998A16.04975,16.04975,0,0,1,223.96571,368.00147Z\"></path>`
  );

  expect($(".card-title").html().trim()).toEqual(statTitle);
  expect($(".card-text").html().trim()).toEqual(statValue);
});

it("DashboardStat component type 3", () => {
  const statType = "3";
  const statTitle = "Title3";
  const statValue = "30";

  const $ = render(
    <DashboardStat type={statType} title={statTitle} value={statValue} />
  );

  expect($("svg").html().trim()).toEqual(
    `<path fill=\"currentColor\" d=\"M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7.1 5.4.2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4z\"></path>`
  );

  expect($(".card-title").html().trim()).toEqual(statTitle);
  expect($(".card-text").html().trim()).toEqual(statValue);
});
