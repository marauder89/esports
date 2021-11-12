import { Fragment, memo } from "react";
import PropTypes from "prop-types";
import { default as _ } from "lodash";

const Footprints = memo(({ profiles }) => {
  const chunkGroups = _.chunk(profiles, 3);

  return (
    <Fragment>
      {chunkGroups.map((groups) => {
        return (
          <ul>
            {groups.map((group) => {
              return (
                <li>
                  <p>Group {group.name}</p>
                  <div className="mapBox">
                    <img src="img/map/map11.png" alt="" />
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
