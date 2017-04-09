import { Container, Resolver } from 'microdi-js';
import { Router, DisposableBase } from 'esp-js';
import * as React from 'react';

export declare function getComponentFactoryMetadata(target: any): ComponentFactoryMetadata;
export declare function componentFactory(componentKey: string, shortName: string, showInAddComponentMenu?: boolean): (target: any) => void;
export declare class ComponentFactoryMetadata {
    constructor(componentKey: string, shortName: string, showInAddComponentMenu?: boolean);
    readonly componentKey: string;
    readonly shortName: string;
    readonly showInAddComponentMenu: boolean;
}
export declare abstract class ComponentFactoryBase extends DisposableBase {
    constructor(container: Container);
    readonly componentKey: string;
    readonly shortName: string;
    readonly showInAddComponentMenu: boolean;
    protected abstract _createComponent(childContainer: Container, state?: any): any;
    createComponent(state?: any): void;
    getAllComponentsState(): {
        componentFactoryKey: string;
        componentsState: any[];
    };
    shutdownAllComponents(): void;
}
export interface ComponentMetadata {
    componentFactoryKey: string;
    shortName: string;
    isWorkspaceItem: boolean;
}
export class ComponentRegistryModel extends ModelBase {
    componentsMetadata: Array<ComponentMetadata>;
    constructor(modelId: string, router: Router);
    getTitle(): string;
    readonly componentFactories: Iterable<FactoryEntry>;
    postProcess(): void;
    registerComponentFactory(componentFactory: ComponentFactoryBase): void;
    unregisterComponentFactory(componentFactory: ComponentFactoryBase): void;
    getComponentFactory(componentFactoryKey: string): ComponentFactoryBase;
}

export interface FactoryEntry {
    componentFactoryKey: string;
    factory: ComponentFactoryBase;
    shortName: string;
    isWorkspaceItem: boolean;
}
export class LiteralResolver implements Resolver {
    static readonly name: string;
    resolve<T>(container: Container, dependencyKey: {
        value: any;
    }): any;
}
export class MultiTileRegionEventConst {
    static readonly selectedTileChanged: string;
}
export interface SelectedTileChangedEvent {
    selectedItem: RegionItem;
}

export declare abstract class RegionModelBase extends ModelBase {
    constructor(regionName: string, router: Router, regionManager: any);
    observeEvents(): void;
    getTitle(): string;
    abstract _addToRegion(title: string, modelId: string, view: any, displayContext?: string): any;
    abstract _removeFromRegion(modelId: string, view: any, displayContext?: string): any;
}

export class MultiTileRegionModel extends RegionModelBase {
    tileItems: Array<RegionItem>;
    selectedItem: RegionItem;
    constructor(regionName: string, router: Router, regionManager: RegionManager);
    _observeSelectedTileChanged(ev: SelectedTileChangedEvent): void;
    _addToRegion(title: string, modelId: string, displayContext?: string): void;
    _removeFromRegion(modelId: string, displayContext?: string): void;
}

export interface IMultiTileRegionViewProps extends IViewBaseProps<MultiTileRegionModel> {
    className?: string;
}
export class MultiTileRegionView extends ViewBase<MultiTileRegionView, MultiTileRegionModel, IMultiTileRegionViewProps> {
    render(): JSX.Element;
}

export interface ISelectableMultiTileViewProps extends IViewBaseProps<MultiTileRegionModel> {
    className?: string;
}
export class SelectableMultiTileView extends ViewBase<SelectableMultiTileView, MultiTileRegionModel, ISelectableMultiTileViewProps> {
    render(): JSX.Element;
}
export interface ITileItemViewProps {
    className?: string;
    style?: any;
}
export class TileItemView extends React.Component<ITileItemViewProps, any> {
    render(): JSX.Element;
}

export class SingleItemRegionsModel extends RegionModelBase {
    item: RegionItem;
    constructor(regionName: string, router: any, regionManager: any);
    _addToRegion(title: string, modelId: string, displayContext?: string): void;
    _removeFromRegion(modelId: string, displayContext?: string): void;
}

export interface ISingleItemRegionViewProps extends IViewBaseProps<SingleItemRegionsModel> {
    className?: string;
}
export class SingleItemRegionView extends ViewBase<SingleItemRegionView, SingleItemRegionsModel, ISingleItemRegionViewProps> {
    render(): JSX.Element;
}

export class RegionItem {
    title: string;
    modelId: string;
    displayContext: string;
    constructor(title: string, modelId: string, displayContext?: string);
    readonly itemKey: string;
    equals(modelId: string, displayContext?: string): boolean;
}

export class RegionManager {
    constructor();
    registerRegion(regionName: string, onAddingViewToRegionCallback: any, onRemovingFromRegionCallback: any): void;
    unregisterRegion(regionName: string): void;
    addToRegion(regionName: string, model: ModelBase, displayContext?: string): void;
    removeFromRegion(regionName: string, model: ModelBase, displayContext?: string): void;
}

export class StateService {
    saveApplicationState<T>(moduleKey: string, layoutMode: LayoutMode, state: T): void;
    getApplicationState<T>(moduleKey: string, layoutMode: LayoutMode): T;
}
export class LayoutMode {
    static _desktop: LayoutMode;
    static _tabletDetached: LayoutMode;
    static _tabledAttached: LayoutMode;
    static readonly desktop: LayoutMode;
    static readonly tabletDetached: LayoutMode;
    static readonly tabletAttached: LayoutMode;
    static readonly values: Array<LayoutMode>;
    constructor(status: string);
    readonly name: string;
}
export declare abstract class ModelBase extends DisposableBase {
    protected _modelId: string;
    protected _router: Router;
    constructor(modelId: string, router: Router);
    abstract getTitle(): string;
    observeEvents(): void;
    getState(): any;
    /**
     * Runs the given action on the dispatch loop for this model, ensures that any model observer will be notified of the change
     * @param action
     */
    ensureOnDispatchLoop(action: () => void): void;
    readonly modelId: string;
    readonly router: Router;
}

export interface IViewBaseProps<TModel> {
    model: TModel;
    router: Router;
}
export abstract class ViewBase<TComponent, TModel, TProps extends IViewBaseProps<TModel>> extends React.Component<TProps, any> {
}
