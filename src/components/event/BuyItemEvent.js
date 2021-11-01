import { memo, Fragment } from "react";
import PropTypes from "prop-types";

const BuyItemEvent = memo(({ eventStructure }) => {
  return (
    <Fragment>
      <img src={`img/item/${eventStructure.item}.png`} alt="" />
    </Fragment>
  );
});

BuyItemEvent.propTypes = {
  eventStructure: PropTypes.object.isRequired,
};

export { BuyItemEvent };
