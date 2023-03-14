import React from "react";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import formsReducer from "./features/formSlice";
import postReducer from "./features/postSlice";

const store = configureStore({
  // 新しい状態にする
  reducer: {
    authForm: formsReducer,
    posts: postReducer,
  },
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
