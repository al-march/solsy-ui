import {DaisyColor, DaisySize} from '../../types';
import {SelectDropdown} from './SelectDropdown';
import {SelectField} from './SelectField';
import {
  createContext,
  createEffect,
  createSignal,
  JSXElement,
  mergeProps,
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
  disabled?: boolean;
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
  // compareKey is needed to detect active element
  compareKey?: string;
};

export const Select = (props: ParentProps<SelectProps>) => {
  const pr = mergeProps({class: '', classList: {}, value: ''}, props);

  const [reference, setReference] = createSignal<HTMLElement>();

  const [state, setState] = createStore<SelectState>({
    value: pr.value,
    isOpen: !!pr.show,
    compareKey: pr.compareKey,

    get isClose() {
      return !this._isOpen;
    },
  });

  createEffect(() => {
    const value = pr.value;
    setState('value', reconcile(value, {merge: true}));
  });

  const setValue = (value: any) => {
    if (typeof value === 'object') {
      setState('value', {...value});
    } else {
      setState('value', value);
    }

    pr.onInput?.(value);
  };

  const open = () => {
    setState('isOpen', true);
    pr.onOpen?.();
  };

  const close = () => {
    setState('isOpen', false);
    pr.onClose?.();
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
      <SelectField
        data-testid={SelectSelectors.SELECT}
        ref={setReference}
        size={pr.size}
        color={pr.color}
        class={pr.class}
        bordered={pr.bordered}
        error={pr.error}
        onClick={open}
        onFocus={open}
        disabled={pr.disabled}
      >
        <span data-testid={SelectSelectors.CUSTOM_VIEW}>
          {state.value && pr.customValue?.(state.value)}
        </span>

        <input
          data-testid={SelectSelectors.INPUT}
          type="text"
          class="bg-inherit h-full border-none cursor-pointer"
          classList={{
            hidden: !!pr.customValue && state.value,
          }}
          disabled
          value={state.value}
          placeholder={pr.placeholder || ''}
          name={pr.name}
        />
      </SelectField>

      <SelectDropdown show={state.isOpen} reference={reference} onClose={close}>
        {pr.children}
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
