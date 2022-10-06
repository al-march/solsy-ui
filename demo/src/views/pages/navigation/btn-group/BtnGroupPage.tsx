import {Page} from '@page/base';
import {ImportPreview} from '@shared/components';
import {BtnGroup} from '@ui/navigation';
import {Component, createSignal} from 'solid-js';

export const BtnGroupPage: Component = () => {
  const [btn, setBtn] = createSignal();

  function onButtonsChange(v: any) {
    setBtn(v);
    console.log(v);
  }

  return (
    <Page full class="p-4">
      <br />
      <ImportPreview component="BtnGroup" />
      <br />

      <BtnGroup value={btn()} onInput={onButtonsChange} size="sm">
        <BtnGroup.Item>1</BtnGroup.Item>
        <BtnGroup.Item>2</BtnGroup.Item>
        <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
      </BtnGroup>

      <span class="divider" />

      <div class="w-32">
        <BtnGroup size="sm" orientation="vertical">
          <BtnGroup.Item>1</BtnGroup.Item>
          <BtnGroup.Item>2</BtnGroup.Item>
          <BtnGroup.Item>3</BtnGroup.Item>
        </BtnGroup>
      </div>
    </Page>
  );
};
