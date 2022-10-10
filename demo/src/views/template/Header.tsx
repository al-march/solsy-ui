import {Button} from '@ui/actions';
import {Row} from '@ui/layout';
import {Menu} from '@ui/navigation';
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
};

export const Header: Component = () => {
  return (
    <header>
      <nav class="navbar bg-base-200 opacity-80">
        <Row class="gap-2 w-full">
          <div class="flex-1"></div>
          <ThemeMenu />
        </Row>
      </nav>
    </header>
  );
};

function ThemeMenu() {
  const [state, setState] = createStore<HeaderState>({
    theme: '',
  });

  onMount(() => {
    const theme = getCheckedTheme();
    setTheme(theme);
  });

  function setTheme(theme: string) {
    setState('theme', theme);
    localStorage.setItem(solsyThemeKey, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  const isOptionChecked = (theme: string) => {
    return state.theme === theme;
  };

  const MenuItems = () => (
    <For each={themes}>
      {theme => (
        <Menu.Item
          onClick={() => setTheme(theme)}
          active={isOptionChecked(theme)}
        >
          <span class="capitalize">{theme}</span>
        </Menu.Item>
      )}
    </For>
  );

  const MenuTrigger = () => (
    <Button color="ghost" size="sm" class="gap-2">
      <i class="fa-solid fa-palette" />
      <span class="capitalize">Theme</span>
    </Button>
  );

  return (
    <Menu>
      <Menu.Trigger>
        <MenuTrigger />
      </Menu.Trigger>

      <Menu.Dropdown class="h-64">
        <MenuItems />
      </Menu.Dropdown>
    </Menu>
  );
}
