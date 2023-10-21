import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

// Get User From LocalStroage

// const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  loadingUpdate: false,
  ErrorUpdate: false,
  Shipingaddress: localStorage.getItem("ShipingAddress")
    ? JSON.parse(localStorage.getItem("ShipingAddress"))
    : {},
};

// Register User
export const register = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      return await userService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// AccountConfirmation
export const accountconfirm = createAsyncThunk(
  "verifyEmail",
  async (id, thunkAPI) => {
    try {
      return await userService.accountconfirm(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const VerifedEmail = createAsyncThunk(
  "verifyEmail",
  async (emailToken, thunkAPI) => {
    try {
      return await userService.verifyEmail(emailToken);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// changePassword
export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, thunkAPI) => {
    try {
      return await userService.changePassword(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loginGoogle = createAsyncThunk(
  "user/login/google",
  async (_, thunkAPI) => {
    try {
      return await userService.loginGoogle();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get USer Google
export const getUserGoogle = createAsyncThunk(
  "user/goolge",
  async (_, thunkAPI) => {
    try {
      return await userService.getUser();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User
export const login = createAsyncThunk("user/Login", async (user, thunkAPI) => {
  try {
    return await userService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// ResetPassWord
export const resetMyPassword = createAsyncThunk(
  "reset/Password",
  async (email, thunkAPI) => {
    try {
      return await userService.resetPassword(email);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Updata User Info
export const UpdataUserInfo = createAsyncThunk(
  "user/updatainfo",
  async (userdata, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return await userService.updateInfo(userdata, Token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Contact
export const sendMessage = createAsyncThunk(
  "user/message",
  async (messageData, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return userService.sendMessage(messageData, Token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Set Address For User
export const setAddress = createAsyncThunk(
  "user/setaddress",
  async (addressdata, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return userService.setAddress(addressdata, Token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// GEt Address For User
export const getAddress = createAsyncThunk(
  "user/getaddress",
  async (_, thunkAPI) => {
    try {
      const Token = thunkAPI.getState().user.user.Token;
      return userService.getAddress(Token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Log Out
export const logout = createAsyncThunk(
  "user/Logout ",
  async (user, thunkAPI) => {
    await userService.logout();
  }
);
export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.Shipingaddress = [];
       state.message = "";
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      }) //
      .addCase(getUserGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(setAddress.fulfilled, (state, action) => {
        state.Shipingaddress = action.payload;
      })
      .addCase(getAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.Shipingaddress = action.payload;
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(UpdataUserInfo.pending, (state) => {
        state.loadingUpdate = true;
      })
      .addCase(UpdataUserInfo.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.user = action.payload;
      })
      .addCase(UpdataUserInfo.rejected, (state) => {
        state.ErrorUpdate = false;
      })
      .addCase(VerifedEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifedEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(VerifedEmail.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(resetMyPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetMyPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resetMyPassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset ,updateUser} = userSlice.actions;
export default userSlice.reducer;
