import React from "react";
import Layout from "antd/es/layout/layout";
import { CreateTodo } from "../types/types";
import { createNewTodo } from "../redux/todoSlice";

import FormToAdd from "../components/FormToAdd";
import { useDispatch, useSelector } from "react-redux";
import { selectorIsAuth } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { Button } from "antd";

const MainForm = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);
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
        {isAuth
          ? "Добавление новой задачи"
          : "Необходимо авторизироваться или зарегистрироваться"}
      </h1>
      {isAuth ? (
        <FormToAdd onFinish={onFinish} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Link to={"/auth"}>
            <Button> Перейти на авторизацию</Button>
          </Link>
        </div>
      )}
    </Layout>
  );
};

export default MainForm;
