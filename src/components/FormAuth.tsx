import { Button, Form, Input } from "antd";
import React from "react";
import { CreateTodo, TodoTask } from "../types/types";

type Props = {
  onFinish: (values: CreateTodo, id?: number) => void;
  isRegister?: boolean;
  initialValue?: TodoTask;
};

const FormAuth: React.FC<Props> = (props) => {
  const { onFinish, isRegister } = props;

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const validateMessages = {
    required: "${label} обязательный параметр!",
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
      validateMessages={validateMessages}
    >
      {isRegister && (
        <Form.Item
          name={["auth", "fullName"]}
          label="Полное имя"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      )}
      <Form.Item
        name={["auth", "email"]}
        label="Почта"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["auth", "password"]}
        label="Пароль"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button htmlType="submit" type="primary">
          {isRegister ? "Зарегистрироваться" : "Авторизироваться"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormAuth;
