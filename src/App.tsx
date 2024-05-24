import { Suspense } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Complited from "./pages/Complited";
import Task from "./components/Tasks";
import MainHeader from "./components/Header";
import { Layout } from "antd";
import MainForm from "./pages/MainForm";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import MainPageAuth from "./pages/MainPageAuth";
import React from "react";
import { authMe } from "./redux/authSlice";

const App = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const data = useSelector((state) => state.auth);
  console.log(data, "data");

  React.useEffect(() => {
    //@ts-ignore
    dispatch(authMe());
  }, []);

  return (
    <Layout>
      <div>
        <MainHeader />
        <Routes>
          <Route path="" element={<Home />} />
          <Route
            path="/form"
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <MainForm />
              </Suspense>
            }
          />
          {/* <Route
            path="task/:id"
            element={
              <Suspense fallback={<div>Идет загрузка...</div>}>
                <Task />
              </Suspense>
            }
          /> */}
          <Route path="/auth" element={<MainPageAuth />} />
          <Route
            path="*"
            element={
              <Suspense
                fallback={<div className="container">Идет загрузка...</div>}
              >
                <div>Нет такой страницы</div>
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Layout>
  );
};

const AppWithRouts = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

export default AppWithRouts;
