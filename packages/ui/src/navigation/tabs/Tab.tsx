import {PropFocusEvent} from '../../types';
import {TabSelectors, useTabs} from './Tabs';
import {createSignal, JSXElement, ParentProps} from 'solid-js';

export type TabProps = {
  label: JSXElement;
  class?: string;
  onFocus?: (e: PropFocusEvent) => void;
  onBlur?: (e: PropFocusEvent) => void;
};

export const Tab = (props: ParentProps<TabProps>) => {
  const ctx = useTabs();
  const [index, setIndex] = createSignal(-1);

  function initTab() {
    const index = ctx.initTab(props.children);
    setIndex(index);
  }

  function isActive() {
    return ctx.state.active === index();
  }

  function setTab() {
    ctx.setActive(index());
  }

  return (
    <div
      classList={{
        [props.class || '']: !!props.class,
      }}
    >
      <button
        data-testid={TabSelectors.TAB}
        ref={initTab}
        class="tab"
        classList={{
          'tab-active': isActive(),
          'tab-bordered': ctx.state.view === 'bordered',
          'tab-lifted': ctx.state.view === 'lifted',

          'tab-xs': ctx.state.size === 'xs',
          'tab-sm': ctx.state.size === 'sm',
          'tab-md': ctx.state.size === 'md',
          'tab-lg': ctx.state.size === 'lg',
        }}
        onClick={setTab}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      >
        {props.label}
      </button>
    </div>
  );
};
