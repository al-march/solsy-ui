import {AutocompleteSelectors, useAutocomplete} from './Autocomplete';
import {createMemo, createSignal, onMount, ParentProps, Show} from 'solid-js';

type OptionProps = {
  value: string;
  onClick?: (v: any) => void;
  disabled?: boolean;
};

export const AutocompleteOption = (props: ParentProps<OptionProps>) => {
  const [ref, setRef] = createSignal<HTMLLIElement>();
  const ctx = useAutocomplete();

  onMount(() => {
    init();
  });

  function init() {
    ctx.initOption(props.value, ref()!);
  }

  const isFocused = createMemo(() => {
    const isFocus = ctx.state.focusedOption === props.value;
    if (isFocus) {
      ref()?.scrollIntoView({
        behavior: 'smooth',
      });
    }
    return isFocus;
  });

  const isShow = createMemo(() => {
    const value = props.value || '';
    const search = (ctx.state.value || '').toLowerCase();
    if (value) {
      return value.toLowerCase().includes(search);
    }
    return true;
  });

  function onClick() {
    props.onClick?.(props.value);
    ctx.checkOption(props.value);
  }

  return (
    <Show when={isShow()} keyed>
      <li
        ref={setRef}
        class="overflow-hidden"
        classList={{disabled: props.disabled}}
      >
        <button
          data-testid={AutocompleteSelectors.OPTION}
          class="w-full text-left"
          classList={{
            'btn-active': isFocused(),
          }}
          onClick={onClick}
          disabled={props.disabled}
          value={props.value}
        >
          {props.children}
        </button>
      </li>
    </Show>
  );
};
