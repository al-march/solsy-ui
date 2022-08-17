import { createContext, ParentProps, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { DaisySize } from '../../types';
import { BtnGroupItem } from './BtnGroupItem';

export const BtnGroupSelectors = {
  GROUP: 'button-group',
  BUTTON: 'button',
};

export type BtnGroupSize = DaisySize;

type BtnGroupState = {
  activeButtons: Set<any>;
  buttons: HTMLElement[];
  size?: BtnGroupSize;
}

type BtnGroupCtx = {
  state: BtnGroupState;
  initButton: (node: HTMLElement) => number;
  setActive: (v: any) => void;
}

const BtnGroupCtx = createContext<BtnGroupCtx>();

export const useBtnGroup = () => {
  const ctx = useContext(BtnGroupCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for ToggleButtons');
};

export type BtnGroupProps<T extends any> = {
  value?: T;
  multiple?: boolean;
  onInput?: (v: T) => void;
  size?: BtnGroupSize;
  orientation?: 'horizontal' | 'vertical';
  class?: string;
}

/**
 * BtnGroup
 *
 * @example
 * <BtnGroup
 *   value={activeBtn()}
 *   onInput={onButtonsChange}
 *   size="sm"
 * >
 *   <BtnGroup.Item>1</BtnGroup.Item>
 *   <BtnGroup.Item>2</BtnGroup.Item>
 *   <BtnGroup.Item>3</BtnGroup.Item>
 * </BtnGroup>
 */
const BtnGroupBase = <T extends any>(props: ParentProps<BtnGroupProps<T>>) => {

  const [state, setState] = createStore<BtnGroupState>({
    activeButtons: initActiveButtons(),
    buttons: [],
    get size() {
      return props.size;
    }
  });

  function initActiveButtons() {
    const output = new Set();
    const value = props.value;

    if (!value) {
      return output;
    }

    if (Array.isArray(value)) {
      if (props.multiple) {
        value.forEach(v => output.add(v));
      } else {
        output.add(value[value.length - 1]);
      }
    } else {
      output.add(value);
    }
    return output;
  }

  function initButton(button: HTMLElement) {
    setState('buttons', [...state.buttons, button]);
    return state.buttons.length - 1;
  }

  function setActive(value: any) {
    const set = new Set(state.activeButtons);

    if (set.has(value)) {
      set.delete(value);
    } else {
      addValue(value, set);
    }

    updateValue(set);
  }

  function addValue(value: any, set: Set<any>) {
    if (props.multiple) {
      set.add(value);
    } else {
      set.clear();
      set.add(value);
    }
  }

  function updateValue(set: Set<any>) {
    setState('activeButtons', set);
    const emitValue = props.multiple
      ? Array.from(set)
      : Array.from(set)[0];
    props.onInput?.(emitValue);
  }

  return (
    <BtnGroupCtx.Provider value={{
      state,
      initButton,
      setActive,
    }}>
      <div
        data-testid={BtnGroupSelectors.GROUP}
        class="btn-group"
        classList={{
          [props.class || '']: !!props.class,
          'btn-group-vertical': props.orientation === 'vertical',
        }}
      >
        {props.children}
      </div>
    </BtnGroupCtx.Provider>
  );
};

export const BtnGroup = Object.assign(BtnGroupBase, {Item: BtnGroupItem});
