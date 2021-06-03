import {
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit"
import firebase from "firebase/app"
import {
  firebaseReducer,
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase"
import { constants as rfConstants } from "redux-firestore"

import firebaseConfig from "src/shared/utils/firebaseConfig"

import counterReducer from "../features/counter/counterSlice"

// eslint-disable-next-line import/no-duplicates
import "firebase/database"
// eslint-disable-next-line import/no-duplicates
import "firebase/auth"

const rrfConfig = {
  userProfile: "users",
}

firebase.initializeApp(firebaseConfig)

const typedFirebaseReducer: Reducer<any, AnyAction> = firebaseReducer

export const store = configureStore({
  reducer: {
    firebase: typedFirebaseReducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // just ignore every redux-firebase and react-redux-firebase action type
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`
          ),
        ],
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
    }),
})

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
