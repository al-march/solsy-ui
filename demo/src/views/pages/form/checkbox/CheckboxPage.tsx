import {Page} from '@page/base';
import {ExampleTable} from '@shared/components';
import {Checkbox, CheckboxColor, CheckboxSize} from '@ui/form';
import {For} from 'solid-js';

export const CheckboxPage = () => {
  const sizes: CheckboxSize[] = ['lg', 'md', 'sm', 'xs'];
  const colors: Array<CheckboxColor | undefined> = [
    undefined,
    'accent',
    'primary',
    'secondary',
  ];

  return (
    <Page class="p-4">
      <h2 class="text-2xl">Checkbox</h2>
      <br />

      <ExampleTable
        class="table-compact w-full max-w-2xl"
        colors={colors}
        sizes={sizes}
        component={(color, size) => <Checkbox size={size} color={color} />}
      />

      <br />
      <h3 class="text-xl">Sizes</h3>
      <br />
      <div class="flex flex-col gap-2">
        <For each={sizes}>
          {size => (
            <div class="flex items-center gap-2">
              <label for={size} class="w-12 opacity-75 cursor-pointer">
                {size}
              </label>
              <Checkbox id={size} size={size} />
            </div>
          )}
        </For>
      </div>

      <br />
      <h3 class="text-xl">Colors</h3>
      <br />
      <div class="flex flex-col gap-2">
        <For each={colors}>
          {color => (
            <div class="flex items-center gap-2">
              <label
                for={color || 'default'}
                class="w-24 opacity-75 cursor-pointer"
              >
                {color || 'default'}
              </label>
              <Checkbox id={color || 'default'} color={color} />
            </div>
          )}
        </For>
      </div>
    </Page>
  );
};