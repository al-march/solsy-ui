import { createContext, createSignal, ParentProps, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { Input, InputColor, InputSize } from '../input';
import { Menu } from '../../navigation';
import { PropChangeEvent, PropFocusEvent, PropInputEvent } from '../../types';
import { BackdropClick } from '../../utils';

export const AutocompleteSelectors = {
  AUTOCOMPLETE: 'input',
  DROPDOWN: 'dropdown',
  OPTION: 'option',
};

type AutocompleteState = {
  value: string;
  isOpen: boolean;
  isClose: boolean;
}

export type AutocompleteProps = {
  value?: string;
  show?: boolean;
  placeholder?: string;
  ref?: (el: HTMLInputElement) => void;

  color?: InputColor;
  size?: InputSize;
  class?: string;
  error?: boolean;
  bordered?: boolean;
  disabled?: boolean;

  onInput?: (e: PropInputEvent<HTMLInputElement>) => void;
  onChange?: (e: PropChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: PropFocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: PropFocusEvent<HTMLInputElement>) => void;
}

export const Autocomplete = (props: ParentProps<AutocompleteProps>) => {

  const [ref, setRef] = createSignal<HTMLElement>();
  const [state, setState] = createStore<AutocompleteState>({
    value: props.value || '',
    isOpen: !!props.show,
    get isClose() {
      return !this.isOpen;
    }
  });

  function setValue(v: any) {
    setState('value', v);
  }

  function checkOption(v: any) {
    setValue(v);
    setState('isOpen', false);
  }

  function onInput(e: PropInputEvent<HTMLInputElement>) {
    if (state.isClose) {
      setState('isOpen', true);
    }
    setValue((e.target as HTMLInputElement).value);
    props.onInput?.(e);
  }

  function onFocus(e: PropFocusEvent<HTMLInputElement>) {
    setState('isOpen', true);
    props.onFocus?.(e);
  }

  const onBackdropClick = (e: Event) => {
    const target = e.target as HTMLElement;
    if (ref()?.contains(target)) {
      return;
    }
    setState('isOpen', false);
  };

  return (
    <AutocompleteCtx.Provider value={{
      state,
      setValue,
      checkOption,
    }}>
      <Input
        data-testid={AutocompleteSelectors.AUTOCOMPLETE}
        ref={el => {
          setRef(el);
          props.ref?.(el);
        }}
        value={state.value}
        placeholder={props.placeholder}

        size={props.size}
        color={props.color}
        class={props.class}

        error={props.error}
        bordered={props.bordered}
        disabled={props.disabled}
        autocomplete="off"

        onInput={onInput}
        onFocus={onFocus}
        onBlur={props.onBlur}
        onChange={props.onChange}
      />

      <Menu reference={ref()} isShow={state.isOpen}>
        <BackdropClick onBackdropClick={onBackdropClick}>
          <div
            data-testid={AutocompleteSelectors.DROPDOWN}
            class="max-h-60 overflow-y-scroll"
            style={{width: ref()?.offsetWidth + 'px'}}
          >
            {props.children}
          </div>
        </BackdropClick>
      </Menu>
    </AutocompleteCtx.Provider>
  );
};

type AutocompleteCtx = {
  state: AutocompleteState;
  setValue: (v: any) => void;
  checkOption: (v: any) => void;
}

const AutocompleteCtx = createContext<AutocompleteCtx>();

export const useAutocomplete = () => {
  const ctx = useContext(AutocompleteCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for autocomplete');
};
