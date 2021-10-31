import { atom, selector } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const playSelector = selector({
  key: "playSelector",
  set: ({ set }, newValue) => {
    set(playState, newValue);
  },
  get: ({ get }) => {
    return get(playState);
  },
});
