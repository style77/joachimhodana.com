import "./general.scss";

type IconProps = {
    src?: string;

    onClick?: any;
    active?: boolean;
    
    className?: string;
    ui?: boolean;

    width?: number;
    height?: number;
}

export const Icon = (props: IconProps) => {
    var src = `icon/${props.ui != null ? "ui/" : ""}${props.src}.png`;

    var prtclk = "";
    if (props.src) {
        if (props.onClick != null) {
            prtclk = "prtclk";
        }
    }

    return (
        <div
            className={`uicon ${props.className || ""} ${prtclk}`}
            data-active={props.active}
            onClick={props.onClick}
        >
            {props.className == "tsIcon" ? (
                <div
                    style={{ width: props.width, height: props.width }}
                >
                    <img
                        width={props.width}
                        height={props.height}
                        src={src}
                    />
                </div>
            ) : (
                <img
                    width={props.width}
                    height={props.height}
                    src={src}
                />
            )}
        </div>
    );
};