import { configureStore } from '@reduxjs/toolkit';

import wallpaperReducer from './wallpaperReducer';
import taskbarReducer from './taskbarReducer';
import sidepaneReducer from './sidepaneReducer';
import applicationsReducer from './applicationsReducer';
import desktopReducer from './desktopReducer';

const store = configureStore({
    reducer: {
        // @ts-ignore  TODO: Fix this
        applications: applicationsReducer,
        // @ts-ignore TODO: Fix this
        wallpaper: wallpaperReducer,
        // @ts-ignore TODO: Fix this
        taskbar: taskbarReducer,
        // @ts-ignore TODO: Fix this
        sidepane: sidepaneReducer,
        // @ts-ignore TODO: Fix this
        desktop: desktopReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;