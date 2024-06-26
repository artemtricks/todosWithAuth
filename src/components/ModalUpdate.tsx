import { Button, Modal } from "antd";
import React from "react";
import FormToAdd from "./FormToAdd";
import { CreateTodo, TodoTask } from "../types/types";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "../redux/todoSlice";
import { selectorIsAuth } from "../redux/authSlice";
import { Link } from "react-router-dom";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue: TodoTask | undefined;
  setInitialValue: React.Dispatch<React.SetStateAction<TodoTask | undefined>>;
};

const ModalUpdate = (props: Props) => {
  const { isModalOpen, setIsModalOpen, initialValue, setInitialValue } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector(selectorIsAuth);

  const handleCloseModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setInitialValue(undefined);
    setIsModalOpen(false);
  };

  const onFinish = React.useCallback(
    (values: any) => {
      const todoWithId = {
        id: initialValue?.id,
        ...values.task,
      };
      //@ts-ignore
      dispatch(updateTodo(todoWithId));
      setInitialValue(undefined);
      setIsModalOpen(false);
    },
    [initialValue?.id]
  );

  return (
    <Modal
      title={
        isAuth
          ? "Редактирование"
          : "Для редактирования задачи нужно авторизироваться!"
      }
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      {isAuth ? (
        <FormToAdd isUpdate onFinish={onFinish} initialValue={initialValue} />
      ) : (
        <div style={{ textAlign: "center" }}>
          <Link to={"/auth"}>
            <Button> Перейти на авторизацию</Button>
          </Link>
        </div>
      )}
    </Modal>
  );
};

export default ModalUpdate;
