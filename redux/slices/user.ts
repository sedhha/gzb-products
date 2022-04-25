import {
  IUserState,
  IFunFuseUserData,
} from '@constants/interfaces/funfuse/backend/Auth.interfaces';
import { firestoreProfile } from '@redux-apis/external/firestoreProfile';
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
    updateDp: (state: IUserState, action: PayloadAction<string>) => {
      state.displayPicture = action.payload;
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
    builder.addCase(getFireStoreUser.pending, (state: IUserState) => {
      state.loading = true;
    });
    builder.addCase(getFireStoreUser.fulfilled, (state: IUserState, action) => {
      const payload = action.payload as {
        error: boolean;
        message: string;
        data: IFunFuseUserData;
      };
      if (payload.error) {
        state.errorNotifications = { error: true, message: payload.message };
        state.loading = false;
      } else {
        state.firestoreUser = payload.data;
        state.loading = false;
      }
    });
    builder.addCase(getFireStoreUser.rejected, (_: IUserState, action) => {
      console.log('Get Firestore Action Rejected = ', action);
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

export const getFireStoreUser = createAsyncThunk(
  'userSlice/firestoreUser',
  async (firebaseToken: string) => {
    const data = await firestoreProfile(firebaseToken);
    return data;
  }
);

export const { updateUserVerification, logOut, updateDp } = userSlice.actions;
export default userSlice.reducer;

/*

Playing Around with Users:
  https://firebase.google.com/docs/auth/admin/manage-users#update_a_user

*/
