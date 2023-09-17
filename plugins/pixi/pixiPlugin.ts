import * as PIXI from 'pixi.js'
import type { Pixi } from '~/types/pixi'

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

export const pixiPlugin = (app: any) => {
  app.provide('pixi', PIXI)
}
