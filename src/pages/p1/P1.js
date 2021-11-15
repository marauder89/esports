import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useSetRecoilState } from "recoil";

import { ChampionKillChart, GoldChart, LevelChart, SkillChart, TowerKillChart, WinPredictionChart, GameVodPopup, ImportanceFeaturesChart } from "../../components";
import { chartDataSelector } from "../../store";
import { LGA_1_1, LGA_1_2, LGA_1_3 } from "../../services";

const P1 = () => {
  const captureArea = useRef();
  const interval = useRef();
  const setChartData = useSetRecoilState(chartDataSelector);
  const [videoSource, setVideoSource] = useState({ src: null, type: "" });
  const [play, setPlay] = useState(false);
  const [model, setModel] = useState("Random Forest");

  const playEvent = useCallback(
    (e) => {
      if (e.type === "play") {
        setPlay(true);
      } else if (e.type === "pause") {
        setPlay(false);
      }
    },
    [setPlay]
  );

  const endedEvent = useCallback(() => {
    const getLGA_1_3 = async () => {
      await LGA_1_3({});
    };
    getLGA_1_3();
  }, []);

  useEffect(() => {
    const capture = captureArea.current;
    capture.addEventListener("play", playEvent, false);
    capture.addEventListener("pause", playEvent, false);
    capture.addEventListener("ended", endedEvent, false);

    interval.current = setInterval(() => {
      const canvas = document.createElement("canvas");
      canvas.width = capture.offsetWidth * 2;
      canvas.height = capture.offsetHeight * 2;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(capture, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL();
      canvas.remove();

      if (play) {
        const getLGA_1_2 = async () => {
          const params = {
            b64encoded: dataURL,
            index: Math.floor(capture.currentTime),
          };
          const _chartData = await LGA_1_2(params);
          setChartData(_chartData);
        };
        getLGA_1_2();
      }
    }, 5000);

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", playEvent, false);
      capture.removeEventListener("pause", playEvent, false);
      capture.removeEventListener("ended", endedEvent, false);
    };
  }, [play, playEvent, endedEvent, setChartData]);

  const onFileConfirmCallback = useCallback(
    (data) => {
      const selectFile = data.files[0];
      if (selectFile) {
        const blob = URL.createObjectURL(selectFile);
        setVideoSource({ src: blob, type: selectFile.type });
      }

      const getLGA_1_1 = async () => {
        const params = {
          source: data.value,
          model: model,
          options: {
            opA: true,
            opB: false,
            opC: true,
          },
        };
        await LGA_1_1(params);
      };
      getLGA_1_1();
    },
    [model]
  );

  const onChangeModel = useCallback((e) => {
    setModel(e.target.value);
  }, []);

  return (
    <Fragment>
      <GameVodPopup onFileConfirmCallback={onFileConfirmCallback} />
      <section className="bg_dark">
        <div className="container">
          <div className="row">
            <div className="col-md-6 vod">
              <div className="m-2">
                <div className="embed-responsive embed-responsive-16by9">
                  <video ref={captureArea} autoPlay={true} controls={true} width="100%" src={videoSource.src} type={videoSource.type} muted={true} />
                </div>
                <div className="control">
                  <button type="button" className="btn btn_blue" data-bs-toggle="modal" data-bs-target="#gameVodPop">
                    게임영상선택
                  </button>
                  <div className="form-check">
                    <label>
                      <input type="radio" name="model" defaultValue="Random Forest" onChange={onChangeModel} checked={model === "Random Forest"} /> Random Forest
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                      <input type="radio" name="model" defaultValue="Feed-Forward Neural Network" onChange={onChangeModel} checked={model === "Feed-Forward Neural Network"} /> Feed-Forward Neural
                      Network
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="m-2">
                <h2 className="title">⊙ 실시간 게임결과 예측</h2>
                <div className="chart">
                  <WinPredictionChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="charts">
        <div className="container">
          <div className="row equal-cols">
            <div className="col-md-5 m-1">
              <div className="p-4 rounded bg border">
                <h3 className="title">⊙ Total Gold</h3>
                <div className="chart">
                  <GoldChart />
                </div>
              </div>
            </div>
            <div className="col-md m-1">
              <div className="p-4 rounded bg border">
                <div className="chartBox" style={{ height: "40%" }}>
                  <h3 className="title">⊙ Total Champion Kill</h3>
                  <div className="chart">
                    <ChampionKillChart />
                  </div>
                </div>
                <hr className="line" />
                <div className="chartBox" style={{ height: "50%" }}>
                  <h3 className="title">⊙ Total Tower Kill</h3>
                  <div className="chart">
                    <TowerKillChart />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md m-1">
              <div className="p-4 rounded bg border">
                <div className="chartBox">
                  <h3 className="title">⊙ Total Level</h3>
                  <div className="chart">
                    <LevelChart />
                  </div>
                </div>
                <hr className="line" />
                <div className="chartBox">
                  <h3 className="title">⊙ Total Skill</h3>
                  <div className="chart">
                    <SkillChart />
                    <ImportanceFeaturesChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default P1;
