import {
  Component,
  createContext,
  For,
  JSXElement,
  Match,
  Switch,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { DaisySize } from '../../types';

export const TabSelectors = {
  TAB_GROUP: 'tab-group',
  TAB: 'tab',
};

export type TabView = 'bordered' | 'lifted' | 'boxed';
export type TabSize = DaisySize;

type TabsContext = {
  state: TabsState;
  initTab: (node: JSXElement) => number;
  setActive: (i: number) => void;
}

type TabsState = {
  active: number;
  tabs: JSXElement[]
  size?: TabSize;
  view?: TabView;
}

export type TabsProps = {
  value?: number;
  onInput?: (i: number) => void;
  view?: TabView;
  size?: TabSize;
}

/**
 * Tabs
 *
 * @example
 * <Tabs>
 *      <Tab label="Tab label 1">
 *          Tab content 1
 *      </Tab>
 *      <Tab label="Tab label 2">
 *          Tab content 2
 *      </Tab>
 * </Tabs>
 */
export const Tabs: Component<TabsProps> = (props) => {

  const [state, setState] = createStore<TabsState>({
    active: props.value ?? 0,
    tabs: [],
    get size() {
      return props.size;
    },
    get view() {
      return props.view;
    }
  });

  const initTab = (tab: JSXElement) => {
    setState('tabs', [...state.tabs, tab]);
    return state.tabs.length - 1;
  };

  const setActive = (index: number) => {
    setState('active', index);
    props.onInput?.(index);
  };

  return (
    <TabsContext.Provider value={{
      state,
      initTab,
      setActive,
    }}>
      <div
        data-testid={TabSelectors.TAB_GROUP}
        class="tabs"
        classList={{
          'tabs-boxed': state.view === 'boxed'
        }}
      >
        {props.children}
      </div>

      <div class="p-4">
        <Switch>
          <For each={state.tabs}>
            {(tab, i) => (
              <Match when={state.active === i()}>
                {tab}
              </Match>
            )}
          </For>
        </Switch>
      </div>
    </TabsContext.Provider>
  );
};

const TabsContext = createContext<TabsContext>();

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (context) {
    return context;
  }
  throw new Error('No context for Tabs');
};
