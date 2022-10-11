import {Code, ImportPreview, TypeLine} from '@shared/components';
import {Page} from '@shared/components/page';
import {Progress} from '@ui/data-display';
import {Divider, Row} from '@ui/layout';
import {DaisyColors} from '@ui/types';

const usageSnippet = `<Row class="gap-4 py-4" orientation="col">
  <Progress value="0" />
  <Progress value="10" />
  <Progress value="40" />
  <Progress value="70" />
  <Progress value="100" />
</Row>`;

const indeterminateSnippet = `<Progress color="warning" indeterminate />`;

const colorsSnippet = `<Row class="gap-4 py-4" orientation="col">
  <Progress color="primary" value="40" />
  <Progress color="secondary" value="45" />
  <Progress color="accent" value="50" />
  <Progress color="info" value="55" />
  <Progress color="success" value="60" />
  <Progress color="warning" value="65" />
  <Progress color="error" value="70" />
</Row>`;

export const ProgressPage = () => {
  const colors = [...DaisyColors];
  return (
    <Page full class="p-4">
      <Page.Section name="import">
        <ImportPreview component="Progress" />
      </Page.Section>

      <Page.Section name="usage">
        <h2 class="text-2xl">Usage</h2>
        <p>Progress</p>

        <Row class="gap-4 py-4" orientation="col">
          <Progress value="0" />
          <Progress value="10" />
          <Progress value="40" />
          <Progress value="70" />
          <Progress value="100" />
        </Row>

        <Code>{usageSnippet}</Code>

        <Divider />

        <p>Indeterminate (without value)</p>
        <Progress color="warning" indeterminate />
        <Code>{indeterminateSnippet}</Code>
      </Page.Section>

      <Page.Section name="colors">
        <h2 class="text-2xl">Colors</h2>
        <p>
          Use <strong class="text-info">color</strong> prop to change color of
          the Progress. You can set the value to: <br />
          <TypeLine types={colors} />
        </p>

        <Row class="gap-4 py-4" orientation="col">
          <Progress color="primary" value="40" />
          <Progress color="secondary" value="45" />
          <Progress color="accent" value="50" />
          <Progress color="info" value="55" />
          <Progress color="success" value="60" />
          <Progress color="warning" value="65" />
          <Progress color="error" value="70" />
        </Row>

        <Code>{colorsSnippet}</Code>
      </Page.Section>
    </Page>
  );
};
