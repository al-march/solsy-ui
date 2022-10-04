import {Page} from '@page/base';
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
    <Page>
      <h2 class="text-2xl">Checkbox</h2>
      <br />

      <div class="p-4">
        <table class="table table-compact w-full max-w-2xl">
          <thead>
            <tr>
              <th></th>
              <For each={colors}>{color => <th>{color || 'default'}</th>}</For>
            </tr>
          </thead>

          <tbody>
            <For each={sizes}>
              {size => (
                <tr>
                  <th>{size}</th>
                  <For each={colors}>
                    {color => (
                      <th>
                        <Checkbox size={size} color={color} />
                      </th>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </tbody>
        </table>

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
      </div>
    </Page>
  );
};
