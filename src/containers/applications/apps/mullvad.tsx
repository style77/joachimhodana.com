import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from 'usehooks-ts'

import { RootState } from "../../../reducers";
import { Icon } from "../../../utils/icon";

import "./mullvad.scss";

const DAYS_LEFT = "∞";

export const Mullvad = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const sidepane = useSelector((state: RootState) => state.sidepane)
    const wnapp = applicationsState.applications.find((app) => app.id === "Mullvad");

    const appRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    if (!wnapp) {
        return null;
    }

    useOnClickOutside(appRef, () => dispatch(
        {
            type: "CLOSE_APPLICATION",
            payload: wnapp.id
        }
    ))

    useEffect(() => {
        dispatch(
            {
                type: "HIDE_BANDPANE"
            }
        )
    }, [dispatch])

    return (
        <div className="mullvadApp" ref={appRef}>
            <div className="mullvadHeader flex flex-col gap-1.5 w-full items-center px-4 py-2" data-locked={sidepane.mullvadLocked}>
                <div className="flex flex-row gap-2 items-center justify-start w-full">
                    <Icon
                        src={wnapp.icon}
                        ui
                        width={34}
                        className="flex"
                    />
                    <span className="flex uppercase font-semibold text-xl">
                        {wnapp.name} VPN
                    </span>
                </div>
                <div className="flex flex-row gap-4 text-[10px] font-medium w-full items-start">
                    <span>Device name: Suspicious Shrimp</span>
                    <span>Time left: {DAYS_LEFT} days</span>
                </div>
            </div>
            <div className="mullvadMap w-full h-full flex" data-locked={sidepane.mullvadLocked}></div>
            <button className="mullvadConnectButton mr-1" data-locked={sidepane.mullvadLocked} onClick={
                () => {
                    dispatch(
                        {
                            type: "TOGGLE_MULLVAD"
                        }
                    )
                }
            }>
                {
                    sidepane.mullvadLocked ? "Disconnect" : "Secure my connection"
                }
            </button>

        </div>
    )
}