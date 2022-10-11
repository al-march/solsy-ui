import {Code, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Input} from '@ui/form';
import {Row} from '@ui/layout';
import {Component} from 'solid-js';

const usageSnippet = `<Input type="text" placeholder="primary" bordered />`;

const colorsSnippet = `<Row orientation="col" class="w-96 gap-2">
  <Input placeholder="primary" color="primary" bordered />
  <Input placeholder="secondary" color="secondary" bordered />
  <Input placeholder="accent" color="accent" bordered />
  <Input placeholder="info" color="info" bordered />
  <Input placeholder="success" color="success" bordered />
  <Input placeholder="warning" color="warning" bordered />
  <Input placeholder="error" color="error" bordered />
</Row>`;

export const InputPage: Component = () => {
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Input" />
      </Page.Section>

      <Page.Section name="default usage">
        <h2 class="text-2xl">Default usage</h2>
        <br />
        <Input type="text" placeholder="input" bordered />
        <Code>{usageSnippet}</Code>
      </Page.Section>

      <Page.Section name="colors">
        <h2 class="text-2xl">Colors</h2>
        <br />
        <Row orientation="col" class="w-96 gap-2">
          <Input placeholder="primary" color="primary" bordered />
          <Input placeholder="secondary" color="secondary" bordered />
          <Input placeholder="accent" color="accent" bordered />
          <Input placeholder="info" color="info" bordered />
          <Input placeholder="success" color="success" bordered />
          <Input placeholder="warning" color="warning" bordered />
          <Input placeholder="error" color="error" bordered />
        </Row>
        <br />
        <Code>{colorsSnippet}</Code>
      </Page.Section>
    </Page>
  );
};
