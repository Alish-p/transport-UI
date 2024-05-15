import { createSlice } from "@reduxjs/toolkit";
import { _vehicleList } from "../../_mock/arrays";
import axios from "../../utils/axios";

const initialState = {
  isLoading: false,
  error: null,
  vehicles: [],
  vehicle: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getVehiclesSuccess(state, action) {
      state.isLoading = false;
      state.vehicles = action.payload;
    },
    getVehicleSuccess(state, action) {
      state.isLoading = false;
      state.vehicle = action.payload;
    },
    updateVehicleSuccess(state, action) {
      state.isLoading = false;
      state.vehicle = action.payload;
    },
    resetVehicle(state) {
      state.vehicle = null;
    },
  },
});

export const {
  startLoading,
  hasError,
  getVehiclesSuccess,
  getVehicleSuccess,
  resetVehicle,
  updateVehicleSuccess,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;

export const fetchVehicles = () => async (dispatch) => {
  // dispatch(startLoading());
  try {
    // const response = await axios.get('/api/vehicles');
    dispatch(getVehiclesSuccess(_vehicleList));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const fetchVehicle = (id) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.get(`/api/vehicles/${id}`);
    dispatch(getVehicleSuccess(response.data.vehicle));
  } catch (error) {
    dispatch(hasError(error));
  }
};

export const updateVehicle = (id, data) => async (dispatch) => {
  dispatch(startLoading());
  try {
    const response = await axios.put(`/api/vehicles/${id}`, data);
    dispatch(updateVehicleSuccess(response.data.vehicle));
  } catch (error) {
    dispatch(hasError(error));
  }
};
