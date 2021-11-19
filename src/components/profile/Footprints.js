import { Fragment, useState, useEffect, createRef, memo } from "react";
import PropTypes from "prop-types";
import { default as _ } from "lodash";

import { loadImage } from "../../commons";

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

          ctx.beginPath();
          profile.footprints.forEach((footprint) => {
            ctx.moveTo(20, 490);
            Object.keys(footprint).forEach((key) => {
              const width = 512;
              const height = 512;
              const xPos = footprint[key][0];
              const yPos = footprint[key][1];

              const drawX = width * xPos;
              const drawY = height - height * yPos;

              ctx.lineTo(drawX, drawY);
            });
          });

          ctx.strokeStyle = "red";
          ctx.lineWidth = 3;
          ctx.stroke();

          ctx.fillStyle = "#2d76e5";
          ctx.fillRect(380, 450, 132, 65);

          ctx.font = "bold 45px serif";
          ctx.fillStyle = "#FFFFFF";

          ctx.fillText(Number(profile.feature_result).toFixed(1), 397, 497);

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
