import "./general.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as AllIcons from "./icons";

type IconProps = {
    src?: string;

    onClick?: () => void;
    active?: boolean;
    open?: boolean;
    clicked?: boolean;

    className?: string;
    ui?: boolean;  // Use UI icons (from icon/ui)
    fafa?: string;  // FontAwesome Icon
    allIcons?: boolean;  // Use all icons (from icon)
    ext?: boolean;  // Use external icons (from web)

    invert?: boolean;

    width?: number;
    height?: number;
}

export const Icon = (props: IconProps) => {

    const prtclk = !props.clicked ? "prtclk" : "";

    if (props.fafa) {
        return (
            <div
                className={`uicon ${prtclk} ${props.className || ""}`}
                onClick={props.onClick}
                data-click={props.clicked}
            >
                <FontAwesomeIcon
                    style={{
                        width: props.width,
                        height: props.height || props.width,
                    }}
                    data-invert={props.invert}
                    data-click={props.clicked}
                    icon={
                        (FaIcons as any)[props.fafa]
                    }
                />
            </div>
        );
    } else if (props.allIcons && props.src) {
        const CustomIcon = (AllIcons as any)[props.src];
        return (
            <div
                className={`uicon ${prtclk} ${props.className || ""}`}
                onClick={props.onClick}
            >
                <CustomIcon
                    style={{
                        width: props.width,
                        height: props.height || props.width,
                    }}
                />
            </div>
        );
    } else {
        let src = `icon/${props.ui ? "ui/" : ""}${props.src}.png`;
        if (props.ext != null && props.src && props.src.includes("http")) {
            src = props.src;
        }
        return (
            <div
                className={`uicon ${props.className || ""} ${prtclk}`}
                data-active={props.active}
                data-open={props.open}
                onClick={props.onClick}
            >
                {props.className == "tsIcon" ? (
                    <div
                        style={{ width: props.width, height: props.width }}
                        data-invert={props.invert}
                        data-click={props.clicked}
                    >
                        <img
                            width={props.width}
                            height={props.height}
                            src={src}
                            data-invert={props.invert}
                            data-click={props.clicked}
                        />
                    </div>
                ) : (
                    <img
                        width={props.width}
                        height={props.height}
                        src={src}
                        data-invert={props.invert}
                        data-click={props.clicked}
                    />
                )}
            </div>
        );
    }
};