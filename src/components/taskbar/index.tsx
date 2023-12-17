import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./taskbar.scss";
import { Icon } from "../../utils/icon";
import { dispatchAction } from "../../actions";

const Taskbar = () => {
    const taskbarState = useSelector((state) => {
        return state.taskbar;
    });
    const applicationsState = useSelector((state) => {
        return state.applications;
    });

    const dispatch = useDispatch();

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="taskbar">
            <div className="taskcont">
                <div className="tasksCont" data-menu="task" data-side={taskbarState.align}>
                    <div className="tsbar">
                        <Icon className="tsIcon" src="home" width={24} click="STARTOGG" />
                        {taskbarState.search ? (
                            <Icon
                                click="STARTSRC"
                                className="tsIcon searchIcon"
                                icon="taskSearch"
                            />
                        ) : null}
                        {taskbarState.widgets ? (
                            <Icon
                                className="tsIcon widget"
                                src="widget"
                                width={24}
                                click="WIDGTOGG"
                            />
                        ) : null}
                        {taskbarState.apps.map((task, i) => {
                            var isActive = task.id === applicationsState.activeApplication;
                            return (
                                <div
                                    key={i}
                                    // onMouseOver={(!isActive && !isHidden && showPrev) || null}
                                    value={task.icon}
                                >
                                    <Icon
                                        className="tsIcon"
                                        width={24}
                                        open={isActive ? true : null}
                                        onClick={() => dispatch({ TYPE: "SET_ACTIVE_APPLICATION", payload: task.id })}
                                        active={isActive}
                                        payload="togg"
                                        src={task.icon}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="taskright">
                    <div
                        className="px-2 prtclk handcr hvlight flex"
                        // onClick={clickDispatch}
                        data-action="BANDTOGG"
                    >
                        <Icon fafa="faChevronUp" width={10} />
                    </div>
                    <div
                        className="prtclk handcr my-1 px-1 hvlight flex rounded"
                        // onClick={clickDispatch}
                        data-action="PANETOGG"
                    >
                        <Icon className="taskIcon" src="wifi" ui width={16} />
                        <Icon
                            className="taskIcon"
                            src={"audio" + taskbarState.volume}
                            ui
                            width={16}
                        />
                        {/* <Battery /> */}
                    </div>

                    <div
                        className="taskDate m-1 handcr prtclk rounded hvlight"
                        // onClick={clickDispatch}
                        data-action="CALNTOGG"
                    >
                        <div>
                            {time.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "numeric",
                            })}
                        </div>
                        <div>
                            {time.toLocaleDateString("en-US", {
                                year: "2-digit",
                                month: "2-digit",
                                day: "numeric",
                            })}
                        </div>
                    </div>
                    <Icon className="graybd my-4" ui width={6} click="SHOWDSK" pr />
                </div>
            </div>
        </div>
    );
}

export default Taskbar;