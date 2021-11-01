import { useCallback, Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Streaming } from "../../components";
import { playState, eventComponentState, eventComponentSelector } from "../../store";
import { IER_1_1, IER_1_2, IER_1_3 } from "../../services";

const P2 = () => {
  const setEventComponent = useSetRecoilState(eventComponentSelector);
  const eventComponent = useRecoilValue(eventComponentState);
  const play = useRecoilValue(playState);

  const onChangeCallback = useCallback((data) => {
    const init = async () => {
      const params = {
        source: data.path,
        model: "Random Forest",
        options: {
          opA: true,
          opB: false,
          opC: true,
        },
      };
      await IER_1_1(params);
    };
    init();
  }, []);

  const dataUrlCallback = useCallback(
    (data) => {
      if (play) {
        const getChartData = async () => {
          const params = {
            b64encoded: data.b64encoded,
            index: data.index,
          };
          const _eventData = await IER_1_2(params);
          setEventComponent(_eventData);
        };
        getChartData();
      }
    },
    [play, setEventComponent]
  );

  return (
    <Fragment>
      <div style={{ width: "48%", float: "left" }}>
        <Streaming onChangeCallback={onChangeCallback} dataUrlCallback={dataUrlCallback} />
      </div>
      <div style={{ width: "48%", float: "right" }}>{eventComponent}</div>
    </Fragment>
  );
};

export default P2;
