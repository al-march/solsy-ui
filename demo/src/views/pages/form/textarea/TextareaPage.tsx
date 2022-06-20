import { Component } from 'solid-js';
import { Textarea } from '../../../../../../packages/ui/src/form';
import { Page } from '../../base/Page';

export const TextareaPage: Component = () => {
    return (
        <Page full class="p-4">
            <h3 class="text-xl">Textarea Page</h3>

            <span class="divider"/>

            <Textarea
                autosize
                class="py-0"
                placeholder="textarea"
                bordered
            />
        </Page>
    )
}
