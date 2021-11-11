import { useRef, useEffect, useState, useCallback, Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { GameVodPopup, EventComponent, TimeLine } from "../../components";
import { eventListState, eventListSelector } from "../../store";
import { IER_1_1, IER_1_2, IER_1_3 } from "../../services";

const P2 = () => {
  const timeLineArea = useRef();
  const captureArea = useRef();
  const interval = useRef();
  const setEventList = useSetRecoilState(eventListSelector);
  const eventList = useRecoilValue(eventListState);
  const [videoSource, setVideoSource] = useState({ src: null, type: "" });
  const [play, setPlay] = useState(false);
  const [model, setModel] = useState("Random Forest");
  const [eventData, setEventData] = useState({});

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
          setEventList(_eventData);
        };
        getIER_1_2();
      }
    }, 5000);

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", playEvent, false);
      capture.removeEventListener("pause", playEvent, false);
      capture.removeEventListener("ended", endedEvent, false);
    };
  }, [play, playEvent, endedEvent, setEventList]);

  useEffect(() => {
    if (timeLineArea.current) {
      timeLineArea.current.scrollTop = timeLineArea.current.scrollHeight;
    }
  }, [eventList]);

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

  const onClickCallback = useCallback((data) => {
    setEventData(data);
  }, []);

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
                          <TimeLine eventList={eventList} onClickCallback={onClickCallback} />
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
                <EventComponent eventData={eventData} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default P2;
