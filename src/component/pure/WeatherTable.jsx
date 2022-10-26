import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit"; //snowflake
import LensBlurIcon from "@mui/icons-material/LensBlur"; //fog
import GrainIcon from "@mui/icons-material/Grain"; //rain

const WeatherTable = ({ apiData }) => {
  const [data, setData] = useState({});
  const [col, setCol] = useState([]);
  const [row, setRow] = useState([]);

  const theme = createTheme({
    components: {
      MuiDataGrid: {
        styleOverrides: {
          root: {
            // Some CSS
            //backgroundColor: "blue",
            fontSize: "21px",
          },
        },
      },
    },
  });

  function weatherCodeSwitch(code) {
    switch (code) {
      case 0:
        //Clear sky
        return <WbSunnyIcon sx={{ fontSize: 50, color: "#FADA5E" }} />;
        break;

      case 1:
      case 2:
      case 3:
        //Mainly clear, partly cloudy, and overcast
        return <WbCloudyIcon sx={{ fontSize: 50, color: "#6495ed" }} />;
        break;

      case 45:
      case 48:
        return <LensBlurIcon sx={{ fontSize: 50, color: "#6495ed" }} />;
        break;

      case 61:
      case 63:
      case 65:
      case 80:
      case 81:
      case 82:
        //Rain: Slight, moderate and heavy intensity
        return <GrainIcon sx={{ fontSize: 50, color: "#6495ed" }} />;
        //return 'Rainy'
        break;

      case 71:
      case 73:
      case 75:
      case 77:
        //    71, 73, 75	Snow fall: Slight, moderate, and heavy intensity 77	Snow grain
        return <AcUnitIcon sx={{ fontSize: 50, color: "#6495ed" }} />;

        break;

      case 95:
      case 96:
      case 99:
        //80, 81, 82	Rain showers: Slight, moderate, and violent
        return <ThunderstormIcon sx={{ fontSize: 50, color: "#6495ed" }} />;

      default:
        break;
    }
  }

  function changeTemperatureColor(value) {
    //switch de momento no funciona, if else sí

    /*    switch (value) {
      case (value > 20):
        return "hot";
        break;

      case (value < 20):
        return "cold";
        break;

       case value >= 15 && value <= 30:
        return "normal";
        break;

      case value >= 15 && value >= 30:
        return "hot";
        break;

      case value >= 35 && value <= 35:
        return "veryHot";
        break; 

      default:
        console.log("aaaa", value);
        break;
    } */

    if (value <= 5) {
      return "veryCold";
    } else if (value > 5 && value < 20) {
      return "cold";
    } else if (value >= 20 && value <= 30) {
      return "normal";
    } else if (value >= 30 && value <=36) {
      return "hot";
    } else if (value >= 37) {
      return "veryHot";
    }
  }

  useEffect(() => {
    try {
      // console.log(apiData);

      if (Object.keys(apiData).length !== 0) {
        const copyApiData = apiData;
        setData(copyApiData);
        const datos = data.hourly;
        const nu = [];
        if (datos !== undefined) {
          for (let i = 0; i < datos.time.length; i++) {
            if (datos.weathercode[i]) {
              const imageWeathercode = datos.weathercode[i];

              nu.push({
                id: i,
                time: datos.time[i].split("T")[1], //.split("T")[0];
                humidity: datos.relativehumidity_2m[i] + " %",
                temp: datos.temperature_2m[i] + " ºC",
                weathercode: imageWeathercode, //datos.weathercode[i],
                radiation: datos.shortwave_radiation[i] + " W/m²",
              });
            }
          }
        }
        const columns = [
          //{ field: "id", headerName: "ID", width: 250 },
          {
            field: "time",
            headerName: "Time",
            width: 200,
            headerAlign: "center", //header
            align: "center", //cell content
          },
          {
            field: "weathercode",
            headerName: "Weather code",
            width: 250,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => {
              //image rendering
              // console.log("imageWeathercode", params.row.weathercode);
              return weatherCodeSwitch(params.row.weathercode);
            },
          },
          {
            field: "temp",
            headerName: "Temperature",
            width: 300,
            headerAlign: "center",
            align: "center",
          },

          {
            field: "humidity",
            headerName: "Relative humidity",
            width: 250,
            headerAlign: "center",
            align: "center",
          },
          {
            field: "radiation",
            headerName: "Sun's shortwave radiation",
            width: 150,
            headerAlign: "center",
            align: "center",
          },
        ];

        const rows = nu;

        setCol(columns);
        setRow(rows);
      } else {
        setData({});
      }
    } catch (error) {
      console.error(error);
    }
  }, [apiData, data.hourly, data]);

  return (
    <div style={{ height: "1690px" }}>
      {apiData === undefined ? (
        <p>loading</p>
      ) : (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            "& .veryCold": {
              fontWeight: "bold",
              color: "#1a3e72",
            },
            "& .cold": {
              fontWeight: "bold",
              color: "#1a3e72",
            },
            "& .normal": {
              fontWeight: "bold",
              color: "#13852f",
            },
            "& .hot": {
              fontWeight: "bold",
              color: "#be6506",
            },
            "& .veryHot": {
              fontWeight: "bold",
              color: "tomato",
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={row}
              columns={col}
              rowsPerPageOptions={[25]}
              density={"comfortable"}
              hideFooter
              getCellClassName={(params) => {
                console.log(params);
                if (params.field === "weathercode" || params.value === null) {
                  return "";
                }

                if (params.field === "temp" || params.value === null) {
                  //return params.value >= 15 ? "hot" : "cold";
                  return changeTemperatureColor(
                    parseFloat(params.value.replace(" ºC", ""))
                  );
                }
              }}
            />
          </ThemeProvider>
        </Box>
      )}
    </div>
  );
};

export default WeatherTable;
