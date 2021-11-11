import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons/constants";
import { chartDataState } from "../../store";

const GoldChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).goldData;
  const options = {
    chart: {
      type: "line",
      style: {
        margin: "0 auto",
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
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
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
      // max: moment(0).add(15, "minute").valueOf(),
      tickInterval: moment(0).add(5, "minute").valueOf(),
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%M:%S", this.value);
        },
      },
      tickWidth: 0,
      lineWidth: 0,
    },
    tooltip: {
      formatter: function () {
        return moment(this.x).format("mm:ss");
      },
    },
  };
  return <HighchartsReact displayName="center-align-chart" highcharts={Highcharts} options={options} />;
});

export { GoldChart };
