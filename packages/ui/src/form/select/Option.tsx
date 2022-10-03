import {PropFocusEvent, PropMouseEvent} from '../../types';
import {SelectSelectors, useSelect} from './Select';
import {createMemo, ParentProps} from 'solid-js';

type Props = {
  value: any;
  disabled?: boolean;
  onClick?: (e: PropMouseEvent) => void;
  onFocus?: (e: PropFocusEvent) => void;
  onBlur?: (e: PropFocusEvent) => void;
};

export const Option = (props: ParentProps<Props>) => {
  const select = useSelect();

  const onClick = (e: PropMouseEvent) => {
    select.check(props.value);
    props.onClick?.(e);
  };

  const active = createMemo(() => {
    if (typeof select.state.value === 'object') {
      const key = select.state.compareKey || '';
      if (!key) {
        console.error('cannot find "compareKey" for compare value as object');
      }
      return select.state.value[key] === props.value[key];
    }
    return select.state.value === props.value;
  });

  return (
    <li
      data-testid={SelectSelectors.OPTION}
      classList={{
        disabled: props.disabled,
      }}
    >
      <button
        data-testid={SelectSelectors.OPTION_BUTTON}
        onClick={onClick}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        class={SelectSelectors.OPTION_BUTTON}
        classList={{
          active: active(),
        }}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </li>
  );
};
