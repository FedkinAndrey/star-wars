import {combineReducers, configureStore, createListenerMiddleware} from '@reduxjs/toolkit';
import {api} from '@/services/api';
import {setupListeners} from "@reduxjs/toolkit/query";

interface StoreType {
    store: typeof store | null;
}

const combinedReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

const thunkArguments: StoreType = {
    store: null,
};

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: combinedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: thunkArguments,
            },
            serializableCheck: false,
        })
            .concat(api.middleware,)
            .prepend(listenerMiddleware.middleware),
});

thunkArguments.store = store;

setupListeners(store.dispatch);
