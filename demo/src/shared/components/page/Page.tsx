import {Component} from './Component';
import {Section} from './Section';
import {Title} from './Title';
import {generateAnchor} from '@shared/components/page/utils';
import {Row} from '@ui/layout';
import {debounce} from 'lodash';
import {
  createContext,
  createSignal,
  For,
  mergeProps,
  onMount,
  ParentProps,
  useContext,
} from 'solid-js';
import {createStore} from 'solid-js/store';

export type PageSection = {
  id?: number;
  name: string;
  el: HTMLElement;
};

type PageState = {
  sections: PageSection[];
  activeAnchor?: string;
};

type PageCtx = {
  state: PageState;
  initSection: (name: PageSection) => void;
};

const PageCtx = createContext<PageCtx>();

export const usePage = () => {
  const ctx = useContext(PageCtx);
  if (ctx) {
    return ctx;
  }
  throw new Error('No context for Page');
};

type Props = {
  full?: boolean;
  class?: string;
};

const PageBase = (props: ParentProps<Props>) => {
  const pr = mergeProps({class: ''}, props);
  const [contentRef, setContentRef] = createSignal<HTMLElement>();
  const [state, setState] = createStore<PageState>({
    sections: [],
  });

  onMount(() => {
    setTimeout(() => {
      const anchor = window.location.hash;
      const section = state.sections.find(
        sect => `#${generateAnchor(sect.name)}` === anchor
      );
      if (section) {
        section.el.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
      }
    });
    checkScroll();
  });

  function checkScroll() {
    const content = contentRef();
    if (content) {
      content.addEventListener('scroll', debounce(onScroll, 40));
    }
  }

  function onScroll() {
    const content = contentRef();
    if (!content) {
      return;
    }

    for (const section of state.sections) {
      const sectionArea = section.el.offsetTop + section.el.scrollHeight - 30;
      if (sectionArea >= content.scrollTop) {
        const anchor = generateAnchor(section.name);
        history.replaceState(undefined, '', `#${anchor}`);
        initAnchor(anchor);
        return;
      }
    }
  }

  function initSection(section: PageSection) {
    const sections = state.sections;
    setState('sections', [...sections, section]);
  }

  function initAnchor(anchor: string) {
    setState('activeAnchor', anchor);
  }

  const AnchorLink = (props: {section: PageSection}) => (
    <a
      class="capitalize hover:underline"
      classList={{
        'text-info': state.activeAnchor === generateAnchor(props.section.name),
      }}
      href={`#${generateAnchor(props.section.name)}`}
    >
      {props.section.name}
    </a>
  );

  return (
    <PageCtx.Provider
      value={{
        state,
        initSection,
      }}
    >
      <div
        class="flex-1 overflow-hidden relative"
        classList={{
          [pr.class]: !!pr.class,
        }}
      >
        <div class="flex h-full overflow-hidden gap-6">
          <div
            class="w-5/6 overflow-hidden overflow-y-scroll scroll-smooth"
            ref={setContentRef}
          >
            {props.children}
          </div>

          <div class="px-4 w-1/6 overflow-hidden overflow-y-scroll h-full">
            <Row orientation="col" class="gap-1">
              <For each={state.sections}>
                {section => <AnchorLink section={section} />}
              </For>
            </Row>
          </div>
        </div>
      </div>
    </PageCtx.Provider>
  );
};

export const Page = Object.assign(PageBase, {
  Section,
  Title,
  Component,
});
