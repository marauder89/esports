import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons/constants";
import { chartDataState } from "../../store";

//실시간 게임 결과 예측
const WinPredictionChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).winPredictionData;
  const options = {
    chart: {
      type: "line",
      height: 370,
      backgroundColor: null,
      style: {
        width: "100%",
      },
    },
    title: {
      text: "",
    },
    credits: {
      enabled: false,
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "bottom",
      itemStyle: {
        color: "#B8B8B8",
        fontSize: "14px",
        fontWeight: 600,
      },
    },
    yAxis: {
      min: 0,
      max: 100,
      title: {
        text: "",
      },
      tickPositions: [0, 25, 50, 75, 100],
      labels: {
        style: {
          color: "#B8B8B8",
        },
      },
      gridLineWidth: 0.5,
    },
    series: [
      {
        name: "Blue",
        color: BLUE_HEX_CODE,
        data: chartData.map((data) => {
          return [data.dateTime, data.blue];
        }),
      },
      {
        name: "Purple",
        color: PURPLE_HEX_CODE,
        data: chartData.map((data) => {
          return [data.dateTime, data.purple];
        }),
      },
    ],
    xAxis: {
      type: "dateTime",
      min: moment(0).valueOf(),
      max: moment(0).add(15, "minute").valueOf(),
      tickInterval: moment(0).add(5, "minute").valueOf(),
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%M:%S", this.value);
        },
        style: {
          color: "#B8B8B8",
        },
      },
      gridLineWidth: 0.5,
      tickWidth: 0,
      lineWidth: 0,
    },
    tooltip: {
      formatter: function () {
        return moment(this.x).format("mm:ss");
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { WinPredictionChart };
