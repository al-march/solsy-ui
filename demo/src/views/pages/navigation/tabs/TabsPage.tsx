import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Divider} from '@ui/layout';
import {Tabs} from '@ui/navigation';
import {Component} from 'solid-js';

const tabsSnippet = `<Tabs view="boxed" size="sm">
  <Tabs.Item label="label 1">Tab 1</Tabs.Item>
  <Tabs.Item label="label 2">Tab 2</Tabs.Item>
  <Tabs.Item label="label 3">Tab 3</Tabs.Item>
</Tabs>`;

const tabsOrientationSnippet = `<Tabs view="boxed" orientation="vertical">
  <Tabs.Item label="label 1">Tab 1</Tabs.Item>
  <Tabs.Item label="label 2">Tab 2</Tabs.Item>
  <Tabs.Item label="label 3">Tab 3</Tabs.Item>
</Tabs>`;

export const TabsPage: Component = () => {
  function onInput(index: number) {
    console.log(index);
  }

  return (
    <Page full class="p-4">
      <br />
      <ImportPreview component="Tabs" />

      <Divider />

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

      <Code>{tabsSnippet}</Code>

      <Divider />

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

      <Code>{tabsOrientationSnippet}</Code>
    </Page>
  );
};
