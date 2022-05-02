import { Component, createContext, createSignal, JSXElement, useContext } from 'solid-js';
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
    initTab: (node: HTMLElement) => number;
    setActiveTabIndex: (i: number) => void;
    setTabContent: (content: JSXElement) => void;
}

type TabsState = {
    _activeTabIndex: number;
    _tabContent: JSXElement;

    activeTabIndex: number;
    tabContent: JSXElement;
    size?: TabSize;
    view?: TabView;
}

const TabsContext = createContext<TabsContext>();

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

    const [tabs, setTabs] = createSignal<HTMLElement[]>([]);
    const [state, setState] = createStore<TabsState>({
        _activeTabIndex: props.value ?? 0,
        get activeTabIndex() {
            return this._activeTabIndex;
        },
        _tabContent: '',
        get tabContent() {
            return this._tabContent;
        },
        get size() {
            return props.size;
        },
        get view() {
            return props.view;
        }
    });

    const initTab = (tab: HTMLElement) => {
        setTabs(tabs => ([...tabs, tab]));
        return tabs().length - 1;
    };

    const setActiveTabIndex = (index: number) => {
        setState('_activeTabIndex', index);
        props.onInput?.(index);
    };

    const setTabContent = (content: JSXElement) => {
        setState('_tabContent', content);
    };

    return (
        <TabsContext.Provider value={{
            state,
            initTab,
            setActiveTabIndex,
            setTabContent
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
                {state.tabContent}
            </div>
        </TabsContext.Provider>
    );
};

export const useTabs = () => {
    const context = useContext(TabsContext);
    if (context) {
        return context;
    }
    throw new Error('No context for Tabs');
};
