import { appsAndFiles } from "../utils/defaults";
import { File as IFile } from "../utils/defaults";

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
    metadata?: {
        content: string;
    };
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
            const appId = action.payload.id
            const contentType = action.payload.type
            
            let metadata = {}
            
            if (contentType === "file") {
                const fileName = action.payload.name

                // iterate over appsAndFiles and find the file with the same name
                const file = Object.values(appsAndFiles).find((file) => file.name === fileName) as IFile;
                if (file) {
                    metadata = {
                        content: (file as any).content,
                    }
                }
            } else {
                metadata = {
                    content: ""
                }
            }

            const content = appsAndFiles[appId]
            

            if (!state.applications.find((application) => application.id === appId)) {
                const appDefaults: Application = {
                    id: appId,
                    name: content.name,
                    icon: content.icon,
                    type: content.type,
                    window: {
                        title: content.window.title,
                        size: "full",
                        max: true,
                    },
                    ...metadata,
                }
                return {
                    ...state,
                    applications: [...state.applications, appDefaults],
                    activeApplication: appId,
                };
            } else {
                return {
                    ...state,
                    activeApplication: appId,
                    applications: state.applications.map((application) => {
                        if (application.id === appId) {
                            return {
                                ...application,
                                window: {
                                    ...application.window,
                                    max: true,
                                },
                                ...metadata,
                            };
                        }
                        return application;
                    }),
                };
            }
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