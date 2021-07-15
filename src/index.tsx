import React from "react"

import { FirebaseAuthProvider } from "@react-firebase/auth"
import ReactDOM from "react-dom"
import "./index.css"
import { Provider } from "react-redux"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"

import firebase from "firebase"

import App from "./App"
import { rrfProps, store } from "./app/store"
import * as serviceWorker from "./serviceWorker"
import firebaseConfig from "./shared/utils/firebaseConfig"

import "firebase/auth"

const auth = firebase.auth()
const db = firebase.database()
if (process.env.NODE_ENV === "development") {
  // Point to the RTDB emulator running on localhost.
  auth.useEmulator("http://localhost:9099")
  db.useEmulator("localhost", 9000)
}

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider {...firebaseConfig} firebase={firebase}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <App />
        </ReactReduxFirebaseProvider>
      </Provider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
