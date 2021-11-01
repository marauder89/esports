import { atom, selector } from "recoil";
import { BuyItemEvent, KillBuildingEvent, KillChampionEvent, KillObjectEvent, TeamFightEvent } from "../../components";

export const eventComponentState = atom({
  key: "eventComponentState",
  default: <></>,
});

export const eventComponentSelector = selector({
  key: "eventComponentSelector",
  set: ({ set }, newValue) => {
    switch (newValue.event_type) {
      case "buy_item":
        set(eventComponentState, <BuyItemEvent eventStructure={newValue.event_structure} />);
        break;
      case "kill_building":
        set(eventComponentState, <KillBuildingEvent eventStructure={newValue.event_structure} />);
        break;
      case "kill_champion":
        set(eventComponentState, <KillChampionEvent eventStructure={newValue.event_structure} />);
        break;
      case "kill_object":
        set(eventComponentState, <KillObjectEvent eventStructure={newValue.event_structure} />);
        break;
      case "team_fight":
        set(eventComponentState, <TeamFightEvent eventStructure={newValue.event_structure} />);
        break;
      default:
        set(eventComponentState, <></>);
    }
  },
  get: ({ get }) => {
    return get(eventComponentState);
  },
});
