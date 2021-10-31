import { useRef, useEffect, useState, useCallback, Fragment, memo } from "react";
import { useSetRecoilState } from "recoil";
import PropTypes from "prop-types";

import { playSelector } from "../../store";

const Streaming = memo(({ onChangeCallback, dataUrlCallback }) => {
  const setPlayState = useSetRecoilState(playSelector);
  const [videoSource, setVideoSource] = useState({ src: null, type: "" });
  const [base64, setBase64] = useState("");

  const captureArea = useRef();
  const interval = useRef();

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
    canvas.width = element.width * 2;
    canvas.height = element.height * 2;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(element, 0, 0, canvas.width, canvas.height);

    const dataURL = canvas.toDataURL();
    setBase64(dataURL);
    canvas.remove();

    return {
      b64encoded: dataURL,
      index: Math.floor(element.currentTime),
    };
  };

  const onChange = useCallback(
    (e) => {
      const selectFile = e.target.files[0];
      if (selectFile) {
        const blob = URL.createObjectURL(selectFile);
        setVideoSource({ src: blob, type: selectFile.type });
      }

      const callbackData = {
        path: e.target.value,
      };

      onChangeCallback(callbackData);
    },
    [onChangeCallback]
  );

  return (
    <Fragment>
      <img src={base64} height="45" width="80" alt="" />
      <br />
      <video ref={captureArea} autoPlay={true} controls={true} height="450" width="800" src={videoSource.src} type={videoSource.type} muted={true} />

      <input type="file" onChange={onChange} />
    </Fragment>
  );
});

Streaming.prototype = {
  onChangeCallback: PropTypes.func.isRequired,
  dataUrlCallback: PropTypes.func.isRequired,
};

export { Streaming };
