import * as PIXI from 'pixi.js';
import type {IApplicationOptions, Application} from 'pixi.js';


// console.log(PIXI, 'PIXI');

export type Pixi = (options?: Partial<IApplicationOptions>) => Application;

declare module '#app' {
    interface NuxtApp {
        $pixi: Pixi
    }
}

declare module 'vue' {
    interface ComponentCustomProperties {
        $pixi: Pixi
    }
}

export const pixiPluginClient = (app: any) => {
    const pixiApp = (options?: Partial<IApplicationOptions>): Application => new PIXI.Application(options);

    app.provide('pixi', pixiApp);
};

export const pixiPluginServer = (app: any) => {
    app.provide('pixi', (): any => {});
};
