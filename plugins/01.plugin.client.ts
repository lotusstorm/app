import { pixiPlugin } from '~/plugins/pixi/pixiPlugin'

export default defineNuxtPlugin((config) => {
  // console.log(config, 'configconfigconfig');

  pixiPlugin(config)
})
