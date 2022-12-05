import { FC, useCallback } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { updateTodo } from '../../api/todos';

interface Props {
  todo: Todo;
  onDelete: (todo: Todo) => void;
  onUpdate: () => void;
}

export const TodoItem: FC<Props> = (props) => {
  const { todo, onDelete, onUpdate } = props;

  const handleUpdate = useCallback(async () => {
    try {
      await updateTodo(todo.id, !todo.completed);
      onUpdate();
    } catch {
      throw new Error('Error');
    }
  }, [todo]);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked
          onChange={handleUpdate}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button
        type="button"
        onClick={() => onDelete(todo)}
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
