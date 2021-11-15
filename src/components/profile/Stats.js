import { Fragment, memo } from "react";
import PropTypes from "prop-types";

const Stats = memo(({ profiles, selectedGroup }) => {
  return (
    <Fragment>
      <div className="mapData mt-3 scrollBar">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Group</th>
              <th scope="col">Assist</th>
              <th scope="col">CS</th>
              <th scope="col">Death</th>
              <th scope="col">Gold</th>
              <th scope="col">Kill</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => {
              return (
                <tr style={{ color: profile.name === selectedGroup ? "red" : "" }} key={index}>
                  <th scope="row">{profile.name}</th>
                  <td>{profile.stats.Assist.toFixed(1)}</td>
                  <td>{profile.stats.CS.toFixed(1)}</td>
                  <td>{profile.stats.Death.toFixed(1)}</td>
                  <td>{profile.stats.Gold.toFixed(1)}</td>
                  <td>{profile.stats.Kill.toFixed(1)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
});

Stats.propTypes = {
  profiles: PropTypes.array.isRequired,
  selectedGroup: PropTypes.string.isRequired,
};

export { Stats };
