import { Container, Graphics } from 'pixi.js'

const logFarmTile = console.log

export interface ITileOptions {
  id: string
  x: number
  y: number
  width: number
  height: number
  isInteractive?: boolean
  isButtonMode?: boolean
  showSelected?: boolean
  showHover?: boolean
  onClick?: <T extends Tile>(tile: T) => void
}

export class Tile extends Container {}
