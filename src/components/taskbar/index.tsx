import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./taskbar.scss";
import { Icon } from "../../utils/icon";
import { RootState } from "../../reducers";
import { Application } from "../../utils/defaults";

const Taskbar = () => {
    const taskbarState = useSelector((state: RootState) => {
        return state.taskbar;
    });
    const applicationsState = useSelector((state: RootState) => {
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
                        {[
                            ...taskbarState.applications as Application[],
                            ...applicationsState.applications.filter(
                                ({ id }) => !(taskbarState.applications as Application[]).some((app) => app.id === id)
                            ),
                        ].map((task, i) => {
                            const isActive = task.id === applicationsState.activeApplication;
                            const isOpen = applicationsState.applications.find((app) => app.id === task.id) !== undefined;
                            return (
                                <div
                                    key={i}
                                >
                                    <Icon
                                        className="tsIcon"
                                        width={24}
                                        onClick={() => isActive ? dispatch({ type: "MINIMIZE_APPLICATION", payload: task.id }) : dispatch({ type: "SET_ACTIVE_APPLICATION", payload: {
                                            id: task.id
                                        }, })}
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
                        onClick={() => dispatch({ type: "TOGGLE_BANDPANE" })} 
                    >
                        <Icon 
                            fafa="faChevronUp" 
                            width={10} 
                        />
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