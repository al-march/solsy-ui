import {Code} from '@shared/components/Code';
import {Config} from '@shared/config';
import {createMemo, ParentProps} from 'solid-js';

type Props = {
  class?: string;
  component?: string;
};

export const ImportPreview = (props: ParentProps<Props>) => {
  const code = createMemo(
    () => `import {${props.component}} from '${Config.LIB}';`
  );

  return (
    <div classList={{[props.class || '']: !!props.class}}>
      <h3 class="text-xl">Import</h3>
      <Code>{code()}</Code>
    </div>
  );
};
