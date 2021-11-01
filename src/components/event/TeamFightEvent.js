import { memo, Fragment } from "react";
import PropTypes from "prop-types";

const TeamFightEvent = memo(({ eventStructure }) => {
  return (
    <Fragment>
      <img src={`img/champion/${eventStructure.victim}.png`} alt="" />
    </Fragment>
  );
});

TeamFightEvent.propTypes = {
  eventStructure: PropTypes.object.isRequired,
};

export { TeamFightEvent };
