import React, {
  ChangeEvent, useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from '../../components/Auth/AuthContext';
import { Todo } from '../../types/Todo';
import {
  createTodos, deleteTodo, getTodos, updateTodo,
} from '../../api/todos';

export const useApp = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [todosStatus, setTodosStatus] = useState('all');
  const [title, setTitle] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const handleLoadingError = useCallback((error: string) => {
    setHasLoadingError(true);

    throw new Error(error);
  }, []);

  const handleChangeStatus = useCallback((status: string) => {
    setTodosStatus(status);
  }, []);

  const handleError = useCallback(() => {
    setHasLoadingError(false);
  }, []);

  const filteredTodo = todos.filter((todo) => {
    switch (todosStatus) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  }, []);

  const loadTodos = useCallback(async () => {
    if (user) {
      try {
        const todosFromServer = await getTodos(user.id);

        setTodos(todosFromServer);
      } catch (error) {
        handleLoadingError('Error');
      }
    }
  }, []);

  const createTodo = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const newTodo = {
        userId: user.id,
        title,
        completed: false,
      };

      try {
        await createTodos(newTodo);
        setTitle('');
        loadTodos();
      } catch {
        setHasLoadingError(true);
      }
    }
  }, [title]);

  const removeTodo = useCallback(async (todo: Todo) => {
    try {
      await deleteTodo(todo);
      loadTodos();
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  const removeCompleted = useCallback(async () => {
    todos.map(async todo => {
      if (todo.completed) {
        deleteTodo(todo);
        try {
          await deleteTodo(todo);
          loadTodos();
        } catch {
          setHasLoadingError(true);
        }
      }
    });
  }, [todos]);

  const selectedComplete = useCallback(async (todo: Todo) => {
    try {
      await updateTodo(todo.id, !todo.completed);
      loadTodos();
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  const selectAll = useCallback(async () => {
    todos.map(async (todo) => {
      if (!todo.completed && !isSelected) {
        await selectedComplete(todo);
      } else if
      (todo.completed && isSelected) {
        await selectedComplete(todo);
      }
    });

    setIsSelected(!isSelected);
  }, [todos]);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadTodos();
    }
  }, [user]);

  return {
    title,
    todos,
    selectAll,
    loadTodos,
    removeTodo,
    createTodo,
    isSelected,
    todosStatus,
    handleError,
    filteredTodo,
    newTodoField,
    removeCompleted,
    hasLoadingError,
    handleChangeTitle,
    handleChangeStatus,
  };
};
