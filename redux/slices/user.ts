import { IUserState } from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { loginUserWithToken } from '@redux-apis/external/login';
import { userInitial } from '@redux-constants/user';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {
    logOut: () => userInitial,
    updateUserVerification: (
      state: IUserState,
      action: PayloadAction<boolean>
    ) => {
      state.isUserVerified = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const data = action.payload.data as IUserState;
      state.isLoggedIn = data.isLoggedIn;
      state.firebaseToken = data.firebaseToken;
      state.user = data.user;
    });
    builder.addCase(loginUser.rejected, (state: IUserState, action) => {
      console.log('Action Rejected = ', action);
    });
  },
});

export const loginUser = createAsyncThunk(
  'userSlice/login',
  async (firebaseToken: string) => {
    const data = await loginUserWithToken(firebaseToken);
    return data;
  }
);

export const { updateUserVerification } = userSlice.actions;
export default userSlice.reducer;

/*

Playing Around with Users:
  https://firebase.google.com/docs/auth/admin/manage-users#update_a_user

*/
