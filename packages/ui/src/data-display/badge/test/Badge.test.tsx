import {ObjectKeys} from '../../../utils/object';
import {Badge, BadgeColor, BadgeSelectors, BadgeSize} from '../Badge';
import {cleanup, render, screen} from '@solidjs/testing-library';

type Classes = {
  main: string;
  colors: Record<BadgeColor, string>;
  sizes: Record<BadgeSize, string>;
  outline: string;
};

export const addPrefix = (name: string) => `badge-${name}`;

export const classes: Classes = {
  main: 'badge',
  colors: {
    accent: addPrefix('accent'),
    primary: addPrefix('primary'),
    secondary: addPrefix('secondary'),
    info: addPrefix('info'),
    success: addPrefix('success'),
    warning: addPrefix('warning'),
    error: addPrefix('error'),
    ghost: addPrefix('ghost'),
  },
  sizes: {
    lg: addPrefix('lg'),
    md: addPrefix('md'),
    sm: addPrefix('sm'),
    xs: addPrefix('xs'),
  },
  outline: addPrefix('outline'),
};

const {BADGE} = BadgeSelectors;

const getBadge = () => screen.getByTestId(BADGE);

describe('Badge', () => {
  test('should be rendered', () => {
    render(() => <Badge />);
    expect(getBadge()).toBeInTheDocument();
  });
  test('should be show test', () => {
    const text = 'text';
    render(() => <Badge>{text}</Badge>);
    expect(getBadge()).toHaveTextContent(text);
  });
  test('should set color classes', () => {
    const {colors} = classes;
    ObjectKeys(colors).forEach(color => {
      render(() => <Badge color={color} />);
      expect(getBadge()).toHaveClass(colors[color]);
      cleanup();
    });
  });
  test('should set size classes', () => {
    const {sizes} = classes;
    ObjectKeys(sizes).forEach(size => {
      render(() => <Badge size={size} />);
      expect(getBadge()).toHaveClass(sizes[size]);
      cleanup();
    });
  });
  test('should set custom class', () => {
    const className = 'badge-custom-class';
    render(() => <Badge class={className} />);
    expect(getBadge()).toHaveClass(className);
  });
  test('should set id', () => {
    const id = 'badge-id';
    render(() => <Badge id={id} />);
    expect(getBadge()).toHaveAttribute('id', id);
  });
  test('should be outlined', () => {
    render(() => <Badge outline />);
    expect(getBadge()).toHaveClass(classes.outline);
  });
});
