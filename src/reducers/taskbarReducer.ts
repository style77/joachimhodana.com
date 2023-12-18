import { taskbarApps } from "../utils/defaults";

const initialState = {
    apps: taskbarApps,
    align: 'center',
    showSearch: true,
    showWidgets: false, // Who tf uses that
    volume: 3,
};

export default function taskbarReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASKBAR_APPS':
            return {
                ...state,
                apps: action.payload,
            };
        case 'SET_VOLUME':
            if (action.payload < 0) {
                action.payload = 0;
            } else if (action.payload > 3) {
                action.payload = 3;
            }
            return {
                ...state,
                volume: action.payload,
            };
        default:
            return state;
    }
}