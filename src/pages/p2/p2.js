import { useRef, useEffect, useState, useCallback, useReducer, Fragment } from "react";
import moment from "moment";

import { IER_1_1, IER_1_2 } from "../../services/index";
import { chartModel } from "../../store/index";

// import { WinPredictionChart } from "./winPredictionChart";
// import { GoldChart } from "./goldChart";
// import { ChampionKillChart } from "./championKillChart";
// import { TowerKillChart } from "./towerKillChart";
// import { LevelChart } from "./levelChart";
// import { SkillChart } from "./skillChart";

const reducer = (state, newState) => ({ ...state, ...newState });

const P2 = () => {
  // const [chartData, setChartData] = useReducer(reducer, chartModel);
  const [videoSource, setVideoSource] = useState({ src: null, type: "" });
  const [base64, setBase64] = useState("");
  const [videoPlayState, setVideoPlayState] = useState(false);

  const interval = useRef();
  const captureArea = useRef();

  const videoPlayStateCallBack = useCallback((e) => {
    if (e.type === "play") {
      setVideoPlayState(true);
    } else {
      setVideoPlayState(false);
    }
  }, []);

  useEffect(() => {
    const capture = captureArea.current;
    capture.addEventListener("play", videoPlayStateCallBack, false);
    capture.addEventListener("pause", videoPlayStateCallBack, false);

    interval.current = setInterval(() => {
      if (videoPlayState) {
        const canvas = document.createElement("canvas");
        canvas.width = capture.width * 2;
        canvas.height = capture.height * 2;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(capture, 0, 0, canvas.width, canvas.height);

        const dataURL = canvas.toDataURL();
        setBase64(dataURL);
        canvas.remove();

        const getChartData = async () => {
          const params = {
            b64encoded: dataURL,
            index: Math.floor(capture.currentTime),
          };

          const data = await IER_1_2(params);

          // const hour = Number(_chartData.time_stamp.split(":")[0]);
          // const minute = Number(_chartData.time_stamp.split(":")[1]);
          // const second = Number(_chartData.time_stamp.split(":")[2]);

          // let dateTime = moment(0);
          // dateTime.add(hour, "hour").add(minute, "minute").add(second, "second");
          // //blue_total_champion_kill
          // setChartData({
          //   winPredictionData: [...chartData.winPredictionData, { blue: _chartData.blue_win_prediction, purple: _chartData.purple_win_prediction, dateTime: dateTime.valueOf() }],
          //   goldData: [...chartData.goldData, { blue: _chartData.blue_total_gold, purple: _chartData.purple_total_gold, dateTime: dateTime.valueOf() }],
          //   championKillData: { blue: _chartData.blue_total_champion_kill, purple: _chartData.purple_total_champion_kill },
          //   towerKillData: { blue: _chartData.blue_total_tower_kill, purple: _chartData.purple_total_tower_kill },
          //   levelData: {
          //     blue: [_chartData.blue_level_top, _chartData.blue_level_jungle, _chartData.blue_level_middle, _chartData.blue_level_bottom, _chartData.blue_level_support],
          //     purple: [_chartData.purple_level_top, _chartData.purple_level_jungle, _chartData.purple_level_middle, _chartData.purple_level_bottom, _chartData.purple_level_support],
          //   },
          //   skillData: {
          //     blue: [_chartData.blue_skill_top, _chartData.blue_skill_jungle, _chartData.blue_skill_middle, _chartData.blue_skill_bottom, _chartData.blue_skill_support],
          //     purple: [_chartData.purple_skill_top, _chartData.purple_skill_jungle, _chartData.purple_skill_middle, _chartData.purple_skill_bottom, _chartData.purple_skill_support],
          //   },
          // });
        };
        getChartData();
      }
    }, 5000);

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", videoPlayStateCallBack, false);
      capture.removeEventListener("pause", videoPlayStateCallBack, false);
    };
  }, [videoPlayState, videoPlayStateCallBack]);

  const onChange = useCallback((e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      const blob = URL.createObjectURL(selectFile);
      setVideoSource({ src: blob, type: selectFile.type });

      const init = async () => {
        const params = {
          source: "C:\\users\\downloads\\",
          model: "Random Forest",
          options: {
            opA: true,
            opB: false,
            opC: true,
          },
        };
        await IER_1_1(params);
      };
      init();
    }
  }, []);

  return (
    <Fragment>
      <div style={{ width: "48%", float: "left" }}>
        <img src={base64} height="45" width="80" alt="" />
        <br />
        <video ref={captureArea} autoPlay={true} controls={true} height="450" width="800" src={videoSource.src} type={videoSource.type} muted={true} />

        <input type="file" onChange={onChange} />
      </div>
      <div style={{ width: "48%", float: "right" }}></div>
    </Fragment>
  );
};

export default P2;
