import {Page} from '@page/base';
import {
  CodePreview,
  ExampleTable,
  ImportPreview,
  TypeLine,
} from '@shared/components';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Button} from '@ui/actions';
import {Divider, Row} from '@ui/layout';
import {DaisyColor, DaisyColors, DaisySizes} from '@ui/types';
import {Component} from 'solid-js';

const colorsSnippet = `<Row class="gap-1 py-4">
  <Button>Button</Button>
  <Button color="primary">Button</Button>
  <Button color="secondary">Button</Button>
  <Button color="accent">Button</Button>
  <Button color="info">Button</Button>
  <Button color="success">Button</Button>
  <Button color="warning">Button</Button>
  <Button color="error">Button</Button>
  <Button color="ghost">Button</Button>
</Row>`;

const sizesSnippet = `<Row items="center" class="gap-1 py-4">
  <Button size="lg">Button</Button>
  <Button size="md">Button</Button>
  <Button size="sm">Button</Button>
  <Button size="xs">Button</Button>
</Row>`;

export const ButtonPage: Component = () => {
  const colors = ArrMerge<DaisyColor, 'ghost'>([...DaisyColors], ['ghost']);
  const sizes = [...DaisySizes];

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Buttons</h2>

      <br />
      <ImportPreview component="Button" />

      <Divider />

      <ExampleTable
        class="table-compact w-full"
        colors={colors}
        sizes={sizes}
        component={(color, size) => (
          <Button color={color} size={size}>
            Button
          </Button>
        )}
      />

      <Divider />

      <h2 class="text-2xl">Colors</h2>

      <p>
        Use <strong class="text-info">color</strong> prop to change color of the
        Button. You can set the value to: <br />
        <TypeLine types={colors} />
      </p>

      <Row class="gap-1 py-4">
        <Button>Button</Button>
        <Button color="primary">Button</Button>
        <Button color="secondary">Button</Button>
        <Button color="accent">Button</Button>
        <Button color="info">Button</Button>
        <Button color="success">Button</Button>
        <Button color="warning">Button</Button>
        <Button color="error">Button</Button>
        <Button color="ghost">Button</Button>
      </Row>

      <CodePreview>{colorsSnippet}</CodePreview>

      <Divider />

      <h2 class="text-2xl">Sizes</h2>

      <p>
        Use the <strong class="text-info">size</strong> prop to change the size
        of the Button. You can set the value to: <br />
        <TypeLine types={sizes} />
      </p>

      <Row items="center" class="gap-1 py-4">
        <Button size="lg">Button</Button>
        <Button size="md">Button</Button>
        <Button size="sm">Button</Button>
        <Button size="xs">Button</Button>
      </Row>

      <CodePreview>{sizesSnippet}</CodePreview>
    </Page>
  );
};
