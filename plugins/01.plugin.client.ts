import {pixiPluginClient} from '~/plugins/pixi/pixiPlugin'

export default defineNuxtPlugin((config) => {
    // console.log(config, 'configconfigconfig');

    pixiPluginClient(config);
});