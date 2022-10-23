import {Points, RouterSDKEnum} from '@shared/router/Points';
import {NavLink} from '@solidjs/router';
import {onMount, ParentProps} from 'solid-js';

export const Drawer = (props: ParentProps) => {
  onMount(() => {
    const activeLink = document.querySelector('li .active');
    if (activeLink instanceof HTMLElement) {
      activeLink.scrollIntoView();
    }
  });

  return (
    <div class="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">{props.children}</div>
      <div class="drawer-side bg-base-200 shadow">
        <label for="my-drawer-2" class="drawer-overlay" />
        <div class="w-60">
          <div class="font-title p-4 text-primary inline-flex text-lg transition-all duration-200 md:text-3xl font-bold">
            <span class="lowercase">solsy</span>
            <span class="text-base-content uppercase">UI</span>
          </div>

          <Menu>
            <MenuTitle>SDK</MenuTitle>
            <MenuLink href={`/${RouterSDKEnum.FORM}`}>Form</MenuLink>
            <MenuDivider />
          </Menu>

          <Menu>
            <MenuTitle>Actions</MenuTitle>
            <MenuLink href={`/${Points.BUTTON}`}>Button</MenuLink>
            <MenuLink href={`/${Points.MODALS}`}>Modal</MenuLink>
            <MenuLink href={`/${Points.SWAP}`}>Swap</MenuLink>
            <MenuDivider />
          </Menu>

          <Menu>
            <MenuTitle>Form</MenuTitle>
            <MenuLink href={`/${Points.AUTOCOMPLETE}`}>Autocomplete</MenuLink>
            <MenuLink href={`/${Points.CHECKBOX}`}>Checkbox</MenuLink>
            <MenuLink href={`/${Points.SELECT}`}>Select</MenuLink>
            <MenuLink href={`/${Points.INPUT}`}>Input</MenuLink>
            <MenuLink href={`/${Points.RADIO}`}>Radio</MenuLink>
            <MenuLink href={`/${Points.TEXTAREA}`}>Textarea</MenuLink>
            <MenuLink href={`/${Points.DATEPICKER}`}>Datepicker</MenuLink>
            <MenuLink href={`/${Points.RANGE}`}>Range</MenuLink>
            <MenuLink href={`/${Points.TOGGLE}`}>Toggle</MenuLink>
            <MenuDivider />
          </Menu>

          <Menu>
            <MenuTitle>Layout</MenuTitle>
            <MenuLink href={`/${Points.DIVIDER}`}>Divider</MenuLink>
            <MenuDivider />
          </Menu>

          <Menu>
            <MenuTitle>Navigation</MenuTitle>
            <MenuLink href={`/${Points.MENU}`}>Menu</MenuLink>
            <MenuLink href={`/${Points.TABS}`}>Tabs</MenuLink>
            <MenuLink href={`/${Points.BTN_GROUPS}`}>Buttons group</MenuLink>
            <MenuDivider />
          </Menu>

          <Menu>
            <MenuTitle>Data view</MenuTitle>
            <MenuLink href={`/${Points.ALERTS}`}>Alerts</MenuLink>
            <MenuLink href={`/${Points.AVATAR}`}>Avatar</MenuLink>
            <MenuLink href={`/${Points.BADGE}`}>Badge</MenuLink>
            <MenuLink href={`/${Points.COLLAPSE}`}>Collapse</MenuLink>
            <MenuLink href={`/${Points.POPOVER}`}>Popover</MenuLink>
            <MenuLink href={`/${Points.PROGRESS}`}>Progress</MenuLink>
            <MenuLink href={`/${Points.TOOLTIP}`}>Tooltip</MenuLink>
          </Menu>
        </div>
      </div>
    </div>
  );
};

const Menu = (props: ParentProps) => (
  <ul class="menu menu-compact gap-1 flex flex-col p-0 px-2">
    {props.children}
  </ul>
);

const MenuTitle = (props: ParentProps) => (
  <li class="menu-title">
    <span>{props.children}</span>
  </li>
);

const MenuLink = (props: ParentProps<{href: string}>) => {
  return (
    <li>
      <NavLink href={props.href} activeClass="active">
        {props.children}
      </NavLink>
    </li>
  );
};

const MenuDivider = () => <li />;
