import {Page} from '@page/base';
import {ExampleTable, ImportPreview} from '@shared/components';
import {ArrMerge} from '@shared/utils/ArrMerge';
import {Button} from '@ui/actions';
import {DaisyColor, DaisyColors, DaisySizes} from '@ui/types';
import {Component} from 'solid-js';

export const ButtonPage: Component = () => {
  const colors = ArrMerge<DaisyColor, 'ghost'>([...DaisyColors], ['ghost']);
  const sizes = [...DaisySizes];

  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Buttons</h2>
      <br />

      <ImportPreview component="Button" />

      <br />

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

      <br />
      <h2 class="text-xl"> Colors</h2>

      <div class="flex gap-1 p-2">
        <Button>Button</Button>
        <Button color="primary">Button</Button>
        <Button color="secondary">Button</Button>
        <Button color="accent">Button</Button>
        <Button color="ghost">Button</Button>
        <Button link>Button</Button>
      </div>

      <div class="divider"></div>

      <h2 class="text-xl">Sizes</h2>

      <div class="flex items-center gap-1 p-2">
        <Button size="lg">Button</Button>
        <Button size="md">Button</Button>
        <Button size="sm">Button</Button>
        <Button size="xs">Button</Button>
      </div>
    </Page>
  );
};
