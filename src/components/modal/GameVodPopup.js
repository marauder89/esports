import { memo, useState, useRef } from "react";
import PropTypes from "prop-types";

const GameVodPopup = memo(({ onFileConfirmCallback }) => {
  const inputFile = useRef();
  const [fileName, setFileName] = useState("");

  const onFileChange = (e) => {
    const inputFile = e.target.value;
    const splitNm = inputFile.split("\\");
    setFileName(splitNm[splitNm.length - 1]);
  };

  const onModalConfirm = () => {
    onFileConfirmCallback(inputFile.current);
  };

  return (
    <div className="modal fade" id="gameVodPop" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="ModalLabel">
              게임영상 선택
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="fileBox">
              <label className="file-label">게임영상</label>
              <input type="file" id="fileUpload" onChange={onFileChange} ref={inputFile} hidden />
              <input type="text" className="fileNmBox" defaultValue={fileName} />
              <label htmlFor="fileUpload" className="btn-file">
                파일찾기
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn_gray" onClick={onModalConfirm} data-bs-dismiss="modal" aria-label="Close">
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

GameVodPopup.propTypes = {
  onFileConfirmCallback: PropTypes.func.isRequired,
};

export { GameVodPopup };
