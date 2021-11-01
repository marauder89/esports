import { memo, Fragment } from "react";
import PropTypes from "prop-types";

const KillChampionEvent = memo(({ eventStructure }) => {
  return (
    <Fragment>
      <img src={`img/champion/${eventStructure.victim}.png`} alt="" />
    </Fragment>
  );
});

KillChampionEvent.propTypes = {
  eventStructure: PropTypes.object.isRequired,
};

export { KillChampionEvent };
