import { cleanup, render, screen } from 'solid-testing-library';
import { Badge, BadgeColor, BadgeSelectors, BadgeSize } from '../Badge';
import { ObjectKeys } from '../../../utils/object';

type Classes = {
    main: string;
    colors: Record<BadgeColor, string>;
    sizes: Record<BadgeSize, string>;
    outline: string;
}

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
    outline: addPrefix('outline')
};

const {BADGE} = BadgeSelectors;

describe('Badge', () => {

    test('should be rendered', () => {
        render(() => <Badge/>);
        expect(screen.getByTestId(BADGE)).toBeInTheDocument();
    });

    test('should be show test', () => {
        const text = 'text';
        render(() => <Badge>{text}</Badge>);
        expect(screen.getByTestId(BADGE)).toHaveTextContent(text);
    });

    test('should set color classes', () => {
        const {colors} = classes;
        ObjectKeys(colors).forEach(color => {
            render(() => <Badge color={color}/>);
            expect(screen.getByTestId(BADGE)).toHaveClass(colors[color]);
            cleanup();
        });
    });

    test('should set size classes', () => {
        const {sizes} = classes;
        ObjectKeys(sizes).forEach(size => {
            render(() => <Badge size={size}/>);
            expect(screen.getByTestId(BADGE)).toHaveClass(sizes[size]);
            cleanup();
        });
    });

    test('should be outlined', () => {
        render(() => <Badge outline/>);
        expect(screen.getByTestId(BADGE)).toHaveClass(classes.outline);
    });
});
