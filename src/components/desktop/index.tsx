import { useSelector } from "react-redux"
import { Icon } from "../../utils/icon";

import "../search/searchpane.scss";
import "../sidepane/sidepane.scss";
import "../start/startmenu.scss";

export const Desktop = () => {
    const desktopState = useSelector((state: any) => state.desktop)

    return (
        <div className="desktopCont">
          {desktopState.applications.map((app, i) => {
              return (
                <div key={i} className="dskApp" tabIndex={0}>
                  <Icon
                    clicked={true}
                    className="dskIcon"
                    src={app.icon}
                    width={36}
                  />
                  <div className="appName">{app.name}</div>
                </div>
              );
            })}
        </div>
      );
}