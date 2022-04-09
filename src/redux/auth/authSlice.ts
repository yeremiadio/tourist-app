import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import storage from "redux-persist/lib/storage";
import { User } from '../../model/User'
import apiClient from "../../utils/apiClient";
import { persistReducer } from "redux-persist";

export interface AuthState {
    user: object | any;
}

const initialState: AuthState = {
    user: {}
};

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

export const getUser = createAsyncThunk<
    User,
    { id: string },
    {
        rejectValue: ValidationErrors
    }
>('auth/getUser', async (id, { rejectWithValue }) => {
    try {
        const response = await apiClient().get(`api/users/${id}`)
        return response.data
    } catch (err) {
        let error: AxiosError<ValidationErrors> | any = err // cast the error for access
        if (!error.response) {
            throw err
        }
        return rejectWithValue(error.response.data)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.user = payload
        })
        builder.addCase(getUser.rejected, (state, { payload }: PayloadAction<any>) => {
            state.user = {}
        })
    },
});

const authPersistConfig = {
    key: 'auth',
    storage: storage,
    blacklist: ['auth']
}

export default persistReducer(authPersistConfig, authSlice.reducer);