import { configureStore } from '@reduxjs/toolkit';

import wallpaperReducer from './wallpaperReducer';
import taskbarReducer from './taskbarReducer';
import sidepaneReducer from './sidepaneReducer';
import applicationsReducer from './applicationsReducer';
import desktopReducer from './desktopReducer';

const store = configureStore({
    reducer: {
        applications: applicationsReducer,
        wallpaper: wallpaperReducer,
        taskbar: taskbarReducer,
        sidepane: sidepaneReducer,
        desktop: desktopReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;