import {DaisyColor, DaisySize} from '../../types';
import {SelectDropdown} from './SelectDropdown';
import {
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  ParentProps,
  useContext,
} from 'solid-js';
import {createStore, reconcile} from 'solid-js/store';

export type SelectColor = DaisyColor | 'ghost';
export type SelectSize = DaisySize;

export const SelectSelectors = {
  SELECT: 'select',
  INPUT: 'select-input',
  CUSTOM_VIEW: 'select-custom',
  DROPDOWN: 'select-dropdown',
  OPTION: 'select-option',
  OPTION_BUTTON: 'select-option-btn',
};

type SelectState = {
  value: any;
  isOpen: boolean;
  isClose: boolean;
  compareKey?: string;
};

export type SelectProps = {
  placeholder?: string;
  name?: string;
  value?: any;
  show?: boolean;

  color?: SelectColor;
  size?: SelectSize;
  class?: string;
  bordered?: boolean;
  error?: boolean;

  onChange?: (e: InputEvent) => void;
  onInput?: (e: string | number) => void;
  onFocus?: (e: InputEvent) => void;
  onBlur?: (e: InputEvent) => void;

  onOpen?: () => void;
  onClose?: () => void;

  customValue?: (v: any) => JSXElement;
  compareKey?: string;
};

export const Select = (props: ParentProps<SelectProps>) => {
  const [reference, setReference] = createSignal<HTMLElement>();

  const [state, setState] = createStore<SelectState>({
    value: props.value,
    isOpen: !!props.show,
    compareKey: props.compareKey,

    get isClose() {
      return !this._isOpen;
    },
  });

  createEffect(() => {
    const value = props.value;
    setState('value', reconcile(value, {merge: true}));
  });

  const setValue = (value: any) => {
    if (typeof value === 'object') {
      setState('value', {...value});
    } else {
      setState('value', value);
    }

    props.onInput?.(value);
  };

  const open = () => {
    setState('isOpen', true);
    props.onOpen?.();
  };

  const close = () => {
    setState('isOpen', false);
    props.onClose?.();
  };

  const check = (value: any) => {
    setValue(value);
    close();
  };

  return (
    <SelectCtx.Provider
      value={{
        state,
        setValue,
        open,
        close,
        check,
      }}
    >
      <div
        data-testid={SelectSelectors.SELECT}
        ref={setReference}
        class={`select z-10 flex items-center ${props.class || ''}`}
        classList={{
          'select-lg': props.size === 'lg',
          'select-md': props.size === 'md',
          'select-sm': props.size === 'sm',
          'select-xs': props.size === 'xs',

          'select-primary': props.color === 'primary',
          'select-secondary': props.color === 'secondary',
          'select-accent': props.color === 'accent',
          'select-info': props.color === 'info',
          'select-success': props.color === 'success',
          'select-warning': props.color === 'warning',
          'select-error': props.color === 'error' || props.error,
          'select-ghost': props.color === 'ghost',

          'select-bordered': props.bordered,
        }}
        onClick={open}
        onFocus={open}
      >
        <span data-testid={SelectSelectors.CUSTOM_VIEW}>
          {state.value && props.customValue?.(state.value)}
        </span>

        <input
          data-testid={SelectSelectors.INPUT}
          type="text"
          class="bg-inherit h-full border-none cursor-pointer"
          classList={{
            hidden: !!props.customValue && state.value,
          }}
          disabled
          value={state.value}
          placeholder={props.placeholder || ''}
          name={props.name}
        />
      </div>

      <SelectDropdown show={state.isOpen} reference={reference} onClose={close}>
        {props.children}
      </SelectDropdown>
    </SelectCtx.Provider>
  );
};

type ContextType = {
  state: SelectState;
  setValue: (v: string) => void;
  open: () => void;
  close: () => void;
  check: (v: any) => void;
};

const SelectCtx = createContext<ContextType>();

export const useSelect = () => {
  const ctx = useContext(SelectCtx);
  if (ctx) {
    return ctx;
  }

  throw new Error('No context for Select');
};
