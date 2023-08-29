// This code defines another Redux slice for managing authentication-related state using the createSlice function from @reduxjs/toolkit. Let's review the key points:


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authInitialState {
  userInfo:
    | undefined
    | {
        uid: string;
        email: string;
        name: string;
      };
  isDarkTheme: boolean;
}
// An interface authInitialState is defined to represent the initial state of the authentication slice. It includes two properties:

// userInfo: A union type that can be either undefined or an object containing uid, email, and name properties representing the user information.

// isDarkTheme: A boolean flag indicating whether the dark theme is enabled or not.


const initialState: authInitialState = {
  userInfo: undefined,
  isDarkTheme: false,
};
// The initialState constant is defined, setting the initial value of the auth slice state. It initializes userInfo as undefined and isDarkTheme as false.


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.isDarkTheme = action.payload.isDarkTheme;
    },
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        email: string;
        name: string;
      }>
    ) => {
      state.userInfo = action.payload;
    },
  },
});

// The createSlice function is used to create the Redux slice. It takes an object with the following properties:

// name: The name of the slice, used as a prefix for the action types.

// initialState: The initial state of the slice.

// reducers: An object that defines the reducer functions for handling actions. Each property of this object corresponds to an action type, and the corresponding value is the reducer function that updates the state based on the action payload.

// In this case, there are two actions defined:

// changeTheme: This action takes the state and action parameters and sets the isDarkTheme property in the state to the payload of the action.

// setUser: This action takes the state and an action payload of type { uid: string; email: string; name: string; }. It updates the userInfo property in the state with the provided user information.

// The createSlice function generates action creators based on the reducers object. It will generate action creators called setUser and changeTheme, which can be used to dispatch the corresponding actions with the appropriate payload.

// The generated action creators and reducer functions are automatically exported by the createSlice function.


export const { setUser, changeTheme } = authSlice.actions;


// This Redux slice can now be included in the Redux store by combining it with other slices using the combineReducers function, and then creating a store using the configureStore function. The action creators setUser and changeTheme can be used in components to dispatch the corresponding actions and update the state in the Redux store.
