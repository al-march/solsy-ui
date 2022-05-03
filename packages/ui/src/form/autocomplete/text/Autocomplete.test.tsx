import { fireEvent, render, screen } from 'solid-testing-library';
import { Autocomplete, AutocompleteSelectors } from '../Autocomplete';
import { AutocompleteOption } from '../AutocompleteOption';
import { For } from 'solid-js';

const {AUTOCOMPLETE, DROPDOWN, OPTION} = AutocompleteSelectors;

const options = ['1', '2', '3', '4'];

describe('Autocomplete', () => {

    test('should be rendered', () => {
        render(() => (
            <Autocomplete>
                <AutocompleteOption value="Option">Option</AutocompleteOption>
            </Autocomplete>
        ));
        expect(screen.getByTestId(AUTOCOMPLETE)).toBeInTheDocument();
    });

    test('should open dropdown', () => {
        render(() => (
            <Autocomplete>
                <AutocompleteOption value="Option">Option</AutocompleteOption>
            </Autocomplete>
        ));
        fireEvent.focus(screen.getByTestId(AUTOCOMPLETE));
        expect(screen.getByTestId(DROPDOWN)).toBeInTheDocument();
    });

    test('should set value from option', () => {
        const expectValue = 'value';
        render(() => (
            <Autocomplete show>
                <AutocompleteOption value={expectValue}>{expectValue}</AutocompleteOption>
            </Autocomplete>
        ));
        fireEvent.click(screen.getByTestId(OPTION));
        expect(screen.getByTestId(AUTOCOMPLETE)).toHaveValue(expectValue);
    });

    test('should render options', () => {
        render(() => (
            <Autocomplete show>
                <For each={options}>
                    {opt => <AutocompleteOption value={opt}>{opt}</AutocompleteOption>}
                </For>
            </Autocomplete>
        ));
        expect(screen.getAllByTestId(OPTION).length).toBe(options.length);
    });

    test('should filter options', () => {
        render(() => (
            <Autocomplete show value={options[0]}>
                <For each={options}>
                    {opt => <AutocompleteOption value={opt}>{opt}</AutocompleteOption>}
                </For>
            </Autocomplete>
        ));

        const optionsRef = screen.getAllByTestId(OPTION);
        expect(optionsRef.length).toBe(1);
        expect(optionsRef[0]).toHaveTextContent(options[0]);
    });

    test('should be option disabled', () => {
        render(() => (
            <Autocomplete show>
                <AutocompleteOption disabled value="1">1</AutocompleteOption>
            </Autocomplete>
        ));

        expect(screen.getByTestId(OPTION)).toBeDisabled();
    });
});
