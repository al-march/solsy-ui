import {MenuSelectors} from './Menu';
import {mergeProps, ParentProps} from 'solid-js';

type MenuOptionProps = {
  class?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const MenuOption = (props: ParentProps<MenuOptionProps>) => {
  const pr = mergeProps({class: ''}, props);

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
      <button
        classList={{
          [pr.class]: !!pr.class,
          active: !!props.active,
        }}
        disabled={!!props.disabled}
      >
        {props.children}
      </button>
    </li>
  );
};
