import { memo, useState, useEffect, useCallback, createRef, Fragment } from "react";
import PropTypes from "prop-types";

const TimeLine = memo(({ eventList, onClickCallback }) => {
  const [eventRefs, setEventRefs] = useState([]);
  const eventLength = eventList.length;

  useEffect(() => {
    setEventRefs((eventRefs) =>
      Array(eventLength)
        .fill()
        .map((_, i) => eventRefs[i] || createRef())
    );
  }, [eventLength]);

  useEffect(() => {
    if (eventRefs.length > 0) {
      eventRefs.forEach((event) => {
        event.current.classList.remove("on");
      });

      eventRefs[eventRefs.length - 1].current.classList.add("on");
      onClickCallback(eventList[eventRefs.length - 1]);
    }
  }, [eventRefs, eventList, onClickCallback]);

  const onEventClick = useCallback(
    (ref) => {
      eventRefs.forEach((event) => {
        event.current.classList.remove("on");
      });
      ref.current.classList.add("on");
    },
    [eventRefs]
  );

  return (
    <Fragment>
      {eventList.map((data, index) => {
        switch (data.event_type) {
          case "buy_item":
            return (
              <li className="event" data-date={data.time_stamp} key={index}>
                <button
                  ref={eventRefs[index]}
                  type="button"
                  className="btn btn_sky"
                  onClick={() => {
                    onClickCallback(data);
                    onEventClick(eventRefs[index]);
                  }}
                >
                  Buy Item
                </button>
              </li>
            );
          case "kill_building":
            return (
              <li className="event" data-date={data.time_stamp} key={index}>
                <button
                  ref={eventRefs[index]}
                  type="button"
                  className="btn btn_sky"
                  onClick={() => {
                    onClickCallback(data);
                    onEventClick(eventRefs[index]);
                  }}
                >
                  Kill Building
                </button>
              </li>
            );
          case "kill_champion":
            return (
              <li className="event" data-date={data.time_stamp} key={index}>
                <button
                  ref={eventRefs[index]}
                  type="button"
                  className="btn btn_sky"
                  onClick={() => {
                    onClickCallback(data);
                    onEventClick(eventRefs[index]);
                  }}
                >
                  Kill Champion
                </button>
              </li>
            );
          case "kill_object":
            return (
              <li className="event" data-date={data.time_stamp} key={index}>
                <button
                  ref={eventRefs[index]}
                  type="button"
                  className="btn btn_sky"
                  onClick={() => {
                    onClickCallback(data);
                    onEventClick(eventRefs[index]);
                  }}
                >
                  Kill Object
                </button>
              </li>
            );
          case "team_fight":
            return (
              <li className="event" data-date={data.time_stamp} key={index}>
                <button
                  ref={eventRefs[index]}
                  type="button"
                  className="btn btn_sky"
                  onClick={() => {
                    onClickCallback(data);
                    onEventClick(eventRefs[index]);
                  }}
                >
                  Team Fight
                </button>
              </li>
            );
          default:
            return <li ref={eventRefs[index]} key={index}></li>;
        }
      })}
    </Fragment>
  );
});

TimeLine.propTypes = {
  eventList: PropTypes.array.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};

export { TimeLine };
