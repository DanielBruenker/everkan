import { Color } from "@material-ui/lab";
import { createSlice } from "@reduxjs/toolkit";

interface alertState {
  alerts: {
    message: string;
    type: Color;
    visible: boolean;
  }[];
}

const initialState: alertState = {
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState: initialState,
  reducers: {
    addAlert(state, action) {
      state.alerts.push({
        message: action.payload.alert.message,
        type: action.payload.alert.type,
        visible: true,
      });
    },
    hideAlert(state, action) {
      state.alerts[action.payload.index].visible = false;
    },
  },
});

export default alertSlice;
