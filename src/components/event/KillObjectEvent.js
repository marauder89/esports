import { memo, Fragment } from "react";
import PropTypes from "prop-types";

const KillObjectEvent = memo(({ eventStructure }) => {
  return (
    <Fragment>
      <img src={`img/champion/${eventStructure.victim}.png`} alt="" />
    </Fragment>
  );
});

KillObjectEvent.propTypes = {
  eventStructure: PropTypes.object.isRequired,
};

export { KillObjectEvent };
