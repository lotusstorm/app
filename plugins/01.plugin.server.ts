import { pixiPluginServer } from '~/plugins/pixi/pixiPlugin'

export default defineNuxtPlugin((config) => {
  // console.log(config, 'configconfigconfig');

  pixiPluginServer(config)
})
