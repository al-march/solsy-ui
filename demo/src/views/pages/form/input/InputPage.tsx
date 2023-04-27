import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Input} from '@ui/form';
import {Row} from '@ui/layout';
import {Component} from 'solid-js';

export const InputPage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Input" />
      </Page.Section>

      <Page.Section name="default usage">
        <Page.Title>Default usage</Page.Title>

        <Page.Component
          preview={<Input type="text" placeholder="input" bordered />}
          snippet={`<Input type="text" placeholder="input" bordered />`}
        />
      </Page.Section>

      <Page.Section name="colors">
        <Page.Title>Colors</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="w-96 gap-2">
              <Input placeholder="primary" color="primary" bordered />
              <Input placeholder="secondary" color="secondary" bordered />
              <Input placeholder="accent" color="accent" bordered />
              <Input placeholder="info" color="info" bordered />
              <Input placeholder="success" color="success" bordered />
              <Input placeholder="warning" color="warning" bordered />
              <Input placeholder="error" color="error" bordered />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="w-96 gap-2">
              <Input placeholder="primary" color="primary" bordered />
              <Input placeholder="secondary" color="secondary" bordered />
              <Input placeholder="accent" color="accent" bordered />
              <Input placeholder="info" color="info" bordered />
              <Input placeholder="success" color="success" bordered />
              <Input placeholder="warning" color="warning" bordered />
              <Input placeholder="error" color="error" bordered />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="Sizes">
        <Page.Title>Sizes</Page.Title>

        <Page.Component
          preview={
            <Row orientation="col" class="w-96 gap-2">
              <Input size="lg" placeholder="lg" color="primary" bordered />
              <Input size="md" placeholder="md" color="secondary" bordered />
              <Input size="sm" placeholder="sm" color="accent" bordered />
              <Input size="xs" placeholder="xs" color="info" bordered />
            </Row>
          }
          snippet={`
            <Row orientation="col" class="w-96 gap-2">
              <Input size="lg" placeholder="lg" color="primary" bordered />
              <Input size="md" placeholder="md" color="secondary" bordered />
              <Input size="sm" placeholder="sm" color="accent" bordered />
              <Input size="xs" placeholder="xs" color="info" bordered />
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="Disabled">
        <Page.Title>Disabled</Page.Title>

        <Page.Component
          preview={<Input placeholder="disabled" disabled bordered />}
          snippet={`<Input placeholder="disabled" disabled bordered />`}
        />
      </Page.Section>
    </Page>
  );
};
