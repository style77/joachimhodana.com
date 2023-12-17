import { taskbarApps } from "../utils/defaults";

const initialState = {
    apps: taskbarApps,
    align: 'center',
    showSearch: true,
    showWidgets: true,
    volume: 3,
};

export default function taskbarReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TASKBAR_APPS':
            return {
                ...state,
                apps: action.payload,
            };
        default:
            return state;
    }
}