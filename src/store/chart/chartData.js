import { atom, selector } from "recoil";
import moment from "moment";

export const chartDataState = atom({
  key: "chartDataState",
  default: {
    winPredictionData: [],
    goldData: [],
    championKillData: { blue: 0, purple: 0 },
    towerKillData: { blue: 0, purple: 0 },
    levelData: { blue: [], purple: [] },
    skillData: { blue: [], purple: [] },
    importanceData: {},
  },
});

export const chartDataSelector = selector({
  key: "chartDataStateSelector",
  set: ({ get: getRecoilValue, set: setRecoilState }, newValue) => {
    const hour = Number(newValue.time_stamp.split(":")[0]);
    const minute = Number(newValue.time_stamp.split(":")[1]);
    const second = Number(newValue.time_stamp.split(":")[2]);

    let dateTime = moment(0);
    dateTime.add(hour, "hour").add(minute, "minute").add(second, "second");

    const chartData = {
      winPredictionData: [...getRecoilValue(chartDataState).winPredictionData, { blue: newValue.blue_win_prediction, purple: newValue.purple_win_prediction, dateTime: dateTime.valueOf() }],
      goldData: [...getRecoilValue(chartDataState).goldData, { blue: newValue.blue_total_gold, purple: newValue.purple_total_gold, dateTime: dateTime.valueOf() }],
      championKillData: { blue: newValue.blue_total_champion_kill, purple: newValue.purple_total_champion_kill },
      towerKillData: { blue: newValue.blue_total_tower_kill, purple: newValue.purple_total_tower_kill },
      levelData: {
        blue: [newValue.blue_level_top, newValue.blue_level_jungle, newValue.blue_level_middle, newValue.blue_level_bottom, newValue.blue_level_support],
        purple: [newValue.purple_level_top, newValue.purple_level_jungle, newValue.purple_level_middle, newValue.purple_level_bottom, newValue.purple_level_support],
      },
      skillData: {
        blue: [newValue.blue_skill_top, newValue.blue_skill_jungle, newValue.blue_skill_middle, newValue.blue_skill_bottom, newValue.blue_skill_support],
        purple: [newValue.purple_skill_top, newValue.purple_skill_jungle, newValue.purple_skill_middle, newValue.purple_skill_bottom, newValue.purple_skill_support],
      },
      importanceData: newValue.importance_features,
    };

    setRecoilState(chartDataState, chartData);
  },
  get: ({ get }) => {
    return get(chartDataState);
  },
});
