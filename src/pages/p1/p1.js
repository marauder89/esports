import { useCallback, Fragment } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import { ChampionKillChart, GoldChart, LevelChart, SkillChart, TowerKillChart, WinPredictionChart, Streaming } from "../../components/index";
import { chartDataSelector } from "../../store/index";
import { LGA_1_1, LGA_1_2 } from "../../services/index";

import { playState } from "../../store";

const P1 = () => {
  const setChartData = useSetRecoilState(chartDataSelector);
  const play = useRecoilValue(playState);

  const onChangeCallback = useCallback((data) => {
    const init = async () => {
      const params = {
        source: data.path,
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
      <div style={{ width: "48%", float: "left" }}>
        <Streaming onChangeCallback={onChangeCallback} dataUrlCallback={dataUrlCallback} />
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
