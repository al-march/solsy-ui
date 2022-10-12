import {MenuSelectors} from './Menu';
import {ParentProps} from 'solid-js';

type MenuOptionProps = {
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const MenuOption = (props: ParentProps<MenuOptionProps>) => {
  function onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      props.onClick?.();
    }
  }

  return (
    <li
      data-testid={MenuSelectors.OPTION}
      onKeyDown={onKeyDown}
      onClick={props.onClick}
      classList={{
        disabled: !!props.disabled,
      }}
    >
      <button classList={{active: !!props.active}} disabled={!!props.disabled}>
        {props.children}
      </button>
    </li>
  );
};
