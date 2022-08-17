import { Component } from 'solid-js';
import { Page } from '../../base/Page';
import { Tab, Tabs } from '../../../../../../packages/ui/src/navigation';

export const TabsPage: Component = () => {
  function onInput(index: number) {
    console.log(index);
  }

  return (
    <Page full class="p-4">
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
        <Tabs.Item label="label 1" class="my-custom-tab">
          Tab 1
        </Tabs.Item>
        <Tabs.Item label="label 2">Tab 2</Tabs.Item>
        <Tabs.Item label="label 3">Tab 3</Tabs.Item>
      </Tabs>
    </Page>
  );
};

const CarTab = () => {
  const label = <div><i class="fa-solid fa-car pr-2"/>Cars</div>;

  return (
    <Tab label={label}>
      <div class="flex flex-col items-start">
        <span class="mb-2">
          <i class="fa-solid fa-car pr-2"/>
          Cars tab
        </span>
        <button class="btn btn-sm btn-primary">Car</button>
      </div>
    </Tab>
  );
};

const PlaneTab = () => {
  const label = <div><i class="fa-solid fa-plane-departure pr-2"/>Plane</div>;

  return (
    <Tab label={label}>
      <div class="flex flex-col items-start">
        <span class="mb-2">
          <i class="fa-solid fa-plane-departure pr-2"/>
          Plane tab
        </span>
        <button class="btn btn-sm btn-primary">Plane</button>
      </div>
    </Tab>
  );
};

const BuildingTab = () => {
  const label = <div><i class="fa-solid fa-building pr-2"/>Buildings</div>;

  return (
    <Tab label={label}>
      <div class="flex flex-col items-start">
        <span class="mb-2">
          <i class="fa-solid fa-building pr-2"/>
          Buildings tab
        </span>
        <button class="btn btn-sm btn-primary">Build</button>
      </div>
    </Tab>
  );
};
