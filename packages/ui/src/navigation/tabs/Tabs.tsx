import {DaisySize} from '../../types';
import {Fade} from '../../utils';
import {Tab} from './Tab';
import {
  createContext,
  For,
  JSXElement,
  Match,
  ParentProps,
  Switch,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';

export const TabSelectors = {
  TAB_GROUP: 'tab-group',
  TAB: 'tab',
};

export type TabView = 'bordered' | 'lifted' | 'boxed';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabSize = DaisySize;

type TabsState = {
  active: number;
  tabs: JSXElement[];
  size?: TabSize;
  view?: TabView;
  orientation?: TabOrientation;
  class?: string;
};

type TabsCtx = {
  state: TabsState;
  initTab: (node: JSXElement) => number;
  setActive: (i: number) => void;
};

const TabsCtx = createContext<TabsCtx>();

export const useTabs = () => {
  const ctx = useContext(TabsCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for Tabs');
};

export type TabsProps = {
  value?: number;
  onInput?: (i: number) => void;
  view?: TabView;
  size?: TabSize;
  animation?: boolean;
  orientation?: TabOrientation;
  class?: string;
};

/**
 * @example
 * <Tabs>
 *   <Tab label="Tab label 1">
 *     Tab content 1
 *   </Tab>
 *   <Tab label="Tab label 2">
 *     Tab content 2
 *   </Tab>
 * </Tabs>
 */
export const TabsBase = (props: ParentProps<TabsProps>) => {
  const [state, setState] = createStore<TabsState>({
    active: props.value ?? 0,
    tabs: [],
    get size() {
      return props.size;
    },
    get view() {
      return props.view;
    },
    get orientation() {
      return props.orientation || 'horizontal';
    },
    get class() {
      return props.class;
    },
  });

  function initTab(tab: JSXElement) {
    setState('tabs', tabs => [...tabs, tab]);
    return state.tabs.length - 1;
  }

  function setActive(index: number) {
    if (index === state.active) {
      return;
    }
    props.onInput?.(index);
    setState('active', index);
  }

  return (
    <TabsCtx.Provider
      value={{
        state,
        initTab,
        setActive,
      }}
    >
      <div
        class="flex"
        classList={{
          'flex-col': state.orientation === 'horizontal',
          'flex-row': state.orientation === 'vertical',
        }}
      >
        <div
          data-testid={TabSelectors.TAB_GROUP}
          class="tabs flex"
          classList={{
            [state.class || '']: !!state.class,
            'tabs-boxed': state.view === 'boxed',
            'flex-col': state.orientation === 'vertical',
            'flex-row': state.orientation === 'horizontal',
          }}
        >
          {props.children}
        </div>

        <Switch>
          <For each={state.tabs}>
            {(tab, i) => (
              <Match when={state.active === i()} keyed>
                <Fade appear>
                  <div>{tab}</div>
                </Fade>
              </Match>
            )}
          </For>
        </Switch>
      </div>
    </TabsCtx.Provider>
  );
};

export const Tabs = Object.assign(TabsBase, {Item: Tab});
