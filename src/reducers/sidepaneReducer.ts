
const getSystemTheme = () => {
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const mode = darkMode ? "dark" : "light";

    document.body.dataset.theme = mode;

    return mode;
}

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
            name: "Airplane Mode",
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
            src: getSystemTheme() === "dark" ? "moon" : "sun",
            name: "Theme",
            state: getSystemTheme() === "dark" ? true : false,
            action: "changeTheme",
        },
    ],
    hide: true,
    calendarHide: true,

    brightness: 100,
};


export default function sidepaneReducer(state = initialState, action) {
    if (action.type === "TOGGLE_QUICKS") {
        let updatedQuicks = state.quicks;
        let updatedBrightness = state.brightness;

        if (action.payload === "Airplane Mode") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "WiFi" || quick.name === "Bluetooth") {
                    return { ...quick, state: false };
                } else if (quick.name === "Airplane Mode") {
                    return { ...quick, state: !quick.state };
                }
                return quick;
            });
        } else if (action.payload === "WiFi" || action.payload === "Bluetooth") {
            updatedQuicks = state.quicks.map(quick => {
                if (quick.name === "Airplane Mode") {
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
    } else if (action.type == "TOGGLE_SIDEPANE") {
        return { ...state, calendarHide: true, hide: !state.hide };
    } else if (action.type == "HIDE_SIDEPANE") {
        return { ...state, hide: true };
    } else if (action.type == "TOGGLE_CALENDAR") {
        return { ...state, calendarHide: !state.calendarHide, hide: true };
    } else if (action.type == "HIDE_CALENDAR") {
        return { ...state, calendarHide: true };
    } else {
        return state;
    }
};
