import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import { ToolBar } from "../toolbar";

const GAME_URL = "https://loldodgegame.com/farming";

export const LeagueofLegends = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "LeagueOfLegends");

    if (!wnapp) {
        return null;
    }

    return (
        <div
            className="calcApp floatTab dpShad"
            data-size={wnapp.window.size}
            id={wnapp.icon + "App"}
            data-max={wnapp.window.max}
        >
            <ToolBar
                app={wnapp}
                icon={wnapp.icon}
                size={wnapp.window.size}
                name="League of Legends"
            />
            <div className="appContent w-full h-full">
                <div className="appWrap w-full h-full">
                    <div className="appFrame w-full h-full">
                        <iframe
                            src={GAME_URL}
                            title="League of Legends"
                            frameBorder="0"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}