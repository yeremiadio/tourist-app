import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./api/authApi";
const store = configureStore({
    reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer, },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})

// const store: Store<ArticleState, ArticleAction> = createStore(reducer);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch);
export default store;