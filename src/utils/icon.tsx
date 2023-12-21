import "./general.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FaIcons from "@fortawesome/free-solid-svg-icons";
import * as AllIcons from "./icons";
import {
    IconProp,
} from '@fortawesome/fontawesome-svg-core'

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

type FontAwesomeIconName = keyof typeof FaIcons;
type AllIconsName = keyof typeof AllIcons;

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
                        FaIcons[props.fafa as FontAwesomeIconName] as IconProp
                    }
                />
            </div>
        );
    } else if (props.allIcons && props.src) {
        const CustomIcon = AllIcons[props.src as AllIconsName];
        return (
            <div
                className={`uicon ${prtclk} ${props.className || ""}`}
                onClick={props.onClick}
            >
                <CustomIcon
                    // @ts-expect-error This is a custom icon component
                    className={props.className}
                    style={{
                        width: props.width || 24,
                        height: props.height || props.width || 24,
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