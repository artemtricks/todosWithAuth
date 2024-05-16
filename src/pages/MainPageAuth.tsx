import React from "react";
import Layout from "antd/es/layout/layout";
import { CreateTodo } from "../types/types";
import { createNewTodo } from "../redux/todoSlice";
import { useDispatch } from "react-redux";
import FormAuth from "../components/FormAuth";

const MainPageAuth = () => {
  const dispatch = useDispatch();

  const onFinish = React.useCallback(
    (values: CreateTodo) => {
      //@ts-ignore
      dispatch(createNewTodo({ ...values.task, complited: false }));
    },
    [createNewTodo]
  );

  return (
    <Layout style={{ height: "100vh", padding: 20, marginTop: 40 }}>
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
        Регистрация
      </h1>
      <FormAuth onFinish={onFinish} />
    </Layout>
  );
};

export default MainPageAuth;
