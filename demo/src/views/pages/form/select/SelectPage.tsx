import { Component } from 'solid-js';
import { Page } from '../../base/Page';
import { Select, Option } from '../../../../../../packages/ui/src/form';

export const SelectPage: Component = () => {

    return (
        <Page full class="p-4">
            <h2>Select page</h2>

            <Select show placeholder="Select category">
                <Option value="Cars"><i class="fa-solid fa-car pr-2"/>Cars</Option>
                <Option value="Plane"><i class="fa-solid fa-plane-departure pr-2"/>Plane</Option>
                <Option value="Buildings"><i class="fa-solid fa-building pr-2"/>Buildings</Option>
            </Select>
        </Page>
    );
};
