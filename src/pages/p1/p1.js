import { useState, useCallback, Fragment } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { ChampionKillChart, GoldChart, LevelChart, SkillChart, TowerKillChart, WinPredictionChart, Streaming, GameVodPopup, ImportanceFeaturesChart } from "../../components";
import { chartDataSelector, playState } from "../../store";
import { LGA_1_1, LGA_1_2 } from "../../services";

const P1 = () => {
  const setChartData = useSetRecoilState(chartDataSelector);
  const play = useRecoilValue(playState);
  const [videoSource, setVideoSource] = useState({ src: null, type: "" });

  const onFileConfirmCallback = useCallback((data) => {
    const selectFile = data.files[0];
    if (selectFile) {
      const blob = URL.createObjectURL(selectFile);
      setVideoSource({ src: blob, type: selectFile.type });
    }

    const getLGA_1_1 = async () => {
      const params = {
        source: data.value,
        model: "Random Forest",
        options: {
          opA: true,
          opB: false,
          opC: true,
        },
      };
      await LGA_1_1(params);
    };
    getLGA_1_1();
  }, []);

  const dataUrlCallback = useCallback(
    (data) => {
      if (play) {
        const getChartData = async () => {
          const params = {
            b64encoded: data.b64encoded,
            index: data.index,
          };
          const _chartData = await LGA_1_2(params);
          setChartData(_chartData);
        };
        getChartData();
      }
    },
    [play, setChartData]
  );

  return (
    <Fragment>
      <GameVodPopup onFileConfirmCallback={onFileConfirmCallback} />
      <section className="bg_dark">
        <div className="container">
          <div className="row">
            <div className="col-md-6 vod">
              <div className="m-2">
                <div className="embed-responsive embed-responsive-16by9">
                  {/* <video src-="images/vod.mp4" width="100%" controls autoplay></video> */}
                  <Streaming dataUrlCallback={dataUrlCallback} videoSource={videoSource} />
                </div>
                <div className="control">
                  <button type="button" className="btn btn_blue" data-bs-toggle="modal" data-bs-target="#gameVodPop">
                    게임영상선택
                  </button>
                  <div className="form-check">
                    <label>
                      <input type="radio" name="radiobutoon" defaultValue="YES" defaultChecked /> Random Forest
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                      <input type="radio" name="radiobutoon" defaultValue="NO" /> Feed-Forward Neural Network
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
