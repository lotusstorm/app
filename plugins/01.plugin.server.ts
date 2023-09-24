import { pixiPlugin } from '~/plugins/pixi/pixiPlugin'
import { iconsPlugin } from '~/plugins/icons/iconsPlugin'

export default defineNuxtPlugin((config) => {
  // console.log(config, 'configconfigconfig');

  pixiPlugin(config)
  iconsPlugin(config)
})
