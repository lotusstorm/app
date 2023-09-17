import type { IApplicationOptions, Application } from 'pixi.js'
import { getElementFromContext } from './helpers'
import type { Pixi } from '~/plugins/pixi/pixiPlugin'

export const usePixi = (options?: Partial<IApplicationOptions>): Application => {
  const pixi = (getElementFromContext('$pixi') || (() => {})) as Pixi

  return pixi?.(options)
}
