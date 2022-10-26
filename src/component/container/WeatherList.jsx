import React, { useState, useRef } from "react";
import Weather from "../pure/Weather";

const WeatherList = () => {
  const [chosenCity, setChosenCity] = useState();

  const refSelectCity = useRef("");

  const cities = {
    Paris: { city: "Paris", lat: 48.8567, long: 2.351 },
    Madrid: { city: "Madrid", lat: 40.4167, long: -3.7033 },
    NewYork: { city: "New York", lat: 40.71, long: -74.01 },
    Tokyo: { city: "Tokyo", lat: 35.6785, long: 139.6823 },
    Canberra: { city: "Canberra", lat: -35.282, long: 149.1286 },
    Cairo: { city: "Cairo", lat: 30.0571, long: 31.2272 },
  };

  const switchCity = (city) => {
    switch (city) {
      case "Paris":
        setChosenCity(cities.Paris);
        break;
      case "Madrid":
        setChosenCity(cities.Madrid);
        break;
      case "NewYork":
        setChosenCity(cities.NewYork);
        break;
      case "Tokyo":
        setChosenCity(cities.Tokyo);
        break;
      case "Canberra":
        setChosenCity(cities.Canberra);
        break;
      case "Cairo":
        setChosenCity(cities.Cairo);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <select
        ref={refSelectCity}
        onChange={() => switchCity(refSelectCity.current.value)}
      >
        <option default value={"Madrid"}>
          Madrid
        </option>
        <option value={"Paris"}>Paris</option>
        <option value={"NewYork"}>New York</option>
        <option value={"Tokyo"}>Tokyo</option>
        <option value={"Canberra"}>Canberra</option>
        <option value={"Cairo"}>Cairo</option>
      </select>

      <Weather city={chosenCity}></Weather>
    </div>
  );
};

export default WeatherList;
