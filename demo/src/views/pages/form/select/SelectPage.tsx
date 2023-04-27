import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Option, Select} from '@ui/form';
import {Row} from '@ui/layout';
import {Component, For} from 'solid-js';

const options = [
  {
    id: 1,
    option: 'Car',
    icon: 'fa-car',
  },
  {
    id: 2,
    option: 'Plane',
    icon: 'fa-plane-departure',
  },
  {
    id: 3,
    option: 'Motorcycle',
    icon: 'fa-motorcycle',
  },
  {
    id: 4,
    option: 'Bicycle',
    icon: 'fa-bicycle',
  },
];

export const SelectPage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Select" />
      </Page.Section>

      <Page.Section name="usage">
        <Page.Title>Usage</Page.Title>

        <Page.Component
          preview={
            <Select placeholder="placeholder">
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
          }
          snippet={`
            <Select>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
          `}
        />
      </Page.Section>

      <Page.Section name="sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Select placeholder="xs" size="xs">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="sm" size="sm">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="md" size="md">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="lg" size="lg">
                <Option value={1}>1</Option>
              </Select>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Select placeholder="xs" size="xs">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="sm" size="sm">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="md" size="md">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="lg" size="lg">
                <Option value={1}>1</Option>
              </Select>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="gap-2">
              <Select placeholder="primary" color="primary">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="secondary" color="secondary">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="accent" color="accent">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="info" color="info">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="warning" color="warning">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="error" color="error">
                <Option value={1}>1</Option>
              </Select>
            </Row>
          }
          snippet={`
            <Row orientation="col" class="gap-2">
              <Select placeholder="primary" color="primary">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="secondary" color="secondary">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="accent" color="accent">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="info" color="info">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="warning" color="warning">
                <Option value={1}>1</Option>
              </Select>
              <Select placeholder="error" color="error">
                <Option value={1}>1</Option>
              </Select>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="bordered">
        <Page.Title>Bordered</Page.Title>

        <Page.Component
          preview={
            <Select placeholder="bordered" bordered>
              <Option value={1}>1</Option>
            </Select>
          }
          snippet={`
            <Select placeholder="bordered" bordered>
              <Option value={1}>1</Option>
            </Select>
          `}
        />
      </Page.Section>

      <Page.Section name="disabled">
        <Page.Title>Disabled</Page.Title>

        <Page.Component
          preview={
            <Select placeholder="disabled" disabled>
              <Option value={1}>1</Option>
            </Select>
          }
          snippet={`
            <Select placeholder="bordered" bordered>
              <Option value={1}>1</Option>
            </Select>
          `}
        />
      </Page.Section>

      <Page.Section name="Custom view">
        <Page.Title>Custom view</Page.Title>

        <Page.Component
          preview={
            <Select
              class="max-w-md w-full"
              bordered
              placeholder="Custom view"
              compareKey="id"
              customValue={item => (
                <>
                  <i class={`fa-solid ${item.icon} pr-2`} /> {item.option}
                </>
              )}
            >
              <For each={options}>
                {opt => (
                  <Option value={opt}>
                    <i class={`fa-solid ${opt.icon} pr-2`} /> {opt.option}
                  </Option>
                )}
              </For>
            </Select>
          }
          snippet={`
            const options = [
              {
                id: 1,
                option: 'Car',
                icon: 'fa-car',
              },
              {
                id: 2,
                option: 'Plane',
                icon: 'fa-plane-departure',
              },
              {
                id: 3,
                option: 'Motorcycle',
                icon: 'fa-motorcycle',
              },
              {
                id: 4,
                option: 'Bicycle',
                icon: 'fa-bicycle',
              },
            ];

            <Select
              class="max-w-md w-full"
              bordered
              placeholder="Custom view"
              compareKey="id" // is needed to detect active element
              customValue={item => (
                <>
                  <i class={\`fa-solid \${item.icon} pr-2\`} /> {item.option}
                </>
              )}
            >
              <For each={options}>
                {opt => (
                  <Option value={opt}>
                    <i class={\`fa-solid \${opt.icon} pr-2\`} /> {opt.option}
                  </Option>
                )}
              </For>
            </Select>
          `}
        />
      </Page.Section>
    </Page>
  );
};
