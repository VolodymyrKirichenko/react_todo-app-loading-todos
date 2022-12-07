import React,
{
  ChangeEvent,
  FC,
  useCallback, useContext,
  useState,
} from 'react';
import { createTodos } from '../../api/todos';
import { AuthContext } from '../Auth/AuthContext';

interface Props {
  newTodoField: React.RefObject<HTMLInputElement>;
  loadTodos: () => Promise<void>;
}

export const NewTodo: FC<Props> = (props) => {
  const {
    newTodoField,
    loadTodos,
  } = props;

  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);

  const user = useContext(AuthContext);

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  const createTodo = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimTitle = title.trim();

    if (!!trimTitle && user) {
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
        setIsError(true);
      }
    }
  }, [title]);

  return (
    <form onSubmit={createTodo}>
      {isError ? (
        <div>
          Loading
        </div>
      ) : (
        <input
          data-cy="NewTodoField"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleChangeTitle}
        />
      )}

    </form>
  );
};
