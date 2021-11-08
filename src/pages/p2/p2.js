import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GameVodPopup } from "../../components";
import { eventDataState, eventDataSelector } from "../../store";
import { IER_1_1, IER_1_2, IER_1_3 } from "../../services";

const P2 = () => {
  const timeLineArea = useRef();
  const captureArea = useRef();
  const interval = useRef();
  const setEventData = useSetRecoilState(eventDataSelector);
  const eventData = useRecoilValue(eventDataState);
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
    const getIER_1_3 = async () => {
      await IER_1_3({});
    };
    getIER_1_3();
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
        const getIER_1_2 = async () => {
          const params = {
            b64encoded: dataURL,
            index: Math.floor(capture.currentTime),
          };
          const _eventData = await IER_1_2(params);
          setEventData(_eventData);
        };
        getIER_1_2();
      }
    }, 5000);

    if (timeLineArea.current) {
      timeLineArea.current.scrollTop = timeLineArea.current.scrollHeight;
    }

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", playEvent, false);
      capture.removeEventListener("pause", playEvent, false);
      capture.removeEventListener("ended", endedEvent, false);
    };
  }, [play, playEvent, endedEvent, setEventData]);

  const onFileConfirmCallback = useCallback(
    (data) => {
      const selectFile = data.files[0];
      if (selectFile) {
        const blob = URL.createObjectURL(selectFile);
        setVideoSource({ src: blob, type: selectFile.type });
      }

      const getIER_1_1 = async () => {
        const params = {
          source: data.value,
          model: model,
          options: {
            opA: true,
            opB: false,
            opC: true,
          },
        };
        await IER_1_1(params);
      };
      getIER_1_1();
    },
    [model]
  );

  const onChangeModel = useCallback((e) => {
    setModel(e.target.value);
  }, []);

  const timeLine = useCallback(() => {
    return eventData.map((data, index) => {
      switch (data.event_type) {
        case "buy_item":
          return (
            <li className="event" data-date={data.time_stamp} key={index}>
              <button type="button" className="btn btn_sky">
                Buy Item
              </button>
            </li>
          );
        case "kill_building":
          return (
            <li className="event" data-date={data.time_stamp} key={index}>
              <button type="button" className="btn btn_sky">
                Kill Building
              </button>
            </li>
          );
        case "kill_champion":
          return (
            <li className="event" data-date={data.time_stamp} key={index}>
              <button type="button" className="btn btn_sky">
                Kill Champion
              </button>
            </li>
          );
        case "kill_object":
          return (
            <li className="event" data-date={data.time_stamp} key={index}>
              <button type="button" className="btn btn_sky">
                Kill Object
              </button>
            </li>
          );
        case "team_fight":
          return (
            <li className="event" data-date={data.time_stamp} key={index}>
              <button type="button" className="btn btn_sky">
                Team Fight
              </button>
            </li>
          );
        default:
          return <li key={index}></li>;
      }
    });
  }, [eventData]);

  return (
    <Fragment>
      <GameVodPopup onFileConfirmCallback={onFileConfirmCallback} />
      <section>
        <div className="container p-0">
          <div className="row equal-cols">
            <div className="col-md-6">
              <div className="row" style={{ maxHeight: "500px" }}>
                <div className="col-md-12 vod bg_dark">
                  <div className="p-2 mx-0">
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
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 px-0">
                  <div className="card mt-3 rounded bg border p-3">
                    <div className="card-body">
                      <div ref={timeLineArea} className="scrollBar">
                        <ul className="timeline">
                          {timeLine()}
                          {/* <li className="event" data-date="5:50">
                            <button type="button" className="btn btn_sky on">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" id="event2" data-date="6:05">
                            <button type="button" className="btn btn_yellow">
                              블루팀 퍼스트킬
                            </button>
                            <button type="button" className="btn btn_sky">
                              블루팀 퍼스트킬
                            </button>
                          </li>
                          <li className="event" id="event3" data-date="6:25">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" data-date="6:50">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" data-date="7:10">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" data-date="7:10">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" data-date="7:10">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li>
                          <li className="event" data-date="7:10">
                            <button type="button" className="btn btn_sky">
                              Team Fight
                            </button>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="details" className="col-md-6">
              <div className="m-3 p-4 rounded bg border">
                <h4 className="title">⊙ 상세보기</h4>
                <hr />
                <div className="detailBox p-3" id="detail1">
                  <p>
                    <span className="time">00:50</span> <span className="desc">퍼플팀 : 아이템 구입</span>
                  </p>
                  <div className="miniMap">
                    <div className="teamFight">
                      <img src="images/fightCircle.png" />
                    </div>
                    <div className="miniMapBg" />
                    <img src="images/miniMap.jpg" />
                  </div>
                </div>
              </div>
              <div className="detailBox p-3" id="detail2">
                <p>
                  <span className="time">00:50</span> <span className="desc">블루팀 : 퍼스트킬</span>
                </p>
                <div className="teamList">
                  <div className="champLeader">
                    <div className="leader1 teamBlue">
                      <h5 className="posTitle">킬 챔피언</h5>
                      <img src="images/leader1.jpg" />
                    </div>
                    <div className="leader2 teamPurple">
                      <h5 className="posTitle">데스 챔피언</h5>
                      <img src="images/leader2.jpg" />
                    </div>
                  </div>
                  <div className="assistList mt-5">
                    <h5 className="posTitle">어이스트 챔피언</h5>
                    <ul>
                      <li>
                        <img src="images/assist1.jpg" />
                      </li>
                      <li>
                        <img src="images/assist2.jpg" />
                      </li>
                      <li>
                        <img src="images/assist3.jpg" />
                      </li>
                      <li>
                        <img src="images/assist4.jpg" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="detailBox p-3" id="detail3">
                <p>
                  <span className="time">00:50</span> <span className="desc">퍼플팀 : 아이템 구입</span>
                </p>
                <div className="itemList">
                  <div className="buyChamp teamBlue">
                    <h5 className="posTitle">구매 챔피언</h5>
                    <img src="images/itemChamp.jpg" />
                  </div>
                  <div className="itemG teamPurple">
                    <h5 className="posTitle">아이템</h5>
                    <img src="images/itemChamp.jpg" />
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

export default P2;
