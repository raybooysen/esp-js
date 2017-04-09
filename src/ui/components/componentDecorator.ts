import { Guard } from '../../core';

export function getComponentFactoryMetadata(target):ComponentFactoryMetadata {
    let constructorFunction = target.constructor;
    if (constructorFunction.__componentMetadata) {
        return constructorFunction.__componentMetadata;
    }
    throw new Error('No metadata found on component');
}

export function componentFactory(componentKey:string, shortName:string, showInAddComponentMenu:boolean = false) {
    Guard.isDefined(componentKey, 'componentKey must be defined');
    return (target) => {
        target.__componentMetadata = new ComponentFactoryMetadata(componentKey, shortName, showInAddComponentMenu);
    };
}
 
export class ComponentFactoryMetadata {
    _componentKey:string;
    _shortName:string;
    _showInAddComponentMenu:boolean;

    constructor(componentKey:string, shortName:string, showInAddComponentMenu:boolean = false) {
        Guard.isString(componentKey, 'componentKey must be defined and be a string');
        Guard.isString(shortName, 'shortName must be defined and be a string');
        this._componentKey = componentKey;
        this._shortName = shortName;
        this._showInAddComponentMenu = showInAddComponentMenu;
    }

    get componentKey():string {
        return this._componentKey;
    }

    get shortName():string {
        return this._shortName;
    }

    get showInAddComponentMenu():boolean{
        return this._showInAddComponentMenu;
    }
}
