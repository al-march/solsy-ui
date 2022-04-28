import { Component } from 'solid-js';
import { Page } from '../../base/Page';
import { Input } from '../../../../../../packages/ui/src/form';

export const InputPage: Component = () => {
    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Input</h2>
            <br/>

            <div class="w-96 grid gap-2">
                <Input
                    type="text"
                    placeholder="primary"
                    color="primary"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="secondary"
                    color="secondary"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="accent"
                    color="accent"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="info"
                    color="info"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="success"
                    color="success"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="warning"
                    color="warning"
                    bordered
                />

                <Input
                    type="text"
                    placeholder="error"
                    color="error"
                    bordered
                />
            </div>
        </Page>
    );
};
