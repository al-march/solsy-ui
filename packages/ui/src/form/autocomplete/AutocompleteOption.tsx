import {AutocompleteSelectors, useAutocomplete} from './Autocomplete';
import {ParentProps, Show} from 'solid-js';

type OptionProps = {
  value?: string;
  onClick?: (v: any) => void;
  disabled?: boolean;
};

export const AutocompleteOption = (props: ParentProps<OptionProps>) => {
  const autocomplete = useAutocomplete();

  function onClick() {
    props.onClick?.(props.value);
    autocomplete.checkOption(props.value);
  }

  function isShow() {
    const value = props.value || '';
    const search = (autocomplete.state.value || '').toLowerCase();
    if (value) {
      return value.toLowerCase().includes(search);
    }
    return true;
  }

  return (
    <Show when={isShow()} keyed>
      <li class="overflow-hidden" classList={{disabled: props.disabled}}>
        <button
          data-testid={AutocompleteSelectors.OPTION}
          class="w-full text-left"
          onClick={onClick}
          disabled={props.disabled}
        >
          {props.children}
        </button>
      </li>
    </Show>
  );
};
