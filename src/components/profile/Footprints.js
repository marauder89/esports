import { Fragment, useState, useEffect, createRef, memo } from "react";
import PropTypes from "prop-types";
import { default as _ } from "lodash";

import { loadImage } from "../../commons";

const colorSet = new Set(["rgb(30, 81 ,230, 0.6)", "rgb(255, 35, 28, 0.6)", "rgb(40, 230, 75, 0.6)"]);

const Footprints = memo(({ profiles }) => {
  const [canvasRefs, setCanVasRefs] = useState([]);
  const [mapRefs, setMapRefs] = useState([]);
  const profilesLength = profiles.length;

  useEffect(() => {
    setCanVasRefs((canvasRefs) =>
      Array(profilesLength)
        .fill()
        .map((_, i) => canvasRefs[i] || createRef())
    );
    setMapRefs((mapRefs) =>
      Array(profilesLength)
        .fill()
        .map((_, i) => mapRefs[i] || createRef())
    );
  }, [profilesLength]);

  useEffect(() => {
    if (mapRefs.length > 0) {
      mapRefs.forEach((map, index) => {
        loadImage("img/map/map11.png").then((img) => {
          const profile = profiles[index];
          const ctx = canvasRefs[index].current.getContext("2d");
          ctx.drawImage(img, 0, 0);
          ctx.strokeStyle = Array.from(colorSet)[index % 3];
          ctx.lineWidth = 5;

          profile.footprints.forEach((footprint) => {
            const posArray = [{ x: 20, y: 490 }];

            Object.keys(footprint).forEach((key) => {
              const width = 512;
              const height = 512;
              const xPos = footprint[key][0];
              const yPos = footprint[key][1];

              const drawX = width * xPos;
              const drawY = height - height * yPos;

              posArray.push({ x: drawX, y: drawY });
            });

            posArray.forEach((pos, posIndex) => {
              if (posIndex > 0) {
                ctx.beginPath();
                ctx.moveTo(posArray[posIndex - 1].x, posArray[posIndex - 1].y);
                ctx.lineTo(pos.x, pos.y);

                ctx.stroke();
              }
            });
          });

          const isKDA = profile.feature_result.includes("/");
          const feature = isKDA ? profile.feature_result : Number(profile.feature_result).toFixed(2);
          const width = feature.length * 29; //rect 넓이 자동 계산

          ctx.fillStyle = "#2d76e5";
          ctx.fillRect(512 - width, 450, width, 65); //x, y, width, height

          ctx.font = "bold 45px serif";
          ctx.fillStyle = "#FFFFFF";

          ctx.fillText(feature, 512 - width + width / 12, 497); //이미지 크기인 512에서 rect넓이에 따라 text위치 지정

          const base64 = canvasRefs[index].current.toDataURL();
          map.current.src = base64;
        });
      });
    }
  }, [profiles, mapRefs, canvasRefs]);

  const chunkGroups = _.chunk(profiles, 3);

  return (
    <Fragment>
      {chunkGroups.map((groups, ulIndex) => {
        return (
          <ul key={ulIndex}>
            {groups.map((group, liIndex) => {
              return (
                <li key={liIndex}>
                  <p>Group {group.name}</p>
                  <div className="mapBox">
                    <img ref={mapRefs[liIndex + ulIndex * 3]} src="img/map/map11.png" alt="map" />
                    <canvas ref={canvasRefs[liIndex + ulIndex * 3]} width="512" height="512" hidden />
                  </div>
                </li>
              );
            })}
          </ul>
        );
      })}
    </Fragment>
  );
});

Footprints.propTypes = {
  profiles: PropTypes.array.isRequired,
};

export { Footprints };
