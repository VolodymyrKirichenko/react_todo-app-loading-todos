import { FC, useEffect } from 'react';
import cn from 'classnames';

interface Props {
  isError: boolean;
  onCloseError: () => void;
}

export const ErrorMessage: FC<Props> = (props) => {
  const { isError, onCloseError } = props;

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        onCloseError();
      }, 3000);
    }
  }, [isError]);

  return (
    <div
      data-cy="ErrorNotification"
      className={cn(
        'notification',
        'is-danger',
        'is-light',
        'has-text-weight-normal',
        { hidden: !isError },
      )}
    >
      <button
        data-cy="HideErrorButton"
        type="button"
        className="delete"
        onClick={onCloseError}
      />

      Unable to add a todo
      <br />
      Unable to delete a todo
      <br />
      Unable to update a todo
    </div>
  );
};
