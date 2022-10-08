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

export const Code = (props: ParentProps<Props>) => {
  const pr = mergeProps({lang: 'tsx'}, props);
  const [ref, setRef] = createSignal<HTMLDivElement>();

  createEffect(
    on(ref, r => {
      r && Prism.highlightElement(r);
    })
  );

  return (
    <div class="relative">
      <pre class="line-numbers">
        <code class={`language-${pr.lang}`} ref={setRef}>
          {props.children}
        </code>
      </pre>
    </div>
  );
};
