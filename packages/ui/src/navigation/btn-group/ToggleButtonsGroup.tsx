import { Component } from 'solid-js';
import { ToggleButtonsProvider } from './ToggleButtonProvider';

type Props = {
    onChange?: (btnValue: any) => void;
    defaultValue?: any;
    multiple?: boolean;
}

/**
 * Создает контекст для управления состояния ToggleButton
 *
 * @example
 * <ToggleButtonsGroup
 *     onChange={(v) => setActiveBtn(v)}
 *     defaultValue={activeBtn()}
 *     multiple
 * >
 *     <ToggleButton value={1}>1</ToggleButton>
 *     <ToggleButton value={2}>2</ToggleButton>
 *     <ToggleButton value={3}>3</ToggleButton>
 * </ToggleButtonsGroup>
 */
export const ToggleButtonsGroup: Component<Props> = (props) => {

    return (
        <ToggleButtonsProvider
            defaultValue={props.defaultValue}
            multiple={props.multiple}
            onChange={props.onChange}
        >
            <div class="btn-group">
                {props.children}
            </div>
        </ToggleButtonsProvider>
    );
};