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
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={props.onClick}
      classList={{
        disabled: !!props.disabled,
      }}
    >
      <a classList={{active: !!props.active}}>{props.children}</a>
    </li>
  );
};
