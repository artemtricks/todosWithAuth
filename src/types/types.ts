export type TodoTask = {
  id: number;
  title: string;
  description: string;
  complited: boolean;
};

export type CreateTodo = {
  task: TodoTask & { complited: boolean };
};
