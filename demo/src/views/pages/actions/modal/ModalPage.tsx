import {DefaultExample} from './examples/DefaultExample';
import {ResponsiveExample} from '@page/actions/modal/examples/ResponsiveExample';
import {ComponentProps, ImportPreview} from '@shared/components';
import {Page} from '@shared/components/page';
import {Divider, Row} from '@ui/layout';

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
        <Page.Title>Default usage</Page.Title>

        <DefaultExample />
      </Page.Section>

      <Page.Section name="Responsive">
        <Page.Title>Responsive modal</Page.Title>

        <ResponsiveExample />
      </Page.Section>

      <Page.Section name="Props">
        <Page.Title>Modal props</Page.Title>

        <Row orientation="col">
          <ComponentProps
            name="show"
            description="Open/close modal"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="trigger"
            description="The trigger element needed to set focus after the modal closes"
            types="HTMLElement"
            defaultValue="undefined"
          />

          <Divider />

          <ComponentProps
            name="responsive"
            description="Modal goes bottom on mobile screen and goes middle on desktop"
            types="boolean"
            defaultValue="false"
          />

          <Divider />

          <ComponentProps
            name="onBackdropClick"
            description="Emit when the user clicks outside of the modal area"
            types="() => void"
            defaultValue="undefined"
          />

          <Divider />

          <ComponentProps
            name="onOpen"
            description="Emit on modal opens"
            types="() => void"
            defaultValue="undefined"
          />

          <Divider />

          <ComponentProps
            name="onClose"
            description="Emit on modal closes"
            types="() => void"
            defaultValue="undefined"
          />
        </Row>
      </Page.Section>
    </Page>
  );
};
