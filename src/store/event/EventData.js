import { atom, selector } from "recoil";

export const eventDataState = atom({
  key: "eventDataState",
  default: [],
});

export const eventDataSelector = selector({
  key: "eventDataSelector",
  set: ({ get: getRecoilValue, set: setRecoilState }, newValue) => {
    setRecoilState(eventDataState, [...getRecoilValue(eventDataState), newValue]);
  },
  get: ({ get }) => {
    return get(eventDataState);
  },
});
