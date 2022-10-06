import Prism from 'prismjs';
import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  ParentProps,
} from 'solid-js';

type Props = {
  lang?: string;
};

export const CodePreview = (props: ParentProps<Props>) => {
  const pr = mergeProps({lang: 'tsx'}, props);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  createEffect(
    on(ref, r => {
      r && Prism.highlightElement(r);
    })
  );

  return (
    <div class="-my-4 py-8">
      <pre class="line-numbers">
        <code class={`language-${pr.lang}`} ref={setRef}>
          {props.children}
        </code>
      </pre>
    </div>
  );
};
