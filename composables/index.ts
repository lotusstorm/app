import type {Pixi} from '~/plugins/pixi/pixiPlugin';
import {getElementFromContext} from './helpers';
import type {IApplicationOptions, Application} from 'pixi.js';

export const usePixi = (options?: Partial<IApplicationOptions>): Application => {
    const pixi = (getElementFromContext('$pixi')  || (() => {})) as Pixi;

    return pixi?.(options);
}
