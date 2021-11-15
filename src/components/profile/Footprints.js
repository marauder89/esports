import { Fragment, useRef, useState, useEffect, createRef, memo } from "react";
import PropTypes from "prop-types";
import { default as _ } from "lodash";

import { loadImage } from "../../commons";

const Footprints = memo(({ profiles }) => {
  const canvas = useRef();
  const map = useRef();

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

    if (canvas.current) {
      loadImage("img/map/map11.png").then((img) => {
        const ctx = canvas.current.getContext("2d");
        // ctx.drawImage(img, 0, 0);
        console.log("asfd");
        ctx.font = "48px serif";

        ctx.strokeText("Hello dsdddddddddddddddddddddddworld", 0, 30);

        const base64 = canvas.current.toDataURL();
        map.current.src = base64;
      });
    }
  }, [profilesLength]);

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
                    <img ref={mapRefs[liIndex]} src="img/map/map11.png" alt="map" />
                    <canvas ref={canvasRefs[liIndex]} width="512" height="512" hidden />
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
