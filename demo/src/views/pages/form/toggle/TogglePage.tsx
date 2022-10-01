import {Page} from '@page/base';
import {Toggle} from '@ui/form';
import {Component} from 'solid-js';

export const TogglePage: Component = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl mb-5">Toggle</h2>

      <div class="w-96 grid gap-2 mb-5">
        <h3 class="text-xl mb-2">Colors</h3>
        <div class="flex items-center gap-3">
          <label>Primary</label> <Toggle color="primary" />
        </div>
        <div class="flex items-center gap-3">
          <label>Secondary</label> <Toggle color="secondary" />
        </div>
        <div class="flex items-center gap-3">
          <label>Accent</label> <Toggle color="accent" />
        </div>
      </div>

      <div class="w-96 grid gap-2 mb-5">
        <h3 class="text-xl mb-2">Sizes</h3>
        <div class="flex items-center gap-3">
          <label class="text-lg">Large</label> <Toggle size="lg" />
        </div>
        <div class="flex items-center gap-3">
          <label class="text-md">Medium</label> <Toggle size="md" />
        </div>
        <div class="flex items-center gap-3">
          <label class="text-sm">Small</label> <Toggle size="sm" />
        </div>
        <div class="flex items-center gap-3">
          <label class="text-xs">Extra small</label> <Toggle size="xs" />
        </div>
      </div>

      <div class="w-96 grid gap-2 mb-5">
        <h3 class="text-xl mb-2">Disabled</h3>
        <div class="flex items-center gap-3">
          <label>Disabled</label> <Toggle disabled />
        </div>
        <div class="flex items-center gap-3">
          <label>Disabled checked</label> <Toggle disabled value={true} />
        </div>
      </div>

      <div class="w-96 grid gap-2 mb-5">
        <h3 class="text-xl mb-2">Indeterminate</h3>
        <Toggle indeterminate />
      </div>
    </Page>
  );
};
