import {Dropdown} from '../../actions';
import {PropChangeEvent, PropFocusEvent, PropInputEvent} from '../../types';
import {Input, InputColor, InputSize} from '../input';
import {
  createContext,
  createEffect,
  createSignal,
  on,
  ParentProps,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';

export const AutocompleteSelectors = {
  AUTOCOMPLETE: 'input',
  DROPDOWN: 'autocomplete-dropdown',
  OPTION: 'option',
};

type AutocompleteState = {
  value: string;
  isOpen: boolean;
  isClose: boolean;
};

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
};

export const Autocomplete = (props: ParentProps<AutocompleteProps>) => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const [width, setWidth] = createSignal(0);
  const [state, setState] = createStore<AutocompleteState>({
    value: props.value || '',
    isOpen: !!props.show,
    get isClose() {
      return !this.isOpen;
    },
  });

  createEffect(
    on(ref, ref => {
      setWidth(ref?.offsetWidth || 0);
    })
  );

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
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (ref()?.contains(target)) {
      return;
    }
    setState('isOpen', false);
  };

  return (
    <AutocompleteCtx.Provider
      value={{
        state,
        setValue,
        checkOption,
      }}
    >
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

      <Dropdown
        trigger={ref()}
        show={state.isOpen && !!ref()}
        onBackdropClick={onBackdropClick}
      >
        <div
          data-testid={AutocompleteSelectors.DROPDOWN}
          class="max-h-60 w-32 overflow-y-scroll"
          style={{width: width() + 'px'}}
        >
          <ul class="menu bg-base-200 z-10 shadow-xl">{props.children}</ul>
        </div>
      </Dropdown>
    </AutocompleteCtx.Provider>
  );
};

type AutocompleteCtx = {
  state: AutocompleteState;
  setValue: (v: any) => void;
  checkOption: (v: any) => void;
};

const AutocompleteCtx = createContext<AutocompleteCtx>();

export const useAutocomplete = () => {
  const ctx = useContext(AutocompleteCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for autocomplete');
};
