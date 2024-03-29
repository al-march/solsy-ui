import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Tabs} from '@ui/navigation';
import {Component} from 'solid-js';

export const TabsPage: Component = () => {
  function onInput(index: number) {
    console.log(index);
  }

  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Tabs" />
      </Page.Section>

      <Page.Section name="usage">
        <h2 class="text-2xl">Default use</h2>
        <p>
          <span class="text-info">Tabs</span> component...
        </p>
        <br />

        <Tabs view="boxed" size="sm" onInput={onInput}>
          <Tabs.Item label="label 1">Tab 1</Tabs.Item>
          <Tabs.Item label="label 2">Tab 2</Tabs.Item>
          <Tabs.Item label="label 3">Tab 3</Tabs.Item>
        </Tabs>

        <Code>{`
          <Tabs view="boxed" size="sm">
            <Tabs.Item label="label 1">Tab 1</Tabs.Item>
            <Tabs.Item label="label 2">Tab 2</Tabs.Item>
            <Tabs.Item label="label 3">Tab 3</Tabs.Item>
          </Tabs>
        `}</Code>
      </Page.Section>

      <Page.Section name="Orientation">
        <h2 class="text-2xl">Orientation</h2>
        <p>
          By <span class="text-info">orientation</span>, the support changes
          position to position to <br />
          <span class="text-info">vertical</span> or{' '}
          <span class="text-info">horizontal</span>
        </p>

        <br />

        <Tabs view="boxed" orientation="vertical" onInput={onInput}>
          <Tabs.Item label="label 1">Tab 1</Tabs.Item>
          <Tabs.Item label="label 2">Tab 2</Tabs.Item>
          <Tabs.Item label="label 3">Tab 3</Tabs.Item>
        </Tabs>

        <Code>{`
          <Tabs view="boxed" orientation="vertical">
            <Tabs.Item label="label 1">Tab 1</Tabs.Item>
            <Tabs.Item label="label 2">Tab 2</Tabs.Item>
            <Tabs.Item label="label 3">Tab 3</Tabs.Item>
          </Tabs>
        `}</Code>
      </Page.Section>
    </Page>
  );
};
