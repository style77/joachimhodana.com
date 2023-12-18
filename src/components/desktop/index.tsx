import { useDispatch, useSelector } from "react-redux"
import { Icon } from "../../utils/icon";

import "../search/searchpane.scss";
import "../sidepane/sidepane.scss";
import "../start/startmenu.scss";
import "./desktop.scss";

export const Desktop = () => {
    const desktopState = useSelector((state: any) => state.desktop)

    const dispatch = useDispatch()

    return (
        <div className="desktopCont">
            {desktopState.applications.map((app, i) => {
                return (
                    <div key={i} className="dskApp" tabIndex={i}>
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