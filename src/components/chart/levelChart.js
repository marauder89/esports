import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons/constants";
import { chartDataState } from "../../model";

const LevelChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).levelData;
  const options = {
    chart: {
      height: 200,
      type: "column",
    },
    title: {
      text: "Total Level",
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
      max: 20,
      title: {
        text: "",
      },
      tickPositions: [0, 5, 10, 15, 20],
    },
    series: [
      {
        name: "Blue",
        color: BLUE_HEX_CODE,
        data: [...chartData.blue],
      },
      {
        name: "Purple",
        color: PURPLE_HEX_CODE,
        data: [...chartData.purple],
      },
    ],
    xAxis: {
      categories: ["Top", "Jungle", "Middle", "Bottom", "Support"],
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
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { LevelChart };
