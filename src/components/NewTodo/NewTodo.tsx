import React, { ChangeEvent, FC } from 'react';

interface Props {
  title: string;
  onCreateTodo: (e: React.FormEvent) => void;
  newTodoField: React.RefObject<HTMLInputElement>;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NewTodo: FC<Props> = (props) => {
  const {
    title,
    newTodoField,
    onCreateTodo,
    onChangeTitle,
  } = props;

  return (
    <form onSubmit={onCreateTodo}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={onChangeTitle}
      />
    </form>
  );
};
