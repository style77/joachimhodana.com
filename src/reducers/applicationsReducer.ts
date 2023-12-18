import { apps } from "../utils/defaults";

type Window = {
    title: string;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
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
                        position: {
                            x: 0,
                            y: 0,
                        },
                        size: {
                            width: 240,
                            height: 240,
                        },
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
            };
        default:
            return state;
    }
}