const initialState = {
    quicks: [
        {
            ui: true,
            src: "wifi",
            name: "WiFi",
            state: true,
        },
        {
            ui: true,
            src: "bluetooth",
            name: "Bluetooth",
            state: true,
        },
        {
            ui: true,
            src: "airplane",
            name: "Flight Mode",
            state: false,
            action: "flightMode",
        },
        {
            ui: true,
            src: "saver",
            name: "Battery Saver",
            state: false
        },
        {
            ui: true,
            src: "sun",
            name: "Theme",
            state: false,
            action: "changeTheme",
        },
        {
            ui: true,
            src: "nightlight",
            name: "Night Light",
            state: false,
        },
    ],
    hide: true,
    banhide: true,
    calhide: true,

    brightness: 100,
};


export default function sidepaneReducer(state = initialState, action) {
    if (action.type === "TOGGLE_QUICKS") {
        let updatedQuicks = state.quicks;
        let updatedBrightness = state.brightness;

        if (action.payload === "Flight Mode") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "WiFi" || quick.name === "Bluetooth") {
                    return { ...quick, state: false };
                } else if (quick.name === "Flight Mode") {
                    return { ...quick, state: !quick.state };
                }
                return quick;
            });
        } else if (action.payload === "WiFi" || action.payload === "Bluetooth") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "Flight Mode") {
                    return { ...quick, state: false };
                } else if (quick.name === action.payload) {
                    return { ...quick, state: !quick.state };
                }
                return quick;
            });
        } else if (action.payload === "Battery Saver") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "Battery Saver") {
                    const newState = !quick.state;
                    updatedBrightness = newState ? 70 : 100;
                    return { ...quick, state: newState };
                }
                return quick;
            });

            return { ...state, quicks: updatedQuicks, brightness: updatedBrightness };
        } else if (action.payload === "Theme") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "Theme") {

                    document.body.dataset.theme = quick.src === "moon" ? "light" : "dark";
                    return { ...quick, state: !quick.state, src: quick.src === "moon" ? "sun" : "moon" };
                }
                return quick;
            });
        } else {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === action.payload) {
                    return { ...quick, state: !quick.state };
                }
                return quick;
            });
        }
        return { ...state, quicks: updatedQuicks };
    } else if (action.type == "SET_BRIGHTNESS") {
        return { ...state, brightness: action.payload };
    } else if (action.type == "TOGGLE_BAND") {
        return { ...state, banhide: !state.banhide };
    } else if (action.type == "HIDE_BAND") {
        return { ...state, banhide: true };
    } else if (action.type == "TOGGLE_SIDEPANE") {
        return { ...state, hide: !state.hide };
    } else if (action.type == "HIDE_SIDEPANE") {
        return { ...state, hide: true };
    } else if (action.type == "TOOGLE_CAL") {
        return { ...state, calhide: !state.calhide };
    } else if (action.type == "HIDE_CAL") {
        return { ...state, calhide: true };
    } else {
        return state;
    }
};
