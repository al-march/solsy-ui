import {DefaultExample} from './examples/DefaultExample';
import {ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';

export const ModalPage = () => {
  return (
    <Page full class="p-4">
      <h2 class="text-2xl">Modals</h2>

      <Page.Section name="import">
        <br />
        <ImportPreview component="Modal" />
        <br />
      </Page.Section>

      <Page.Section name={'default usage'}>
        <h2 class="text-2xl">Default usage</h2>
        <br />
        <DefaultExample />
      </Page.Section>
    </Page>
  );
};
