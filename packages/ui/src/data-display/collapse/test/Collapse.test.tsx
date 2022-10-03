import {Collapse, CollapseIcon, CollapseSelectors} from '../Collapse';
import {createSignal} from 'solid-js';
import {fireEvent, render, screen} from 'solid-testing-library';

const {COLLAPSE, LABEL, CONTENT} = CollapseSelectors;

describe('Collapse', function () {
  test('Should be rendered', () => {
    render(() => <Collapse label="" />);
    expect(screen.getByTestId(COLLAPSE)).toBeInTheDocument();
  });
  test('should set label', () => {
    const label = 'label content';
    render(() => <Collapse label={label} />);
    expect(screen.getByTestId(LABEL)).toBeInTheDocument();
    expect(screen.getByTestId(LABEL)).toHaveTextContent(label);
  });
  test('should set content', () => {
    const content = 'content';
    render(() => <Collapse label="">{content}</Collapse>);
    expect(screen.getByTestId(CONTENT)).toBeInTheDocument();
    expect(screen.getByTestId(CONTENT)).toHaveTextContent(content);
  });
  test('should has icon class', () => {
    const [icon, setIcon] = createSignal<CollapseIcon>('plus');
    render(() => <Collapse icon={icon()} label="" />);
    expect(screen.getByTestId(COLLAPSE)).toHaveClass(`collapse-${icon()}`);
    setIcon('arrow');
    expect(screen.getByTestId(COLLAPSE)).toHaveClass(`collapse-${icon()}`);
  });
  test('should set ref', () => {
    let ref: HTMLDivElement | null = null;
    render(() => <Collapse ref={r => (ref = r)} label="" />);
    expect(ref).toBeTruthy();
  });
  test('should set class', () => {
    const className = 'custom-class';
    render(() => <Collapse class={className} label="" />);
    expect(screen.getByTestId(COLLAPSE)).toHaveClass(className);
  });
  test('should emit onClick', () => {
    const onClick = jest.fn();
    render(() => <Collapse onClick={onClick} label="" />);
    fireEvent.click(screen.getByTestId(COLLAPSE));
    expect(onClick).toBeCalled();
  });
  test('should emit onFocus', () => {
    const onFocus = jest.fn();
    render(() => <Collapse onFocus={onFocus} label="" />);
    fireEvent.focus(screen.getByTestId(COLLAPSE));
    expect(onFocus).toBeCalled();
  });
  test('should emit onBlur', () => {
    const onBlur = jest.fn();
    render(() => <Collapse onBlur={onBlur} label="" />);
    fireEvent.blur(screen.getByTestId(COLLAPSE));
    expect(onBlur).toBeCalled();
  });
});
