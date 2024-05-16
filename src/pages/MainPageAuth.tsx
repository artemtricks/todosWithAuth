import React from "react";
import Layout from "antd/es/layout/layout";
import { useDispatch } from "react-redux";
import FormAuth from "../components/FormAuth";
import { authTodos, registerTodos } from "../redux/authSlice";
import { Button } from "antd";

const MainPageAuth = () => {
  const [isRegister, setIsRegister] = React.useState(false);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    //@ts-ignore
    isRegister ? dispatch(registerTodos(values)) : dispatch(authTodos(values));
  };

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
