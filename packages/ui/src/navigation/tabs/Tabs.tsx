import { Component, createContext, createSignal, JSXElement, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type TabsContext = {
    state: TabsState,
    setActiveTab: (i: number) => void;
    initTab: (node: HTMLElement) => number;
    setTabContent: (content: JSXElement) => void;
}

type TabsState = {
    _activeTabIndex: number;
    _tabContent: JSXElement;

    activeTabIndex: number;
    tabContent: JSXElement;
}

const TabsContext = createContext<TabsContext>();

export type TabsProps = {
    defaultValue?: number;
    onInput?: (i: number) => void;
}

/**
 * Tabs
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
        _activeTabIndex: props.defaultValue ?? 0,
        get activeTabIndex() {
            return this._activeTabIndex;
        },
        _tabContent: '',
        get tabContent() {
            return this._tabContent;
        }
    });

    const initTab = (tab: HTMLElement) => {
        setTabs(tabs => ([...tabs, tab]));
        return tabs().length - 1;
    };

    const setActiveTab = (index: number) => {
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
            setActiveTab,
            setTabContent
        }}>
            <div class="tabs tabs-boxed">
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
