import {Dropdown} from '../../actions';
import {PropsKeyboardEvent} from '../../types';
import {Input, InputProps} from '../input';
import {
  createContext,
  createEffect,
  createSignal, JSX,
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
  options: Map<string, HTMLLIElement>;
  isOpen: boolean;
  isClose: boolean;
  focusedOption?: string;
};

type AutocompleteActions = {
  setValue: (v: string) => void;
  initOption: (v: string, el: HTMLLIElement) => void;
  checkOption: (v: string) => void;
};

export type AutocompleteProps = {
  value?: string;
  show?: boolean;
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
    'onKeyDown',
  ]);

  const [ref, setRef] = createSignal<HTMLElement>();
  const [dropdown, setDropdown] = createSignal<HTMLDivElement>();
  const [width, setWidth] = createSignal(0);
  const [state, setState] = createStore<AutocompleteState>({
    value: local.value || '',
    options: new Map(),
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

  const options = () => Array.from(state.options.values());

  function setValue(v: any) {
    setState('value', v);
  }

  function checkOption(v: any) {
    setValue(v);
    setState('isOpen', false);
  }

  const onInput: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (e) => {
    if (state.isClose) {
      setState('isOpen', true);
    }
    setValue((e.target as HTMLInputElement).value);
    if (typeof local.onInput === 'function') {
      local.onInput(e);
    }
  }

  const onFocus: JSX.FocusEventHandler<HTMLInputElement, FocusEvent> = (e) => {
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

  function onBackdropClick(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (ref()?.contains(target)) {
      return;
    }
    setState('isOpen', false);
  }

  function onKeyDown(e: PropsKeyboardEvent<HTMLInputElement>) {
    switch (e.code) {
      case 'ArrowDown':
        e.preventDefault();
        if (state.focusedOption) {
          focusNextOption(state.focusedOption);
        } else {
          focusFirstOption();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (state.focusedOption) {
          focusPrevOption(state.focusedOption);
        } else {
          focusLastOption();
        }
        break;
      case 'Enter':
        e.preventDefault();
        const focused = state.focusedOption;
        const isHasFocused = focused && findFocusedBtn(focused);

        if (isHasFocused) {
          checkOption(focused);
        } else {
          const btn = dropdown()?.querySelector('li button');
          if (btn instanceof HTMLButtonElement) {
            const value = btn.value;
            checkOption(value);
          }
        }
    }

    if (typeof local.onKeyDown === 'function') {
      local.onKeyDown(e);
    }
  }

  function focusNextOption(currentValue: string) {
    const li = findFocusedBtn(currentValue);
    if (li) {
      const next = li.nextElementSibling;
      if (next) {
        const btn = next.querySelector('button');
        if (btn instanceof HTMLButtonElement) {
          if (btn.disabled) {
            focusNextOption(btn.value);
          } else {
            focusOption(btn.value);
          }
        }
      }
    }
  }

  function focusPrevOption(currentValue: string) {
    const li = findFocusedBtn(currentValue);
    if (li) {
      const prev = li.previousElementSibling;
      if (prev) {
        const btn = prev.querySelector('button');
        if (btn instanceof HTMLButtonElement) {
          if (btn.disabled) {
            focusPrevOption(btn.value);
          } else {
            focusOption(btn.value);
          }
        }
      }
    }
  }

  function focusFirstOption() {
    const [first] = options();
    if (first instanceof HTMLLIElement) {
      const btn = first.querySelector('button');
      if (btn) {
        focusButton(btn);
      }
    }
  }

  function focusLastOption() {
    const last = options().at(-1);
    if (last instanceof HTMLLIElement) {
      const btn = last.querySelector('button');
      if (btn) {
        focusButton(btn);
      }
    }
  }

  function findFocusedBtn(value: string) {
    const elements = dropdown()?.querySelectorAll('li');
    if (!elements) {
      return;
    }

    return Array.from(elements).find(li => {
      const btn = li.querySelector('button');
      if (btn instanceof HTMLButtonElement) {
        return btn.value === value;
      }
    });
  }

  function focusButton(btn: HTMLButtonElement) {
    const value = btn.value;
    focusOption(value);
  }

  function focusOption(v: string) {
    setState('focusedOption', v);
  }

  function initOption(v: string, ref: HTMLLIElement) {
    const map = state.options;
    map.set(v, ref);
    setState('options', new Map(map));
  }

  return (
    <AutocompleteCtx.Provider
      value={{
        state,
        setValue,
        initOption,
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
        onKeyDown={onKeyDown}
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
          <ul class="menu bg-base-200 z-10 shadow-xl" ref={setDropdown}>
            {local.children}
          </ul>
        </div>
      </Dropdown>
    </AutocompleteCtx.Provider>
  );
};

type AutocompleteCtx = {
  state: AutocompleteState;
} & AutocompleteActions;

const AutocompleteCtx = createContext<AutocompleteCtx>();

export const useAutocomplete = () => {
  const ctx = useContext(AutocompleteCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for autocomplete');
};
