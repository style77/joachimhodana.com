import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./taskbar.scss";
import { Icon } from "../../utils/icon";

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
                        <Icon className="tsIcon" src="home" width={24} clicked={true} />
                        {taskbarState.showSearch ? (
                            <Icon
                                className="tsIcon searchIcon"
                                src="taskSearch"
                                allIcons
                                clicked={true}
                            />
                        ) : null}
                        {taskbarState.showWidgets ? (
                            <Icon
                                className="tsIcon widget"
                                src="widget"
                                width={24}
                            />
                        ) : null}
                        {taskbarState.apps.map((task, i) => {
                            var isActive = task.id === applicationsState.activeApplication;
                            var isOpen = applicationsState.applications.find((app) => app.id === task.id) !== undefined;
                            return (
                                <div
                                    key={i}
                                    value={task.icon}
                                >
                                    <Icon
                                        className="tsIcon"
                                        width={24}
                                        onClick={() => dispatch({ type: "SET_ACTIVE_APPLICATION", payload: task.id })}
                                        active={isActive}
                                        open={isOpen}
                                        src={task.icon}
                                        clicked={true}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="taskright">
                    <div
                        className="px-2 prtclk handcr hvlight flex"
                    >
                        <Icon fafa="faChevronUp" width={10} />
                    </div>
                    <div
                        className="prtclk handcr my-1 px-1 hvlight flex rounded"
                        onClick={() => dispatch({ type: "TOGGLE_SIDEPANE" })}
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
                        onClick={() => dispatch({ type: "TOGGLE_CALENDAR" })}
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
                    <div className="graybd mr-1 my-4 w-2" />
                </div>
            </div>
        </div>
    );
}

export default Taskbar;