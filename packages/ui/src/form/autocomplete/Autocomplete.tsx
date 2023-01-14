import {Dropdown} from '../../actions';
import {PropFocusEvent, PropInputEvent} from '../../types';
import {Input, InputProps} from '../input';
import {
  createContext,
  createEffect,
  createSignal,
  on,
  splitProps,
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
} & InputProps;

export const Autocomplete = (props: AutocompleteProps) => {
  const [local, others] = splitProps(props, [
    'value',
    'show',
    'ref',
    'onInput',
    'onFocus',
    'autocomplete',
    'children',
  ]);

  const [ref, setRef] = createSignal<HTMLElement>();
  const [width, setWidth] = createSignal(0);
  const [state, setState] = createStore<AutocompleteState>({
    value: local.value || '',
    isOpen: !!local.show,
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

    if (typeof local.onInput === 'function') {
      local.onInput(e);
    }
  }

  function onFocus(e: PropFocusEvent<HTMLInputElement>) {
    setState('isOpen', true);
    if (typeof local.onFocus === 'function') {
      local.onFocus(e);
    }
  }

  function setInputRef(el: HTMLInputElement) {
    setRef(el);
    if (typeof local.ref === 'function') {
      local.ref(el);
    }
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
        ref={setInputRef}
        value={state.value}
        autocomplete="off"
        onInput={onInput}
        onFocus={onFocus}
        {...others}
      />

      <Dropdown
        trigger={ref()}
        autofocus={false}
        show={state.isOpen && !!ref()}
        onBackdropClick={onBackdropClick}
      >
        <div
          data-testid={AutocompleteSelectors.DROPDOWN}
          class="max-h-60 w-32 overflow-y-auto"
          style={{width: width() + 'px'}}
        >
          <ul class="menu bg-base-200 z-10 shadow-xl">{local.children}</ul>
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
