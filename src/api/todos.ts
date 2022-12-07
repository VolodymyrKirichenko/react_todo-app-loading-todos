import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = async (userId: number) => {
  return await client.get<Todo[]>(`/todos?userId=${userId}`) || null;
};

export const createTodos = async (todo: Omit<Todo, 'id'>) => {
  const { userId, title, completed } = todo;

  return client.post<Todo>('/todos', {
    userId, title, completed,
  });
};

export const deleteTodo = async (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = async (todoId: number, completed: boolean) => {
  return client.patch(`/todos/${todoId}`, { completed });
};
