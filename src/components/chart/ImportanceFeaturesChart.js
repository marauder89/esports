import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { chartDataState } from "../../store";

const ImportanceFeaturesChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).importanceData;
  const options = {
    chart: {
      type: "pie",
      height: 150,
      style: {
        width: "100%",
      },
    },
    title: {
      text: "Importance<br />features",
      align: "left",
      floating: true,
      style: {
        fontSize: "15px",
        fontWeight: 300,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        data: Object.keys(chartData).map((key) => {
          return {
            name: key,
            y: chartData[key],
            dataLabels: {
              distance: 10,
              connectorShape: "crookedLine",
              crookDistance: "90%",
            },
          };
        }),
      },
    ],
    tooltip: {
      pointFormat: "{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        center: [190, 55],
        dataLabels: {
          enabled: true,
          style: {
            textOverflow: "clip",
            fontSize: "11px",
            fontWeight: 500,
          },
        },
      },
      series: {
        states: {
          hover: {
            halo: null,
          },
        },
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { ImportanceFeaturesChart };
