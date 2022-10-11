import {PageSection, usePage} from './Page';
import {generateAnchor} from './utils';
import {Divider} from '@ui/layout';
import {createSignal, mergeProps, onMount, ParentProps} from 'solid-js';

type SectionProps = {
  name: string;
  class?: string;
};

export const Section = (props: ParentProps<SectionProps>) => {
  const page = usePage();
  const pr = mergeProps({class: ''}, props);
  const [ref, setRef] = createSignal<HTMLElement>();

  onMount(() => {
    const el = ref();
    if (el) {
      const section: PageSection = {
        name: pr.name,
        el,
      };
      page.initSection(section);
    }
  });

  return (
    <section
      classList={{[pr.class]: !!pr.class}}
      ref={setRef}
      id={generateAnchor(pr.name)}
    >
      {props.children}
      <Divider />
    </section>
  );
};
