/*eslint-disable */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { client } from "../constant/client";

const initialState = {
  userLoginInfo: null,
  globalRole: [],
  loading: false,
  userInfo: null,
  userRole: null,
  caraccess: null,
  detectedPark: null,
  updateResult: null,
  enableParkinglotResult: {
    allparkinglot: 0,
    residentparkinglot: -1,
    nonparkinglot: 0,
  },
  findparkingaccesscar: [
    {
      accessid: 0,
      accesscarnum: "0",
      intime: "2022-11-09T22:07:48.557849",
      outime: "2022-11-09T22:07:48.557849",
      validation: true,
      inimg:
        "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      outimg: "이상감지",
      registered: false,
      parkid: 1,
      detected: {
        detectedid: 2,
        checked: false,
      },
    },
  ],
};

export const mqttRequestAPI = createAsyncThunk(
  "user/mqttRequestAPI",
  async (data, thunkAPI) => {
    const response = await client.post("/api/mqtt/publish", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data;
  }
);

export const findParkInDetectedAPI = createAsyncThunk(
  "user/findParkInDetected",
  async (data, thunkAPI) => {
    const response = await client.get("/api/findparkingdetected", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data;
  }
);

export const updateCheckAPI = createAsyncThunk(
  "user/updatecheck",
  async (data, thunkAPI) => {
    const response = await client.put("/api/updatecheck", data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data;
  }
);

export const enableParkinglotAPI = createAsyncThunk(
  "user/enableparkinglot",
  async (data, thunkAPI) => {
    const response = await client.get("/api/enableparkinglot", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data;
  }
);

export const findparkingaccesscarAPI = createAsyncThunk(
  "user/api/findparkingaccesscar",
  async (data, thunkAPI) => {
    const response = await client.get("/api/findparkingaccesscar", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    });
    return response.data;
  }
);

const user = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.userInfo = action.payload;
    },
    setRollRequest: (state, action) => {
      state.loading = true;
      state.userRole = action.payload;
    },
    setCaraccessRequest: (state, action) => {
      console.log("actionactionactionactionaction::", action);
      state.loading = true;
      state.caraccess = [...action.payload].sort(
        (a, b) =>
          moment(b.intime).format("YYYYMMDDHHmmss") -
          moment(a.intime).format("YYYYMMDDHHmmss")
      );
    },
    setFilterdDetected: (state, action) => {
      state.filteredPark = action.payload;
    },
    changeValidation: (state, action) => {
      state.caraccess = state.caraccess.map((v) => {
        if (v.accessid === action.payload) {
          v.validation = false;
        }
        return v;
      });
    },
    setRoleRequest: (state, action) => {
      state.globalRole = action.payload;
    },
    setUserInfoRequest: (state, action) => {
      state.userLoginInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findParkInDetectedAPI.pending, (state, action) => {
      state.status = "Loading";
    }),
      builder.addCase(findParkInDetectedAPI.fulfilled, (state, action) => {
        state.status = "Success";
        state.detectedPark = action.payload;
      }),
      builder.addCase(findParkInDetectedAPI.rejected, (state, action) => {
        state.status = "Failure";
        state.detectedPark.error = true;
      }),
      builder.addCase(updateCheckAPI.pending, (state, action) => {
        state.status = "Loading";
      }),
      builder.addCase(updateCheckAPI.fulfilled, (state, action) => {
        state.status = "Success";
        state.updateResult = action.payload;
      }),
      builder.addCase(updateCheckAPI.rejected, (state, action) => {
        state.status = "Failure";
        state.updateResult.error = true;
      });
    builder.addCase(mqttRequestAPI.pending, (state, action) => {
      state.mqttLoading = true;
    }),
      builder.addCase(mqttRequestAPI.fulfilled, (state, action) => {
        state.mqttLoading = false;
        state.updateResult = action.payload;
      }),
      builder.addCase(mqttRequestAPI.rejected, (state, action) => {
        state.mqttLoading = false;
        state.updateResult.error = true;
      });
    builder.addCase(enableParkinglotAPI.pending, (state, action) => {
      state.enableLoading = true;
    }),
      builder.addCase(enableParkinglotAPI.fulfilled, (state, action) => {
        state.enableLoading = false;
        if (
          state.enableParkinglotResult.residentparkinglot !==
            action.payload.residentparkinglot ||
          state.enableParkinglotResult.nonparkinglot !==
            action.payload.nonparkinglot
        )
          state.enableParkinglotResult = action.payload;
      }),
      builder.addCase(enableParkinglotAPI.rejected, (state, action) => {
        state.enableLoading = false;
        state.enableParkinglotError = true;
      });
    builder.addCase(findparkingaccesscarAPI.pending, (state, action) => {
      state.findparkingaccesscarLoading = true;
    }),
      builder.addCase(findparkingaccesscarAPI.fulfilled, (state, action) => {
        state.findparkingaccesscarLoading = false;
        state.findparkingaccesscar = action.payload;
      }),
      builder.addCase(findparkingaccesscarAPI.rejected, (state, action) => {
        state.findparkingaccesscarLoading = false;
        state.findparkingaccesscarError = true;
      });
  },
});

export const userActions = user.actions;
export const userReducers = user.reducer;
