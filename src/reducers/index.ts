import { configureStore } from '@reduxjs/toolkit';

import wallpaperReducer from './wallpaperReducer';
import taskbarReducer from './taskbarReducer';
import sidepaneReducer from './sidepaneReducer';
import applicationsReducer from './applicationsReducer';

const store = configureStore({
    reducer: {
        applications: applicationsReducer,
        wallpaper: wallpaperReducer,
        taskbar: taskbarReducer,
        sidepane: sidepaneReducer,
    }
});

export default store;