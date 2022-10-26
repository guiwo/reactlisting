import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "@fontsource/roboto/300.css";
import { Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit"; //snowflake
import LensBlurIcon from "@mui/icons-material/LensBlur"; //fog
import GrainIcon from "@mui/icons-material/Grain"; //rain
import WeatherTable from "./WeatherTable";
import sunrise from "../../images/sunrise-01.png";
import sunset from "../../images/sunset-01.png";

const Weather = ({ city }) => {
  //Get today's date for api string
  const date = new Date();
  const yearMonthDay = date.toISOString().split("T")[0];

  //Wind direction

  function getCardinalDirection(angle) {
    const directions = [
      "↑ N",
      "↗ NE",
      "→ E",
      "↘ SE",
      "↓ S",
      "↙ SW",
      "← W",
      "↖ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  }

  const [apiData, setApiData] = useState("");

  useEffect(() => {
    const getApiData = async () => {
      //undefined == first load, load Madrid by default 40.4167, long: -3.7033
      if (city === undefined || city === undefined) {
        const response = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=40.4167&longitude=-3.7033&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m,shortwave_radiation&daily=sunrise,sunset&timezone=Europe%2FLondon&start_date=${yearMonthDay}&end_date=${yearMonthDay}`
        );
        const data = (await response).json();
        return data;
      } else {
        //select item selected, city prop has lat & long data:
        const response = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.long}&current_weather=true&hourly=temperature_2m,weathercode,relativehumidity_2m,shortwave_radiation&daily=sunrise,sunset&timezone=Europe%2FLondon&start_date=${yearMonthDay}&end_date=${yearMonthDay}`
        );
        const data = (await response).json();
        return data;
      }
    };

    getApiData().then((data) => {
      setApiData(data);
    });
  }, [city]); //if the passed parameter changes, this will rerender it (check useEffect)

  const copyApiData = apiData;

  /**
 * 0	Clear sky
1, 2, 3	Mainly clear, partly cloudy, and overcast
45, 48	Fog and depositing rime fog
51, 53, 55	Drizzle: Light, moderate, and dense intensity
56, 57	Freezing Drizzle: Light and dense intensity
61, 63, 65	Rain: Slight, moderate and heavy intensity
66, 67	Freezing Rain: Light and heavy intensity
71, 73, 75	Snow fall: Slight, moderate, and heavy intensity
77	Snow grains
80, 81, 82	Rain showers: Slight, moderate, and violent
85, 86	Snow showers slight and heavy
95 *	Thunderstorm: Slight or moderate
96, 99 *	Thunderstorm with slight and heavy hail
 */

  function weatherCodeSwitch(code) {
    //console.log("code", code);

    switch (code) {
      case 0:
        //Clear sky
        return (
          <div>
            <WbSunnyIcon sx={{ fontSize: 300, color: "#FADA5E" }} />
          </div>
        );
        break;

      case 1:
      case 2:
      case 3:
        //Mainly clear, partly cloudy, and overcast
        return (
          <div>
            <WbCloudyIcon sx={{ fontSize: 300, color: "#6495ed" }} />
          </div>
        );
        break;
      case 45:
      case 48:
        return <LensBlurIcon sx={{ fontSize: 300, color: "#6495ed" }} />;
        break;
      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        //Rain: Slight, moderate and heavy intensity
        return (
          <div>
            <GrainIcon sx={{ fontSize: 300, color: "#6495ed" }} />
          </div>
        );
        break;

      case 71:
      case 73:
      case 75:
      case 77:
        //    71, 73, 75	Snow fall: Slight, moderate, and heavy intensity 77	Snow grain
        return (
          <div>
            <AcUnitIcon sx={{ fontSize: 300, color: "#6495ed" }} />
          </div>
        );
        break;

      case 95:
      case 96:
      case 99:
        //80, 81, 82	Rain showers: Slight, moderate, and violent
        return (
          <div>
            <ThunderstormIcon sx={{ fontSize: 300, color: "#6495ed" }} />
          </div>
        );
      default:
        break;
    }
  }

  return (
    <div className="container mt-5">
      <div className="row text-center">
        <h1 className="font-weight-bold pb-2">
          {
            //city prop ( if it's set/true)
            city ? city.city : "Madrid"
          }
        </h1>
      </div>
      <Typography variant="h3" component="h2">
        {copyApiData && ( //api call copy ( if it's set/true)
          <div className="container">
            <div className="row text-center">
              <span
                className="col-4"
                style={{
                  backgroundImage: `url('${sunrise}')`,
                  backgroundSize: "250px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom",
                  opacity: "1",
                  //backgroundColor: 'pink'
                }}
              >
                <span
                  className="col-4"
                  style={{
                    lineHeight: "10",
                    fontSize: "30px",
                  }}
                >
                  {copyApiData.daily.sunrise[0].split("T")[1]}
                </span>
              </span>
              <span className="col-4">
                {weatherCodeSwitch(copyApiData.current_weather.weathercode)}
              </span>
              <span
                className="col-4"
                style={{
                  backgroundImage: `url('${sunset}')`,
                  backgroundSize: "250px",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom",
                  opacity: "1",
                  //backgroundColor: 'pink'
                }}
              >
                <span
                  className="col-4"
                  style={{
                    lineHeight: "10",
                    fontSize: "30px",
                  }}
                >
                  {copyApiData.daily.sunset[0].split("T")[1]}
                </span>
              </span>
            </div>
            <div className="container">
              <div className="row text-center">
                <span className="col-4">
                  {copyApiData.current_weather.temperature} º C
                </span>
                <span className="col-4">
                  {getCardinalDirection(
                    copyApiData.current_weather.winddirection
                  )}
                </span>
                <span className="col-4">
                  {copyApiData.current_weather.windspeed} Km/h
                </span>
              </div>
            </div>
          </div>
        )}
      </Typography>
      <Typography variant="h4" component="h2" className="container mb-3 p-3">
        <div className="row text-center">
          <span className="col-4">Temperature</span>
          <span className="col-4">Wind direction</span>
          <span className="col-4">Wind speed</span>
        </div>
      </Typography>

      <WeatherTable apiData={copyApiData}></WeatherTable>
    </div>
  );
};

Weather.propTypes = {
  city: PropTypes.object,
};

export default Weather;
