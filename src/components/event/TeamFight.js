import { memo, Fragment, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const TeamFight = memo(({ eventData }) => {
  const canvas = useRef();

  useEffect(() => {
    if (eventData.event_structure) {
      const ctx = canvas.current.getContext("2d");

      Promise.all([loadImage("img/map/map11.png", "map"), loadImage("img/map/fightCircle.png", "fight")]).then((imgs) => {
        imgs.forEach((img) => {
          if (img.alt === "map") {
            ctx.drawImage(img, 0, 0);
          } else if (img.alt === "fight") {
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            const xPos = eventData.event_structure.location[0];
            const yPos = eventData.event_structure.location[1];

            //fightcircle 중심좌표 88,106 이미지 크기 179,179 (이미지 크기 - 중심좌표)
            const drawX = width * xPos - 91;
            const drawY = height * yPos - 73;

            ctx.drawImage(img, drawX, drawY);
          }
        });
      });
    }
  }, [eventData]);

  const loadImage = (url, alt) => {
    return new Promise((resolve) => {
      const image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.src = url;
      image.alt = alt;
    });
  };

  return (
    <Fragment>
      <div className="detailBox p-3">
        <p>
          <span className="time">{eventData.time_stamp}</span> <span className="desc">Team Fight</span>
        </p>
        <div className="miniMap">
          <canvas ref={canvas} width="512" height="512" />
        </div>
      </div>
    </Fragment>
  );
});

TeamFight.propTypes = {
  eventData: PropTypes.object.isRequired,
};

export { TeamFight };
