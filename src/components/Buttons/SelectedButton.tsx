import cn from 'classnames';
import { FC } from 'react';

interface Props {
  isSelected: boolean;
  onSelectAll: () => Promise<void>;
}

export const SelectedButton: FC<Props> = (props) => {
  const { isSelected, onSelectAll } = props;

  return (
    <button
      data-cy="ToggleAllButton"
      type="button"
      className={cn(
        'todoapp__toggle-all', { active: !isSelected },
      )}
      onClick={onSelectAll}
    />
  );
};
