import { Component, createSignal, JSXElement, onMount } from 'solid-js';
import { useTabs } from './Tabs';

export type TabProps = {
    label: JSXElement,
}

export const Tab: Component<TabProps> = (props) => {
    const tabs = useTabs();
    const [index, setIndex] = createSignal(-1);

    const isActive = () => tabs.state.activeTabIndex === index();

    onMount(() => {
        if (isActive()) {
            setTab();
        }
    });

    function setTab() {
        tabs.setActiveTabIndex(index());
        tabs.setTabContent(props.children);
    }

    function initTab(node: HTMLElement) {
        setIndex(tabs.initTab(node));
    }

    return (
        <div
            data-testid="tab"
            ref={initTab}
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
        >
            {props.label}
        </div>
    );
};
