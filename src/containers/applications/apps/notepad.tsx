import { useSelector } from "react-redux";
import { ToolBar } from "../toolbar";
import { RootState } from "../../../reducers";
import { Application } from "../../../utils/defaults";

interface WnApp extends Application {
    content: string;
}

export const Notepad = () => {
    const applicationsState = useSelector((state: RootState) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "Notepad")! as unknown as WnApp;

    return (
        <div
            className="notepad floatTab dpShad"
            data-size={wnapp.window.size}
            data-max={wnapp.window.max}
            id={wnapp.icon + "App"}
        >
            <ToolBar
                app={wnapp}
                icon={wnapp.icon}
                size={wnapp.window.size}
                name={wnapp.window.title || "Untitled - Notepad"}
            />
            <div className="windowScreen flex flex-col" data-dock="true">
                <div className="flex text-xs py-2 topBar">
                    <div className="mx-2">File</div>
                    <div className="mx-4">Edit</div>
                    <div className="mx-4">View</div>
                </div>
                <div className="restWindow h-full flex-grow">
                    <div className="w-full h-full overflow-hidden">
                        <textarea className="noteText win11Scroll" id="textpad" defaultValue={wnapp.content || ""} />
                    </div>
                </div>
            </div>
        </div>
    );
};