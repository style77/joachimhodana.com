import { desktopApps } from "../utils/defaults";

const initialState = {
    applications: desktopApps,
}

export default function desktopReducer(state = initialState, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}