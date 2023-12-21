import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../utils/icon";
import { RootState } from "../../reducers";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

export const BandPane = () => {
  const sidepane = useSelector((state: RootState) => state.sidepane);

  const dispatch = useDispatch();

  const bandPaneRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(bandPaneRef, () => dispatch(
    {
      type: "HIDE_BANDPANE"
    }
  ))

  return (
    <div
      className="bandpane dpShad"
      data-hide={sidepane.bandhide}
      // @ts-expect-error Variable is not typed
      style={{ "--prefix": "BAND" }}
      ref={bandPaneRef}
    >
      <div className="bandContainer">
        <Icon
          className="hvlight"
          width={14}
          clicked={true}
          ui
          src="mullvad_locked"
          onClick={() => {
            dispatch({
              type: "SET_ACTIVE_APPLICATION",
              payload: {
                id: "Mullvad",
                type: "app",
                name: "Mullvad"
              },
            })
          }}
        />
        <Icon
          className="hvlight"
          width={17}
          clicked={true}
          ui
          src="docker"
        />
        <Icon
          className="hvlight"
          width={14}
          clicked={true}
          ui
          src="discord"
        />
      </div>
    </div>
  );
};