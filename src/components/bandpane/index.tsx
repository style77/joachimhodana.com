import { useSelector } from "react-redux";
import { Icon } from "../../utils/icon";
import { RootState } from "../../reducers";

export const BandPane = () => {
    const sidepane = useSelector((state: RootState) => state.sidepane);
  
    return (
      <div
        className="bandpane dpShad"
        data-hide={sidepane.bandhide}
        // @ts-expect-error Variable is not typed
        style={{ "--prefix": "BAND" }}
      >
        <div className="bandContainer">
          <Icon
            className="hvlight"
            width={14}
            clicked={true}
            ui
            src="mullvad_locked"
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