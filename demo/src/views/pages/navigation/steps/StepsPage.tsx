import { Component, createSignal } from 'solid-js';
import { Page } from '../../base/Page';
import { Step, Steps } from '../../../../../../packages/ui/src/navigation';

export const StepsPage: Component = () => {
    const [step, setStep] = createSignal(0);

    return (
        <Page full class="p-4">
            <h2 class="text-2xl">Steps</h2>
            <br/>

            <Steps stepIndex={step} steps={[
                <Step label={'Step 1'} index={0}>
                    <div>
                        <p>Lalala</p>
                        <button class="btn btn-sm" onClick={() => setStep(step() + 1)}>Next</button>
                    </div>
                </Step>,
                <Step label={'Step 2'} index={1}>
                    <div>
                        <p>Bababa</p>
                        <button class="btn btn-sm" onClick={() => setStep(step() - 1)}>Prev</button>
                    </div>
                </Step>
            ]}/>
        </Page>
    );
};
