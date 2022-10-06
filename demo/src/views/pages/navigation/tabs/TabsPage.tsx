import {Page} from '@page/base';
import {ImportPreview} from '@shared/components';
import {Tabs} from '@ui/navigation';
import {Component} from 'solid-js';

export const TabsPage: Component = () => {
  function onInput(index: number) {
    console.log(index);
  }

  return (
    <Page full class="p-4">
      <br />
      <ImportPreview component="Tabs" />
      <br />

      <Tabs view="boxed" size="sm" onInput={onInput}>
        <Tabs.Item label="label 1">Tab 1</Tabs.Item>
        <Tabs.Item label="label 2">Tab 2</Tabs.Item>
        <Tabs.Item label="label 3">Tab 3</Tabs.Item>
      </Tabs>
      <Tabs
        view="boxed"
        size="md"
        orientation="vertical"
        class="my-custom-wrapper"
        onInput={onInput}
      >
        <Tabs.Item label="label 1">Tab 1</Tabs.Item>
        <Tabs.Item label="label 2">Tab 2</Tabs.Item>
        <Tabs.Item label="label 3">Tab 3</Tabs.Item>
      </Tabs>
    </Page>
  );
};
