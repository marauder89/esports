import { memo } from "react";
import { useRecoilValue } from "recoil";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { BLUE_HEX_CODE, PURPLE_HEX_CODE } from "../../commons";
import { chartDataState } from "../../store";

const SkillChart = memo(() => {
  const chartData = useRecoilValue(chartDataState).skillData;
  const options = {
    chart: {
      type: "column",
      height: 90,
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
    },
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
});

export { SkillChart };
