import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ClipPage from "./components/ClipPage";
import MainPage from "./components/MainPage";
import Header from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/clip" element={<ClipPage />} />
        <Route main path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
