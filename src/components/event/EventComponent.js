import { memo, Fragment } from "react";
import PropTypes from "prop-types";

import { TeamFight } from "../";

const EventComponent = memo(({ eventData }) => {
  let render = <></>;

  if (eventData) {
    switch (eventData.event_type) {
      case "buy_item":
        render = (
          <div className="detailBox p-3">
            <p>
              <span className="time">{eventData.time_stamp}</span> <span className="desc">Buy Item</span>
            </p>
            <div className="itemList">
              <div className="buyChamp teamBlue">
                <h5 className="posTitle">구매 챔피언</h5>
                <img src={`img/champion/${eventData.event_structure.buyer}.png`} style={{ width: "120px" }} alt={eventData.event_structure.buyer} />
              </div>
              <div className="itemG teamPurple">
                <h5 className="posTitle">아이템</h5>
                <img src={`img/item/${eventData.event_structure.item}.png`} style={{ width: "120px" }} alt={eventData.event_structure.item} />
              </div>
            </div>
          </div>
        );
        break;
      case "kill_building":
        render = (
          <div className="detailBox p-3">
            <p>
              <span className="time">{eventData.time_stamp}</span> <span className="desc">Kill Building</span>
            </p>
            <div className="teamList">
              <div className="champLeader">
                <div className="leader1 teamBlue">
                  <h5 className="posTitle">챔피언</h5>
                  <img src={`img/champion/${eventData.event_structure.killer}.png`} style={{ width: "120px" }} alt={eventData.killer} />
                </div>
                <div className="leader2 teamPurple">
                  <h5 className="posTitle">포탑</h5>
                  <img src={`img/tower/${eventData.event_structure.victim}.png`} style={{ width: "120px" }} alt={eventData.victim} />
                </div>
              </div>
              <div className="assistList mt-5">
                <h5 className="posTitle">어이스트 챔피언</h5>
                <ul>
                  {eventData &&
                    eventData.event_structure.assists.map((champion, index) => {
                      return (
                        <li key={index}>
                          <img src={`img/champion/${champion}.png`} style={{ width: "120px" }} alt={champion} />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      case "kill_champion":
        render = (
          <div className="detailBox p-3">
            <p>
              <span className="time">{eventData.time_stamp}</span> <span className="desc">Kill Champion</span>
            </p>
            <div className="teamList">
              <div className="champLeader">
                <div className="leader1 teamBlue">
                  <h5 className="posTitle">킬 챔피언</h5>
                  <img src={`img/champion/${eventData.event_structure.killer}.png`} style={{ width: "120px" }} alt={eventData.killer} />
                </div>
                <div className="leader2 teamPurple">
                  <h5 className="posTitle">데스 챔피언</h5>
                  <img src={`img/champion/${eventData.event_structure.victim}.png`} style={{ width: "120px" }} alt={eventData.victim} />
                </div>
              </div>
              <div className="assistList mt-5">
                <h5 className="posTitle">어이스트 챔피언</h5>
                <ul>
                  {eventData &&
                    eventData.event_structure.assists.map((champion, index) => {
                      return (
                        <li key={index}>
                          <img src={`img/champion/${champion}.png`} style={{ width: "120px" }} alt={champion} />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      case "kill_object":
        render = (
          <div className="detailBox p-3">
            <p>
              <span className="time">{eventData.time_stamp}</span> <span className="desc">Kill Object</span>
            </p>
            <div className="teamList">
              <div className="champLeader">
                <div className="leader1 teamBlue">
                  <h5 className="posTitle">챔피언</h5>
                  <img src={`img/champion/${eventData.event_structure.killer}.png`} style={{ width: "120px" }} alt={eventData.killer} />
                </div>
                <div className="leader2 teamPurple">
                  <h5 className="posTitle">오브젝트</h5>
                  <img src={`img/object/${eventData.event_structure.victim}.png`} style={{ width: "120px" }} alt={eventData.victim} />
                </div>
              </div>
              <div className="assistList mt-5">
                <h5 className="posTitle">어이스트 챔피언</h5>
                <ul>
                  {eventData &&
                    eventData.event_structure.assists.map((champion, index) => {
                      return (
                        <li key={index}>
                          <img src={`img/champion/${champion}.png`} style={{ width: "120px" }} alt={champion} />
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        );
        break;
      case "team_fight":
        render = <TeamFight eventData={eventData} />;
        break;
      default:
        render = <></>;
        break;
    }
  }
  return <Fragment>{render}</Fragment>;
});

EventComponent.propTypes = {
  eventData: PropTypes.object.isRequired,
};

export { EventComponent };
