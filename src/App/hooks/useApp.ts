import {
  useCallback, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { AuthContext } from '../../components/Auth/AuthContext';
import { Todo } from '../../types/Todo';
import {
  deleteTodo, getTodos, updateTodo,
} from '../../api/todos';

export const useApp = () => {
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasLoadingError, setHasLoadingError] = useState(false);
  const [todosStatus, setTodosStatus] = useState('all');
  const [isSelected, setIsSelected] = useState(false);

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

  const filteredTodo = useMemo(() => (
    todos.filter((todo) => {
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
    })
  ), [todos, todosStatus]);

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

  const removeTodo = useCallback(async (todo: Todo) => {
    try {
      await deleteTodo(todo.id);
      loadTodos();
    } catch {
      setHasLoadingError(true);
    }
  }, []);

  const removeCompleted = useCallback(async () => {
    Promise.all(todos.map(async todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
        try {
          await deleteTodo(todo.id);
          loadTodos();
        } catch {
          setHasLoadingError(true);
        }
      }
    }));
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
    Promise.all(todos.map(async (todo) => {
      if (!todo.completed && !isSelected) {
        await selectedComplete(todo);
      } else if
      (todo.completed && isSelected) {
        await selectedComplete(todo);
      }
    }));

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
    todos,
    selectAll,
    loadTodos,
    removeTodo,
    isSelected,
    todosStatus,
    handleError,
    filteredTodo,
    newTodoField,
    removeCompleted,
    hasLoadingError,
    handleChangeStatus,
  };
};
