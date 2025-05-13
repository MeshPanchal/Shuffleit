import { configureStore } from '@reduxjs/toolkit';
import subjectListReducer from './slices/subjectListSlice';

export const store = configureStore({
    reducer: {
      subjectListStore : subjectListReducer
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;