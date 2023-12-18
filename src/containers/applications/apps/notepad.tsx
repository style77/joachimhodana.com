import { useSelector } from "react-redux";
import { ToolBar } from "../toolbar";

export const Notepad = () => {
    const applicationsState = useSelector((state) => state.applications);
    const wnapp = applicationsState.applications.find((app) => app.id === "Notepad");

    return (
        <div
            className="notepad floatTab dpShad"
            data-size={wnapp.window.size}
            data-max={wnapp.window.max}
            style={{
                ...(wnapp.window.size == "cstm" ? wnapp.window.dim : null),
                zIndex: wnapp.window.z,
            }}
            data-hide={wnapp.hide}
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