import { atom, selector } from "recoil";

export const eventListState = atom({
  key: "eventListState",
  default: [],
});

export const eventListSelector = selector({
  key: "eventListSelector",
  set: ({ get: getRecoilValue, set: setRecoilState }, newValue) => {
    setRecoilState(eventListState, [...getRecoilValue(eventListState), newValue]);
  },
  get: ({ get }) => {
    return get(eventListState);
  },
});
