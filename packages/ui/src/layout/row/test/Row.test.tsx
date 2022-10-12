import {alignItems, justifyItems} from '../../../types';
import {Row, RowOrientation, RowSelectors} from '../Row';
import {cleanup, render, screen} from 'solid-testing-library';

const getRow = () => screen.getByTestId(RowSelectors.ROW);

describe('Row', () => {
  test('should render', () => {
    render(() => <Row />);
    expect(getRow()).toBeInTheDocument();
  });
  test('should set orientation', () => {
    const orientations: RowOrientation[] = ['row', 'col'];
    orientations.forEach(orientation => {
      render(() => <Row orientation={orientation} />);
      expect(getRow()).toHaveClass(`flex-${orientation}`);
      cleanup();
    });
  });
  test('should set align-items', () => {
    alignItems.forEach(items => {
      render(() => <Row items={items} />);
      expect(getRow()).toHaveClass(`items-${items}`);
      cleanup();
    });
  });
  test('should set justify-items', () => {
    justifyItems.forEach(justify => {
      render(() => <Row justify={justify} />);
      expect(getRow()).toHaveClass(`justify-${justify}`);
      cleanup();
    });
  });
  test('should set custom class', () => {
    const className = 'custom-class';
    render(() => <Row class={className} />);
    expect(getRow()).toHaveClass(className);
  });
});
