import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  todosStatus: string;
  onRemoveCompleted: () => void;
  onChangeStatus: (status: string) => void;
}

export const Footer: FC<Props> = (props) => {
  const {
    todos,
    todosStatus,
    onChangeStatus,
    onRemoveCompleted,
  } = props;

  const todosLength = todos.filter((todo) => !todo.completed).length;
  const isCompletedTodo = todos.some((todo) => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', {
            selected: todosStatus === 'all',
          })}
          onClick={() => {
            onChangeStatus('all');
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: todosStatus === 'active',
          })}
          onClick={() => {
            onChangeStatus('active');
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: todosStatus === 'completed',
          })}
          onClick={() => {
            onChangeStatus('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {isCompletedTodo
      && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={onRemoveCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
