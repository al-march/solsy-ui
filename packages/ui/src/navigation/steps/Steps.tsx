import {
    Accessor,
    Component,
    createContext,
    JSXElement,
    useContext,
    For,
    createSignal,
    createMemo
} from 'solid-js';

/**
 * Todo: добавить вертикальный режим
 */

type StepsContext = {
    step: Accessor<number>;
    stepContent: JSXElement;
    setStep: (step: number) => void;
    setStepContent: (content: JSXElement) => void;
}

const StepsContent = createContext<StepsContext>();

type Props = {
    stepIndex: Accessor<number>;
    steps: JSXElement[];
    update?: (i: number) => void;
}

export const Steps: Component<Props> = (props) => {
    const [stepContent, setStepContent] = createSignal<JSXElement>();
    const step = createMemo(() => props.stepIndex());

    const store: StepsContext = {
        step,
        stepContent,
        setStep: (step) => props.update?.(step),
        setStepContent
    };

    return (
        <StepsContent.Provider value={store}>
            <div class="flex flex-col">
                <ul class="steps transition-all">
                    <For each={props.steps}>
                        {(step) => step}
                    </For>
                </ul>

                {stepContent()}
            </div>
        </StepsContent.Provider>
    );
};

export const useSteps = () => useContext(StepsContent)!;
