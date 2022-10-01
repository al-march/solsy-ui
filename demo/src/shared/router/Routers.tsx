import {Points, RouterSDKEnum} from './Points';
import {ButtonPage, ModalPage} from '@page/actions';
import {AvatarPage, CollapsePage, PopoverPage, TooltipPage} from '@page/data';
import {
  AutocompletePage,
  DatepickerPage,
  InputPage,
  RangePage,
  SelectPage,
  TextareaPage,
  TogglePage,
} from '@page/form';
import {HomePage} from '@page/home';
import {DividerPage} from '@page/layout';
import {FormPage} from '@page/sdk';
import {BtnGroupPage, MenuPage, NotFound, TabsPage} from '@src/views/pages';
import {Route, Routes} from 'solid-app-router';
import {Component} from 'solid-js';

export const Routers: Component = () => {
  return (
    <Routes>
      <Route path={`/`} element={<HomePage />} />
      <Route path={`/${Points.SELECT}`} element={<SelectPage />} />
      <Route path={`/${Points.INPUT}`} element={<InputPage />} />
      <Route path={`/${Points.TEXTAREA}`} element={<TextareaPage />} />
      <Route path={`/${Points.AUTOCOMPLETE}`} element={<AutocompletePage />} />
      <Route path={`/${Points.DATEPICKER}`} element={<DatepickerPage />} />
      <Route path={`/${Points.TOGGLE}`} element={<TogglePage />} />
      <Route path={`/${Points.MENU}`} element={<MenuPage />} />
      <Route path={`/${Points.TABS}`} element={<TabsPage />} />
      <Route path={`/${Points.BTN_GROUPS}`} element={<BtnGroupPage />} />
      <Route path={`/${Points.RANGE}`} element={<RangePage />} />
      <Route path={`/${Points.MODALS}`} element={<ModalPage />} />
      <Route path={`/${Points.BUTTON}`} element={<ButtonPage />} />
      <Route path={`/${Points.TOOLTIP}`} element={<TooltipPage />} />
      <Route path={`/${Points.POPOVER}`} element={<PopoverPage />} />
      <Route path={`/${Points.COLLAPSE}`} element={<CollapsePage />} />
      <Route path={`/${Points.DIVIDER}`} element={<DividerPage />} />
      <Route path={`/${Points.AVATAR}`} element={<AvatarPage />} />
      <Route path={`/${RouterSDKEnum.FORM}`} element={<FormPage />} />

      <Route path="/*all" element={<NotFound />} />
    </Routes>
  );
};
