import { Link } from 'solid-app-router';
import { ParentProps } from 'solid-js';
import { RoutersComponentsEnum, RouterSDKEnum } from '../../shared/router/RoutersComponentsEnum';

export const Drawer = (props: ParentProps) => {
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
            <div class="drawer-content flex flex-col">
                {props.children}
            </div>
            <div class="drawer-side bg-base-200 shadow">
                <label for="my-drawer-2" class="drawer-overlay"/>
                <div class="w-60">
                    <div
                        class="font-title p-4 text-primary inline-flex text-lg transition-all duration-200 md:text-3xl font-bold"
                    >
                        <span class="lowercase">daisy</span>
                        <span class="text-base-content uppercase">UI</span>
                    </div>

                    <Menu>
                        <MenuTitle>SDK</MenuTitle>
                        <MenuLink href={`/${RouterSDKEnum.FORM}`}>Form</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Actions</MenuTitle>
                        <MenuLink href={`/${RoutersComponentsEnum.BUTTON}`}>Button</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.MODALS}`}>Modal</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Form</MenuTitle>
                        <MenuLink href={`/${RoutersComponentsEnum.FORM_SELECT}`}>Select</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.FORM_INPUT}`}>Input</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.FORM_TEXTAREA}`}>Textarea</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.FORM_AUTOCOMPLETE}`}>Autocomplete</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.FORM_DATEPICKER}`}>Datepicker</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.RANGE}`}>Range</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.TOGGLE}`}>Toggle</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                      <MenuTitle>Layout</MenuTitle>
                      <MenuLink href={`/${RoutersComponentsEnum.DIVIDER}`}>Divider</MenuLink>
                      <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Navigation</MenuTitle>
                        <MenuLink href={`/${RoutersComponentsEnum.MENU}`}>Menu</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.TABS}`}>Tabs</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.BTN_GROUPS}`}>Buttons group</MenuLink>
                        <MenuDivider/>
                    </Menu>

                    <Menu>
                        <MenuTitle>Data view</MenuTitle>
                        <MenuLink href={`/${RoutersComponentsEnum.TOOLTIP}`}>Tooltip</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.POPOVER}`}>Popover</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.COLLAPSE}`}>Collapse</MenuLink>
                        <MenuLink href={`/${RoutersComponentsEnum.AVATAR}`}>Avatar</MenuLink>
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

const MenuLink = (props: ParentProps<{ href: string }>) => (
    <li>
        <Link href={props.href}>{props.children}</Link>
    </li>
);

const MenuDivider = () => <li/>;
