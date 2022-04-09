import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import apiClient from "../../utils/apiClient";

export interface TouristState {
    touristList: object | any;
}

const initialState: TouristState = {
    touristList: {}
};

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

export const getTourists = createAsyncThunk<
    any,
    { pageNum: number },
    {
        rejectValue: ValidationErrors
    }
>('auth/getTourists', async ({ pageNum }, { rejectWithValue }) => {
    try {
        const response = await apiClient().get(`api/Tourist?page=${pageNum}`)
        return response.data
    } catch (err) {
        let error: AxiosError<ValidationErrors> | any = err // cast the error for access
        if (!error.response) {
            throw err
        }
        return rejectWithValue(error.response.data)
    }
})

export const touristSlice = createSlice({
    name: "tourist",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTourists.fulfilled, (state, { payload }: PayloadAction<any>) => {
            state.touristList = payload
        })
        builder.addCase(getTourists.rejected, (state, { payload }: PayloadAction<any>) => {
            state.touristList = {}
        })
    },
});

export default touristSlice.reducer;