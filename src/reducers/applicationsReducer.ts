
const initialState = {
    applications: [],
    activeApplication: null,
};

export default function applicationsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_APPLICATIONS':
            return {
                ...state,
                applications: action.payload,
            };
        case 'SET_ACTIVE_APPLICATION':
            return {
                ...state,
                activeApplication: action.payload,
            };
        default:
            return state;
    }
}