import {ImportPreview, TypeLine} from '@shared/components';
import {Page} from '@shared/components/page';
import {Row} from '@ui/layout';
import {BtnGroup} from '@ui/navigation';
import {DaisySizes} from '@ui/types';
import {Component} from 'solid-js';

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
        <Page.Title>Default usage</Page.Title>
        <p>
          <span class="text-info">BtnGroup</span> component...
        </p>
        <br />

        <Page.Component
          preview={
            <BtnGroup onInput={onButtonsChange}>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`
            function onButtonsChange(v: number) {
              console.log(v);
            }
            
            <BtnGroup onInput={onButtonsChange}>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
            </BtnGroup>
          `}
        />
      </Page.Section>

      <Page.Section name="Orientation">
        <Page.Title>Orientation</Page.Title>
        <p>
          By <span class="text-info">orientation</span>, the support changes
          position to position to <br />
          <span class="text-info">vertical</span> or{' '}
          <span class="text-info">horizontal</span>
        </p>
        <br />

        <Page.Component
          preview={
            <BtnGroup orientation="vertical">
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`
            <BtnGroup orientation="vertical">
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
              <BtnGroup.Item>Button</BtnGroup.Item>
            </BtnGroup>
          `}
        />
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
        <br />

        <Page.Component
          preview={
            <Row class="gap-2 py-2" orientation="col">
              <BtnGroup size="lg">
                <BtnGroup.Item>lg</BtnGroup.Item>
                <BtnGroup.Item>lg</BtnGroup.Item>
                <BtnGroup.Item>lg</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="md">
                <BtnGroup.Item>md</BtnGroup.Item>
                <BtnGroup.Item>md</BtnGroup.Item>
                <BtnGroup.Item>md</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="sm">
                <BtnGroup.Item>sm</BtnGroup.Item>
                <BtnGroup.Item>sm</BtnGroup.Item>
                <BtnGroup.Item>sm</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="xs">
                <BtnGroup.Item>xs</BtnGroup.Item>
                <BtnGroup.Item>xs</BtnGroup.Item>
                <BtnGroup.Item>xs</BtnGroup.Item>
              </BtnGroup>
            </Row>
          }
          snippet={`
            <Row class="gap-2 py-2" orientation="col">
              <BtnGroup size="lg">
                <BtnGroup.Item>lg</BtnGroup.Item>
                <BtnGroup.Item>lg</BtnGroup.Item>
                <BtnGroup.Item>lg</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="md">
                <BtnGroup.Item>md</BtnGroup.Item>
                <BtnGroup.Item>md</BtnGroup.Item>
                <BtnGroup.Item>md</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="sm">
                <BtnGroup.Item>sm</BtnGroup.Item>
                <BtnGroup.Item>sm</BtnGroup.Item>
                <BtnGroup.Item>sm</BtnGroup.Item>
              </BtnGroup>
              <BtnGroup size="xs">
                <BtnGroup.Item>xs</BtnGroup.Item>
                <BtnGroup.Item>xs</BtnGroup.Item>
                <BtnGroup.Item>xs</BtnGroup.Item>
              </BtnGroup>
            </Row>
          `}
        />
      </Page.Section>

      <Page.Section name="Default button">
        <Page.Title>Default button</Page.Title>

        <Page.Component
          preview={
            <BtnGroup>
              <BtnGroup.Item>1</BtnGroup.Item>
              <BtnGroup.Item>2</BtnGroup.Item>
              <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`           
            <BtnGroup>
              <BtnGroup.Item>1</BtnGroup.Item>
              <BtnGroup.Item>2</BtnGroup.Item>
              <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
            </BtnGroup>
          `}
        />
      </Page.Section>

      <Page.Section name="multiple">
        <Page.Title>Multiple buttons</Page.Title>

        <Page.Component
          preview={
            <BtnGroup multiple>
              <BtnGroup.Item>One</BtnGroup.Item>
              <BtnGroup.Item>Two</BtnGroup.Item>
              <BtnGroup.Item defaultChecked>Three</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`
            <BtnGroup multiple>
              <BtnGroup.Item>One</BtnGroup.Item>
              <BtnGroup.Item>Two</BtnGroup.Item>
              <BtnGroup.Item defaultChecked>Three</BtnGroup.Item>
            </BtnGroup>
          `}
        />
      </Page.Section>

      <Page.Section name="BtnGroup colors">
        <Page.Title>BtnGroup colors</Page.Title>

        <Page.Component
          preview={
            <BtnGroup color="warning">
              <BtnGroup.Item>Warning</BtnGroup.Item>
              <BtnGroup.Item>Warning</BtnGroup.Item>
              <BtnGroup.Item>Warning</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`
            <BtnGroup color="warning">
              <BtnGroup.Item>Warning</BtnGroup.Item>
              <BtnGroup.Item>Warning</BtnGroup.Item>
              <BtnGroup.Item>Warning</BtnGroup.Item>
            </BtnGroup>
          `}
        />
      </Page.Section>

      <Page.Section name="UnSelectable">
        <Page.Title>BtnGroup unSelectable</Page.Title>

        <Page.Component
          preview={
            <BtnGroup unSelectable>
              <BtnGroup.Item>Primary</BtnGroup.Item>
              <BtnGroup.Item>Primary</BtnGroup.Item>
              <BtnGroup.Item>Primary</BtnGroup.Item>
            </BtnGroup>
          }
          snippet={`
            <BtnGroup unSelectable>
              <BtnGroup.Item>no-select</BtnGroup.Item>
              <BtnGroup.Item>no-select</BtnGroup.Item>
              <BtnGroup.Item>no-select</BtnGroup.Item>
            </BtnGroup>
          `}
        />
      </Page.Section>
    </Page>
  );
};
