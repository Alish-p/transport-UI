import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  subtrips: [],
  subtrip: null,
};

const subtripSlice = createSlice({
  name: 'subtrip',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getSubtripsSuccess(state, action) {
      state.isLoading = false;
      state.subtrips = action.payload;
    },
    getSubtripSuccess(state, action) {
      state.isLoading = false;
      state.subtrip = action.payload;
    },
    addSubtripSuccess(state, action) {
      state.isLoading = false;
      state.subtrips.push(action.payload);
    },
    updateSubtripSuccess(state, action) {
      state.isLoading = false;
      const index = state.subtrips.findIndex((subtrip) => subtrip.id === action.payload.id);
      if (index !== -1) {
        state.subtrips[index] = action.payload;
      }
    },
    deleteSubtripSuccess(state, action) {
      state.isLoading = false;
      state.subtrips = state.subtrips.filter((subtrip) => subtrip.id !== action.payload);
    },
    resetSubtrip(state) {
      state.subtrip = null;
    },
  },
});

export const {
  startLoading,
  hasError,
  getSubtripsSuccess,
  getSubtripSuccess,
  resetSubtrip,
  updateSubtripSuccess,
  addSubtripSuccess,
  deleteSubtripSuccess,
} = subtripSlice.actions;

export default subtripSlice.reducer;

export const fetchSubtrips = () => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get('/api/subtrips');
    dispatch(getSubtripsSuccess(response.data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const fetchSubtrip = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`/api/subtrips/${id}`);
    dispatch(getSubtripSuccess(response.data.subtrip));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const addSubtrip = (data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.post(`/api/subtrips`, data);
    dispatch(addSubtripSuccess(response.data.subtrip));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const updateSubtrip = (id, data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.put(`/api/subtrips/${id}`, data);
    dispatch(updateSubtripSuccess(response.data.subtrip));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const deleteSubtrip = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    await axios.delete(`/api/subtrips/${id}`);
    dispatch(deleteSubtripSuccess(id));
  } catch (error) {
    dispatch(hasError(error));
  }
};
