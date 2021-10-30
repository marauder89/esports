import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons/constants";
import { chartDataState } from "../../model";

const GoldChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).goldData;
  const options = {
    chart: {
      height: 200,
      type: "line",
    },
    title: {
      text: "Total Gold",
      align: "left",
    },
    credits: {
      enabled: false,
    },
    legend: {
      layout: "horizontal",
      align: "right",
      verticalAlign: "top",
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
      },
    },
    tooltip: {
      formatter: function () {
        return moment(this.x).format("mm:ss");
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { GoldChart };
