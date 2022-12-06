import { FC } from 'react';
import { TodoList } from '../components/TodoList/TodoList';
import { NewTodo } from '../components/NewTodo/NewTodo';
import { Footer } from '../components/Footer/Footer';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { SelectedButton } from '../components/Buttons/SelectedButton';
import { useApp } from './hooks/useApp';

export const App: FC = () => {
  const {
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
  } = useApp();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <SelectedButton
            isSelected={isSelected}
            onSelectAll={selectAll}
          />

          <NewTodo
            title={title}
            onCreateTodo={createTodo}
            newTodoField={newTodoField}
            onChangeTitle={handleChangeTitle}
          />
        </header>

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodo}
              onDelete={removeTodo}
              onUpdate={loadTodos}
            />
            <Footer
              todos={todos}
              todosStatus={todosStatus}
              onChangeStatus={handleChangeStatus}
              onRemoveCompleted={removeCompleted}
            />
          </>
        )}
      </div>

      <ErrorMessage
        isError={hasLoadingError}
        onCloseError={handleError}
      />
    </div>
  );
};
