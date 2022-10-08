import {Button} from '@ui/actions';
import {Row} from '@ui/layout';
import {Menu, MenuOption} from '@ui/navigation';
import {Component, For, onMount} from 'solid-js';
import {createStore} from 'solid-js/store';

const solsyThemeKey = 'solsy.theme';

const getCheckedTheme = () => {
  return (
    localStorage.getItem(solsyThemeKey) ||
    document.documentElement.getAttribute('data-theme') ||
    ''
  );
};

const themes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
];

type HeaderState = {
  theme: string;
  themeMenu: boolean;
  themeBtn?: HTMLElement;
};

export const Header: Component = () => {
  const [state, setState] = createStore<HeaderState>({
    theme: '',
    themeMenu: false,
  });

  onMount(() => {
    const theme = getCheckedTheme();
    setTheme(theme);
  });

  function setThemeBtn(ref: HTMLElement) {
    setState('themeBtn', ref);
  }

  function toggleMenu() {
    setState('themeMenu', !state.themeMenu);
  }

  function setTheme(theme: string) {
    setState('theme', theme);
    localStorage.setItem(solsyThemeKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  const isOptionChecked = (theme: string) => {
    return state.theme === theme;
  };

  return (
    <header>
      <nav class="navbar bg-base-200 opacity-80">
        <Row class="gap-2 w-full">
          <div class="flex-1"></div>
          <Button
            color="ghost"
            size="sm"
            class="gap-2"
            ref={setThemeBtn}
            onClick={toggleMenu}
          >
            <i class="fa-solid fa-palette" />
            <span class="capitalize">Theme</span>
          </Button>

          <Menu
            reference={state.themeBtn}
            isShow={state.themeMenu}
            onBackdropClick={toggleMenu}
          >
            <div class="h-64 overflow-hidden overflow-y-scroll">
              <For each={themes}>
                {theme => (
                  <MenuOption
                    onClick={() => setTheme(theme)}
                    active={isOptionChecked(theme)}
                  >
                    <span class="capitalize">{theme}</span>
                  </MenuOption>
                )}
              </For>
            </div>
          </Menu>
        </Row>
      </nav>
    </header>
  );
};
