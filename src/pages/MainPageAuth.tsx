import React from "react";
import Layout from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import FormAuth from "../components/FormAuth";
import { authTodos, registerTodos, selectorIsAuth } from "../redux/authSlice";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const MainPageAuth = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectorIsAuth);
  const [isRegister, setIsRegister] = React.useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    const data = isRegister
      ? //@ts-ignore
        await dispatch(registerTodos(values))
      : //@ts-ignore
        await dispatch(authTodos(values));
    const { payload } = data;
    //@ts-ignore
    if (!payload?.token) {
      return alert("Не удалось авторизоваться!");
    }
    //@ts-ignore
    if (payload.token) {
      //@ts-ignore
      window.localStorage.setItem("token", payload?.token);
    }
  };

  if (isAuth) {
    navigate("/");
  }

  return (
    <Layout style={{ height: "100vh", padding: 20, marginTop: 40 }}>
      <div style={{ maxWidth: 200 }}>
        <Button onClick={() => setIsRegister((prev) => !prev)}>
          {!isRegister ? "Зарегистрироваться " : "Уже зарегистрирован"}
        </Button>
      </div>
      <h1
        style={{
          marginTop: 20,
          marginBottom: 40,
          textAlign: "center",
          color: "black",
          fontWeight: "bold",
          fontSize: 30,
        }}
      >
        {isRegister ? "Регистрация " : "Авторизация"}
      </h1>
      <FormAuth onFinish={onFinish} isRegister={isRegister} />
    </Layout>
  );
};

export default MainPageAuth;
