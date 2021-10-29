import { memo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons/constants";

const TowerKillChart = memo(({ chartData }) => {
  const options = {
    chart: {
      height: 200,
      type: "bar",
    },
    title: {
      text: "Total Tower Kill",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    yAxis: {
      min: 0,
      // max: 100,
      title: {
        text: "",
      },
      // tickPositions: [0, 25, 50, 75, 100],
    },
    series: [
      {
        name: "Blue",
        color: BLUE_HEX_CODE,
        data: [chartData.blue, 0],
      },
      {
        name: "Purple",
        color: PURPLE_HEX_CODE,
        data: [0, chartData.purple],
      },
    ],
    xAxis: {
      categories: ["Blue", "Purple"],
      // min: moment(0).valueOf(),
      // max: moment(0).add(15, "minute").valueOf(),
      // tickInterval: moment(0).add(5, "minute").valueOf(),
      // labels: {
      //   formatter: function () {
      //     return Highcharts.dateFormat("%M:%S", this.value);
      //   },
      // },
    },
    tooltip: {
      // formatter: function () {
      //   return moment(this.x).format("mm:ss");
      // },
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { TowerKillChart };
