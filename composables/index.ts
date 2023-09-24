import { getElementFromContext } from './helpers'
import type { Pixi } from '~/types/pixi'

export const usePixi = (): Pixi => getElementFromContext('$pixi')
export const useIcons = (iconName: any): any => getElementFromContext('$icons')[iconName]
