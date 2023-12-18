import { useDispatch, useSelector } from "react-redux"
import { Icon } from "../../utils/icon";

import "../search/searchpane.scss";
import "../sidepane/sidepane.scss";
import "../start/startmenu.scss";
import "./desktop.scss";
import { Application } from "../../utils/defaults";

export const Desktop = () => {
    const desktopState = useSelector((state) => state.desktop)

    const dispatch = useDispatch()

    return (
        <div className="desktopCont">
            {desktopState.applications.map((app: Application, idx: number) => {
                return (
                    <div key={idx} className="dskApp" tabIndex={idx}>
                        <Icon
                            clicked={true}
                            className="dskIcon"
                            src={app.icon}
                            width={36}
                            onClick={() => {
                                dispatch({
                                    type: "SET_ACTIVE_APPLICATION",
                                    payload: {
                                        id: app.id,
                                        name: app.name,
                                        type: app.type,
                                    },
                                })
                            }}
                        />
                        <div className="appName">{app.name}</div>
                    </div>
                );
            })}
        </div>
    );
}