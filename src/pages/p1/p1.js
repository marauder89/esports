import { useRef, useEffect, useState, useCallback, useReducer } from "react";
import { LGA_1_1, LGA_1_2 } from "../../services/index";
import { chartModel } from "../../model/index";
import { WinPredictionChart } from "./chart";

const reducer = (state, newState) => ({ ...state, ...newState });

const P1 = () => {
  const [chartData, setChartData] = useReducer(reducer, chartModel);
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
          setChartData({ winPredictionData: { blue: _chartData.blue_win_prediction, purple: _chartData.purple_win_prediction } });
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

      const execute = async () => {
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
      execute();
    }
  }, []);

  return (
    <div style={{ width: "50%" }}>
      <img src={base64} height="45" width="80" alt="" />
      <br />
      <video ref={captureArea} autoPlay={true} controls={true} height="450" width="800" src={videoSource.src} type={videoSource.type} muted={true} />

      <input type="file" onChange={onChange} />
      <WinPredictionChart chartData={chartData.winPredictionData}></WinPredictionChart>
    </div>
  );
};

export default P1;
