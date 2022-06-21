import { Component, createSignal, JSXElement, onMount } from 'solid-js';
import { TabSelectors, useTabs } from './Tabs';
import { PropFocusEvent } from '../../types';

export type TabProps = {
  label: JSXElement,
  onFocus?: (e: PropFocusEvent) => void;
  onBlur?: (e: PropFocusEvent) => void;
}

export const Tab: Component<TabProps> = (props) => {
  const tabs = useTabs();
  const [index, setIndex] = createSignal(-1);

  onMount(() => {
    initTab();
  });

  const initTab = () => {
    const index = tabs.initTab(props.children);
    setIndex(index);
  };

  const isActive = () => {
    return tabs.state.active === index();
  };

  const setTab = () => {
    tabs.setActive(index());
  };

  return (
    <button
      data-testid={TabSelectors.TAB}
      class="tab"
      classList={{
        'tab-active': isActive(),
        'tab-bordered': tabs.state.view === 'bordered',
        'tab-lifted': tabs.state.view === 'lifted',

        'tab-xs': tabs.state.size === 'xs',
        'tab-sm': tabs.state.size === 'sm',
        'tab-md': tabs.state.size === 'md',
        'tab-lg': tabs.state.size === 'lg',
      }}
      onClick={setTab}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {props.label}
    </button>
  );
};
