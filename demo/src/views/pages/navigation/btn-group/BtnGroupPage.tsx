import {Code, ImportPreview, TypeLine} from '@shared/components';
import {Page} from '@shared/components/page';
import {Divider, Row} from '@ui/layout';
import {BtnGroup} from '@ui/navigation';
import {DaisySizes} from '@ui/types';
import {Component} from 'solid-js';

const btnGroupSnippet = `function onButtonsChange(v: number) {
  console.log(v);
}

<BtnGroup onInput={onButtonsChange}>
  <BtnGroup.Item>1</BtnGroup.Item>
  <BtnGroup.Item>2</BtnGroup.Item>
  <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
</BtnGroup>`;

const btnGroupVerticalSnippet = `<BtnGroup orientation="vertical">
  <BtnGroup.Item>1</BtnGroup.Item>
  <BtnGroup.Item>2</BtnGroup.Item>
  <BtnGroup.Item>3</BtnGroup.Item>
</BtnGroup>`;

const btnGroupSizeSnippet = `<Row class="gap-2 py-2" orientation="col">
  <BtnGroup size="lg">
    <BtnGroup.Item>lg</BtnGroup.Item>
  </BtnGroup>
  <BtnGroup size="md">
    <BtnGroup.Item>md</BtnGroup.Item>
  </BtnGroup>
  <BtnGroup size="sm">
    <BtnGroup.Item>sm</BtnGroup.Item>
  </BtnGroup>
  <BtnGroup size="xs">
    <BtnGroup.Item>xs</BtnGroup.Item>
  </BtnGroup>
</Row>`;

export const BtnGroupPage: Component = () => {
  function onButtonsChange(v: number) {
    console.log(v);
  }

  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="BtnGroup" />
      </Page.Section>

      <Page.Section name="default usage">
        <h2 class="text-2xl">Default usage</h2>
        <p>
          <span class="text-info">BtnGroup</span> component...
        </p>
        <br />

        <BtnGroup onInput={onButtonsChange}>
          <BtnGroup.Item>1</BtnGroup.Item>
          <BtnGroup.Item>2</BtnGroup.Item>
          <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
        </BtnGroup>

        <Code>{btnGroupSnippet}</Code>
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

        <BtnGroup orientation="vertical">
          <BtnGroup.Item>1</BtnGroup.Item>
          <BtnGroup.Item>2</BtnGroup.Item>
          <BtnGroup.Item>3</BtnGroup.Item>
        </BtnGroup>

        <Code>{btnGroupVerticalSnippet}</Code>
      </Page.Section>

      <Page.Section name="sizes">
        <h2 class="text-2xl">Sizes</h2>
        <p>
          Button sizes in <span class="text-info">BtnGroup</span> change
          depending on the <span class="text-info">size</span> property
        </p>
        <p>
          There are size props: <br /> <TypeLine types={[...DaisySizes]} />
        </p>

        <Row class="gap-2 py-2" orientation="col">
          <BtnGroup size="lg">
            <BtnGroup.Item>lg</BtnGroup.Item>
          </BtnGroup>
          <BtnGroup size="md">
            <BtnGroup.Item>md</BtnGroup.Item>
          </BtnGroup>
          <BtnGroup size="sm">
            <BtnGroup.Item>sm</BtnGroup.Item>
          </BtnGroup>
          <BtnGroup size="xs">
            <BtnGroup.Item>xs</BtnGroup.Item>
          </BtnGroup>
        </Row>

        <Code>{btnGroupSizeSnippet}</Code>
      </Page.Section>
    </Page>
  );
};
