import { memo, Fragment } from "react";
import PropTypes from "prop-types";

const BuyItemEvent = memo(({ eventStructure }) => {
  return (
    <Fragment>
      <img src={`img/item/${eventStructure.item}.png`} alt="" />
      <div className="m-3 p-4 rounded bg border">
        <h4 className="title">⊙ 상세보기</h4>
        <hr />
        <div className="detailBox p-3" id="detail1">
          <p>
            <span className="time">00:50</span> <span className="desc">퍼플팀 : 아이템 구입</span>
          </p>
          <div className="miniMap">
            <div className="teamFight">
              <img src="images/fightCircle.png" alt="" />
            </div>
            <div className="miniMapBg" />
            <img src="images/miniMap.jpg" alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
});

BuyItemEvent.propTypes = {
  eventStructure: PropTypes.object.isRequired,
};

export { BuyItemEvent };
