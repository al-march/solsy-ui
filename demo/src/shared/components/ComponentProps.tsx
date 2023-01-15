import {JSXElement} from 'solid-js';

type Props = {
  name: JSXElement;
  description: JSXElement;
  types: JSXElement;
  defaultValue?: JSXElement;
};

export const ComponentProps = (props: Props) => {
  return (
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <thead>
          <tr>
            <th class="w-[170px]">
              <span class="text-xl lowercase">{props.name}</span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="w-[170px]">Description</th>
            <td>{props.description}</td>
          </tr>
          <tr>
            <th class="w-[170px]">Type</th>
            <td>{props.types}</td>
          </tr>

          {props.defaultValue && (
            <tr>
              <th class="w-[170px]">Default</th>
              <td>{props.defaultValue}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
