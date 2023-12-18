import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "../../utils/icon";
// import Battery from "../shared/Battery";
import "../search/searchpane.scss";
import "../sidepane/sidepane.scss";
import "../start/startmenu.scss";
import { RootState } from "../../reducers";

export const SidePane = () => {
    const sidepane = useSelector((state: RootState) => state.sidepane);
    const tasks = useSelector((state: RootState) => state.taskbar);

    const dispatch = useDispatch();

    const volumeSlider = document.getElementById("volumeSlider")! as HTMLInputElement;
    const brightnessSlider = document.getElementById("brightnessSlider")! as HTMLInputElement;

    const setSliderColor = (vol: number, slider: string) => {
        let sliderObject: HTMLInputElement | undefined;

        let payload = 3;
        
        switch (slider) {
            case "brightness":
                sliderObject = brightnessSlider;

                dispatch({ type: "SET_BRIGHTNESS", payload: vol })

                break;
            case "volume":
                if (vol < 70) {
                    payload = 2
                } 
                if (vol < 30) {
                    payload = 1
                } 
                if (vol == 0) {
                    payload = 0
                }

                dispatch({ type: "SET_VOLUME", payload })

                sliderObject = volumeSlider;
                break;
            default:
                break;
        }

        if (sliderObject) {
            sliderObject.style.setProperty("--track-color", `linear-gradient(90deg, var(--clrPrm) ${vol}%, #888888 ${vol}%)`)
        }
    }

    useEffect(() => {
        if (brightnessSlider && sidepane.brightness) {
            let brightnessValue: number | undefined;
    
            if (typeof sidepane.brightness === 'number') {
                brightnessValue = sidepane.brightness;
            } else if (
                typeof sidepane.brightness === 'object' &&
                'id' in sidepane.brightness &&
                'type' in sidepane.brightness &&
                'name' in sidepane.brightness
            ) {
                brightnessValue = parseInt(sidepane.brightness.id, 10);
            }
    
            if (brightnessValue !== undefined) {
                brightnessSlider.value = String(brightnessValue);
                setSliderColor(brightnessValue, "brightness");
            }
        }
    }, [sidepane.brightness, brightnessSlider]);

    return (
        <div
            className="sidePane dpShad"
            data-hide={sidepane.hide}
            // @ts-expect-error Variable is not typed
            style={{ "--prefix": "PANE" }}
        >
            <div className="quickSettings p-5 pb-8">
                <div className="qkCont">
                    {sidepane.quicks.map((qk, idx) => {
                        return (
                            <div key={idx} className="qkGrp">
                                <div
                                    className="qkbtn handcr prtclk"
                                    data-action={qk.action}
                                    data-state={qk.state}
                                    onClick={() => dispatch({ type: "TOGGLE_QUICKS", payload: qk.name })}
                                >
                                    <Icon
                                        className="quickIcon"
                                        ui={qk.ui}
                                        src={qk.src}
                                        width={14}
                                        invert={qk.state}
                                    />
                                </div>
                                <div className="qktext">{qk.name}</div>
                            </div>
                        );
                    })}
                </div>
                <div className="sliderCont">
                    <Icon className="mx-2" src="brightness" ui width={18} />
                    <input
                        id="brightnessSlider"
                        className="sliders vSlider"
                        onChange={(e) => setSliderColor(parseInt(e.target.value), "brightness")}
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="100"
                    />
                </div>
                <div className="sliderCont">
                    <Icon className="mx-2" src={"audio" + tasks.volume} ui width={18} />
                    <input
                        id="volumeSlider"
                        className="sliders vSlider"
                        onChange={(e) => setSliderColor(parseInt(e.target.value), "volume")}
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="100"
                    />
                </div>
            </div>
            {/* <div className="p-1 bottomBar">
                <div className="px-3 battery-sidepane">
                    <Battery pct />
                </div>
            </div> */}
        </div>
    );
};