import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import authReducer from "./state";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { encryptTransform } from "redux-persist-transform-encrypt";

const encryptor = encryptTransform({
  secretKey: "your-secret-key",
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  rootElement
);
