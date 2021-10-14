import { useRef, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

const videoState = atom({
  key: "videoState",
  default: { src: null, type: "" },
});
const base64State = atom({
  key: "base64State",
  default: "",
});

const P1 = () => {
  const [videoSource, setVideoSource] = useRecoilState(videoState);
  const [base64, setBase64] = useRecoilState(base64State);
  const interval = useRef();
  const captureArea = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      const capture = captureArea.current;
      const canvas = document.createElement("canvas");

      canvas.width = capture.width;
      canvas.height = capture.height;
      canvas.getContext("2d").drawImage(capture, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL();
      setBase64(dataURL);
    }, 5000);

    return () => {
      clearInterval(interval.current);
    };
  });

  const onChange = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      const blob = URL.createObjectURL(selectFile);
      setVideoSource({ src: blob, type: selectFile.type });
    }
  };

  return (
    <div>
      <video ref={captureArea} autoPlay={true} controls={true} height="450" width="800" src={videoSource.src} type={videoSource.type} />

      <input type="file" onChange={onChange} />
      <br />
      <div>
        <img src={base64} height="450" width="800" alt="" />
      </div>
    </div>
  );
};

export default P1;
