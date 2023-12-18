import { apps } from "../utils/defaults";

type Window = {
    title: string;
    size: string;
    max: boolean;
}

type Application = {
    id: string;
    name: string;
    icon: string;
    type: string;
    window: Window;
};


const initialState: {
    applications: Application[];
    activeApplication: string | null;
} = {
    applications: [],
    activeApplication: null,
};

export default function applicationsReducer(state = initialState, action: Action) {
    switch (action.type) { 
        case 'SET_ACTIVE_APPLICATION':
            if (!state.applications.find((application) => application.id === action.payload)) {
                const appDefaults: Application = {
                    id: action.payload,
                    name: apps[action.payload].name,
                    icon: apps[action.payload].icon,
                    type: apps[action.payload].type,
                    window: {
                        title: apps[action.payload].window.title,
                        size: "full",
                        max: true,
                    },
                }
                return {
                    ...state,
                    applications: [...state.applications, appDefaults],
                    activeApplication: action.payload,
                };
            }

            return {
                ...state,
                activeApplication: action.payload,
                applications: state.applications.map((application) => {
                    if (application.id === action.payload) {
                        return {
                            ...application,
                            window: {
                                ...application.window,
                                max: true,
                            },
                        };
                    }
                    return application;
                }),
            };
        case 'CLOSE_APPLICATION':
            if (state.activeApplication === action.payload) {
                return {
                    ...state,
                    activeApplication: null,
                    applications: state.applications.filter((application) => application.id !== action.payload),
                };
            }
            return {
                ...state,
                applications: state.applications.filter((application) => application.id !== action.payload),
            };
        case 'RESIZE_APPLICATION':
            return {
                ...state,
                applications: state.applications.map((application) => {
                    if (application.id === action.payload.id) {
                        return {
                            ...application,
                            window: {
                                ...application.window,
                                max: true,
                                size: action.payload.size,
                            },
                        };
                    }
                    return application;
                }),
            };
        case 'MINIMIZE_APPLICATION':
            return {
                ...state,
                activeApplication: state.activeApplication === action.payload ? null : state.activeApplication,
                applications: state.applications.map((application) => {
                    if (application.id === action.payload) {
                        return {
                            ...application,
                            window: {
                                ...application.window,
                                max: false
                            },
                        };
                    }
                    return application;
                }),
            };
        default:
            return state;
    }
}