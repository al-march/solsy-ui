import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { BtnGroup } from '../../../../../../packages/ui/src/navigation';

export const BtnGroupPage: Component = () => {
  const [btn, setBtn] = createSignal();

  function onButtonsChange(v: any) {
    setBtn(v);
    console.log(v);
  }

  return (
    <Page full class="p-4">
      <BtnGroup
        value={btn()}
        onInput={onButtonsChange}
        size="sm"
      >
        <BtnGroup.Item>1</BtnGroup.Item>
        <BtnGroup.Item>2</BtnGroup.Item>
        <BtnGroup.Item defaultChecked>3</BtnGroup.Item>
      </BtnGroup>

      <span class="divider"/>

      <div class="w-32">
        <BtnGroup
          size="sm"
          orientation="vertical"
        >
          <BtnGroup.Item>1</BtnGroup.Item>
          <BtnGroup.Item>2</BtnGroup.Item>
          <BtnGroup.Item>3</BtnGroup.Item>
        </BtnGroup>
      </div>
    </Page>
  );
};
