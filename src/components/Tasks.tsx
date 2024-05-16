import { Button, List, Checkbox } from "antd";
import React from "react";
import { TodoTask } from "../types/types";
import ModalUpdate from "./ModalUpdate";
import { deleteTodo, fetchTodos } from "../redux/todoSlice";
import { useDispatch, useSelector } from "react-redux";

const Tasks = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    //@ts-ignore
    dispatch(fetchTodos());
  }, []);
  //@ts-ignore
  const { todo, status } = useSelector((state) => state.todo);

  const handleDeleteTodo = (id: number) => {
    //@ts-ignore
    dispatch(deleteTodo(id));
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [initialValue, setInitialValue] = React.useState<undefined | TodoTask>(
    undefined
  );

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={todo as TodoTask[]}
        loading={status === "loading"}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Checkbox
              style={{ marginRight: 10 }}
              checked={item.complited}
              disabled
            />
            <List.Item.Meta title={item.title} description={item.description} />
            <Button
              style={{ marginRight: 10 }}
              onClick={() => {
                setInitialValue(item), setIsModalOpen((prev) => !prev);
              }}
            >
              Редактировать
            </Button>
            <Button onClick={() => handleDeleteTodo(item.id)}>Удалить</Button>
          </List.Item>
        )}
      />
      <ModalUpdate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        initialValue={initialValue}
        setInitialValue={setInitialValue}
      />
    </>
  );
};

export default Tasks;
