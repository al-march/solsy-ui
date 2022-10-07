import {Page} from '@page/base';
import {ImportPreview} from '@shared/components';
import {Textarea} from '@ui/form';
import {Component} from 'solid-js';

export const TextareaPage: Component = () => {
  return (
    <Page full class="p-4">
      <h3 class="text-xl">Textarea Page</h3>

      <br />
      <ImportPreview component="Textarea" />
      <br />

      <span class="divider" />

      <Textarea autosize class="py-0" placeholder="textarea" bordered />
    </Page>
  );
};
