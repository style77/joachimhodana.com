const easterEggWallpapers = [
    "crybaby.jpg"
]

const wallpapers = [
    "default.jpg"
]

const getDefaultWallpaper = () => {
    const randVal = Math.random() * 100;
    if (randVal < 0.1) {
        return easterEggWallpapers[Math.floor(Math.random() * easterEggWallpapers.length)];
    }
    return wallpapers[Math.floor(Math.random() * wallpapers.length)];
}

const initialState = {
    image: getDefaultWallpaper(),
};

export default function wallpaperReducer(state = initialState, action: Action) {
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