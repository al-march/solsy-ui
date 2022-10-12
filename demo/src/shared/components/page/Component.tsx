import {Code} from '@shared/components';
import {Row} from '@ui/layout';
import {Tab, Tabs} from '@ui/navigation';
import {JSXElement, ParentProps} from 'solid-js';

type ComponentProps = {
  preview: JSXElement;
  snippet: string;
};

export const Component = (props: ParentProps<ComponentProps>) => {
  return (
    <div class="page-component">
      <Tabs view="lifted">
        <Tab label="preview" class="preview-tab">
          <Row class="w-full py-4 bg-base-200" justify="center">
            {props.preview}
          </Row>
        </Tab>
        <Tab label="code" class="code-tab">
          <div class="bg-base-200">
            <Code>{props.snippet}</Code>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};
