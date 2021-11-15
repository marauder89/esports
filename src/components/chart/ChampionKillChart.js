import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons";
import { chartDataState } from "../../store";

const ChampionKillChart = memo(() => {
  const chartData = useRecoilValue(chartDataState);
  const options = {
    chart: {
      type: "bar",
      height: 160,
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
      enabled: false,
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
        data: [chartData.championKillData.blue, 0],
      },
      {
        name: "Purple",
        color: PURPLE_HEX_CODE,
        data: [0, chartData.championKillData.purple],
      },
    ],
    xAxis: {
      categories: ["Blue", "Purple"],
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { ChampionKillChart };
