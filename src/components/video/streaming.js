import { useRef, useEffect, useCallback, Fragment, memo } from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";

import { playSelector } from "../../store";

const Streaming = memo(({ dataUrlCallback, videoSource }) => {
  const captureArea = useRef();
  const interval = useRef();
  const setPlayState = useSetRecoilState(playSelector);

  const videoPlayStateCallBack = useCallback(
    (e) => {
      if (e.type === "play") {
        setPlayState(true);
      } else {
        setPlayState(false);
      }
    },
    [setPlayState]
  );

  useEffect(() => {
    const capture = captureArea.current;
    capture.addEventListener("play", videoPlayStateCallBack, false);
    capture.addEventListener("pause", videoPlayStateCallBack, false);

    interval.current = setInterval(() => {
      const callbackData = getDataUrl(capture);
      dataUrlCallback(callbackData);
    }, 5000);

    return () => {
      clearInterval(interval.current);
      capture.removeEventListener("play", videoPlayStateCallBack, false);
      capture.removeEventListener("pause", videoPlayStateCallBack, false);
    };
  }, [videoPlayStateCallBack, dataUrlCallback]);

  const getDataUrl = (element) => {
    const canvas = document.createElement("canvas");
    canvas.width = element.offsetWidth * 2;
    canvas.height = element.offsetHeight * 2;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL();
    canvas.remove();

    return {
      b64encoded: dataURL,
      index: Math.floor(element.currentTime),
    };
  };

  return (
    <Fragment>
      <video ref={captureArea} autoPlay={true} controls={true} width="100%" src={videoSource.src} type={videoSource.type} muted={true} />
    </Fragment>
  );
});

Streaming.propTypes = {
  dataUrlCallback: PropTypes.func.isRequired,
  videoSource: PropTypes.shape({
    src: PropTypes.string,
    type: PropTypes.string,
  }),
};

export { Streaming };
