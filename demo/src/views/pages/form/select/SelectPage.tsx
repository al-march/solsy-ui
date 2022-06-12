import { Component, For } from 'solid-js';
import { Page } from '../../base/Page';
import { Select, Option, SelectSize, SelectColor } from '../../../../../../packages/ui/src/form';
import { Button } from '../../../../../../packages/ui/src/actions';

const sizes: SelectSize[] = ['lg', 'md', 'sm', 'xs'];
const colors: SelectColor[] = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost'];

const options = [
    {
        id: 1,
        option: 'Car',
        icon: 'fa-car'
    },
    {
        id: 2,
        option: 'Plane',
        icon: 'fa-plane-departure'
    },
    {
        id: 3,
        option: 'Motorcycle',
        icon: 'fa-motorcycle'
    },
    {
        id: 4,
        option: 'Bicycle',
        icon: 'fa-bicycle'
    },
];

export const SelectPage: Component = () => {

    return (
        <Page full class="p-4">
            <h3 class="text-xl">Select Page</h3>

            <span class="divider"/>
            <h3 class="text-xl">Custom view</h3>
            <span class="divider"/>

            <Select
                class="max-w-md"
                bordered
                placeholder="Custom view"
                compareKey="id"
                value={{
                    id: 4,
                    option: 'Bicycle',
                    icon: 'fa-bicycle'
                }}
                customValue={v => (
                    <Button size="sm" color="success">
                        <i class={`fa-solid ${v.icon} pr-2`}/>
                        {v.option}
                    </Button>
                )}
            >
                <For each={options}>
                    {opt => (
                        <Option value={opt}>
                            <i class={`fa-solid ${opt.icon} pr-2`}/> {opt.option}
                        </Option>
                    )}
                </For>
            </Select>

            <span class="divider"/>
            <h3 class="text-xl">Sizes</h3>
            <span class="divider"/>

            <div class="flex flex-col items-start gap-2">
                <For each={sizes}>
                    {state => (
                        <Select value="Cars" bordered size={state} placeholder="Select category">
                            <Option value="Cars"><i class="fa-solid fa-car pr-2"/>Cars</Option>
                            <Option value="Plane" disabled><i class="fa-solid fa-plane-departure pr-2"/>Plane</Option>
                            <Option value="Buildings"><i class="fa-solid fa-building pr-2"/>Buildings</Option>
                        </Select>
                    )}
                </For>
                <span class="divider"/>
                <h3 class="text-xl">Colors</h3>
                <span class="divider"/>
                <For each={colors}>
                    {state => (
                        <Select value="Cars" bordered color={state} placeholder="Select category">
                            <Option value="Cars"><i class="fa-solid fa-car pr-2"/>Cars</Option>
                            <Option value="Plane" disabled><i class="fa-solid fa-plane-departure pr-2"/>Plane</Option>
                            <Option value="Buildings"><i class="fa-solid fa-building pr-2"/>Buildings</Option>
                        </Select>
                    )}
                </For>
            </div>
        </Page>
    );
};
