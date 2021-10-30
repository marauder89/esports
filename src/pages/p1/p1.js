import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useSetRecoilState } from "recoil";

import { ChampionKillChart, GoldChart, LevelChart, SkillChart, TowerKillChart, WinPredictionChart } from "../../components/index";
import { chartDataSelector } from "../../store/index";
import { LGA_1_1, LGA_1_2 } from "../../services/index";

const P1 = () => {
  const setChartData = useSetRecoilState(chartDataSelector);
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

          const _chartData = await LGA_1_2(params);
          setChartData(_chartData);
        };
        getChartData();
      }
    }, 5000);

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", videoPlayStateCallBack, false);
      capture.removeEventListener("pause", videoPlayStateCallBack, false);
    };
  }, [videoPlayState, videoPlayStateCallBack, setChartData]);

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
        await LGA_1_1(params);
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
        <WinPredictionChart />
      </div>
      <div style={{ width: "48%", float: "right" }}>
        <GoldChart />
        <ChampionKillChart />
        <TowerKillChart />
        <LevelChart />
        <SkillChart />
      </div>
    </Fragment>
  );
};

export default P1;
