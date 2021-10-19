import { memo, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

//실시간 게임 결과 예측
const WinPredictionChart = memo(({ chartData }) => {
  console.log(chartData);

  const options = {
    // chart: {
    //   type: "bar",
    // },
    title: {
      text: "실시간 게임 결과 예측",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    // xAxis: {
    //   type: "category",
    // },
    // legend: {
    //   reversed: true,
    // },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "",
      },
    },
    series: [
      {
        name: "Blue",
        color: "#51a6f5",
        data: [62, 44, 56, 23, 42, 51, 66, 24],
      },
      {
        name: "Purple",
        color: "#f04fe2",
        data: [38, 56, 44, 68, 58, 49, 34, 76],
      },
    ],
    xAxis: {
      categories: ["05:00", "10:00", "15:00", "20:00", "25:00", "30:00", "35:00", "40:00"],
    },
  };
  return (
    <Fragment>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Fragment>
  );
});

export { WinPredictionChart };
