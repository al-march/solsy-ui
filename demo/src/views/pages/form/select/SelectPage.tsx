import { Component, For } from 'solid-js';
import { Page } from '../../base/Page';
import { Select, Option, SelectSize, SelectColor } from '../../../../../../packages/ui/src/form';

const sizes: SelectSize[] = ['lg', 'md', 'sm', 'xs'];
const colors: SelectColor[] = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'ghost']

export const SelectPage: Component = () => {

    return (
        <Page full class="p-4">
            <h2>Select page</h2>

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
                <br/>
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
