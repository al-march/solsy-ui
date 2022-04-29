import { Component } from 'solid-js';
import { Page } from '../../base/Page';
import { Tab, Tabs } from '../../../../../../packages/ui/src/navigation';

/**
 * Todo: 1) create value props
 * Todo: 2) create view props
 */
export const TabsPage: Component = () => {
    return (
        <Page full class="p-4">
            <Tabs defaultValue={2}>
                <CarTab/>
                <PlaneTab/>
                <BuildingTab/>
            </Tabs>
        </Page>
    );
};

const CarTab = () => {
    const label = <div><i class="fa-solid fa-car pr-2"/>Cars</div>;

    return (
        <Tab label={label}>
            <div class="flex flex-col items-start">
                <span class="mb-2">
                    <i class="fa-solid fa-car pr-2"/>
                   Cars tab
                </span>
                <button class="btn btn-sm btn-primary">Car</button>
            </div>
        </Tab>
    );
};

const PlaneTab = () => {
    const label = <div><i class="fa-solid fa-plane-departure pr-2"/>Plane</div>;

    return (
        <Tab label={label}>
            <div class="flex flex-col items-start">
                <span class="mb-2">
                    <i class="fa-solid fa-plane-departure pr-2"/>
                   Plane tab
                </span>
                <button class="btn btn-sm btn-primary">Plane</button>
            </div>
        </Tab>
    );
};

const BuildingTab = () => {
    const label = <div><i class="fa-solid fa-building pr-2"/>Buildings</div>;

    return (
        <Tab label={label}>
            <div class="flex flex-col items-start">
                <span class="mb-2">
                    <i class="fa-solid fa-building pr-2"/>
                    Buildings tab
                </span>
                <button class="btn btn-sm btn-primary">Build</button>
            </div>
        </Tab>
    );
};
