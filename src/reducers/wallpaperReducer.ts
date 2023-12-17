const initialState = {
    image: 'default.jpg',
};

export default function wallpaperReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_WALLPAPER':
            return {
                ...state,
                image: action.payload,
            };
        default:
            return state;
    }
}