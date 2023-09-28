import { type Application, type Text } from 'pixi.js'
// import { Grid } from './Grid'

import { type GameLoader } from './GameLoader'
// import { StatusBar } from './StatusBar'
// import { GridTile } from './GridTile'
// import { StatusBarTile } from './StatusBarTile'

const logFarmLayout = console.log

enum UIState {}

export class World {
  // public app: Application<HTMLCanvasElement>
  // public gameLoader: GameLoader
  // public text!: Text
  // public statusBar!: StatusBar
  // public grid!: Grid
  // public resizeTimeoutId!: NodeJS.Timeout
  // public resizeTimeout = 300

  // constructor ({ app, gameLoader }: { app: Application, gameLoader: GameLoader }) {
  //   this.app = app as Application<HTMLCanvasElement>
  //   this.gameLoader = gameLoader

  //   this.app.ticker.add(this.handleAppTick)
  // }

  // setup (): void {
  //   this.setupCanvas()
  //   this.setupLayout()
  //   this.resizeHandler()
  // }

  // setupCanvas (): void {
  //   document.body.appendChild(this.app.view)
  //   window.addEventListener('resize', this.resizeDeBounce)
  // }

  // setupLayout (): void {
  //   const { textures, animations } = this.gameLoader.spritesheet
  //   this.statusBar = new StatusBar({
  //     textures: {
  //       money: textures['icon-money.png'],
  //     },
  //     onTileClick: this.handleStatusBarClick
  //   })
  //   this.app.stage.addChild(this.statusBar)
  //   this.grid = new Grid({
  //     textures: {
  //       grass: textures['grass.png'],
  //       cornMask: textures['corn-mask.png'],
  //       chickenMask: textures['chicken-mask.png'],
  //       cowMask: textures['cow-mask.png'],
  //       cornAnimated: animations.corn,
  //       chickenAnimated: animations.chicken,
  //       cowAnimated: animations.cow
  //     },
  //     onTileClick: this.handleFramGridClick
  //   })
  //   this.grid.y = this.statusBar.y + this.statusBar.totalHeight
  //   this.app.stage.addChild(this.grid)
  // }

  // resizeDeBounce = (): void => {
  //   this.cancelScheduledResizeHandler()
  //   this.scheduleResizeHandler()
  // }

  // cancelScheduledResizeHandler (): void {
  //   clearTimeout(this.resizeTimeoutId)
  // }

  // scheduleResizeHandler (): void {
  //   this.resizeTimeoutId = setTimeout(() => {
  //     this.cancelScheduledResizeHandler()
  //     this.resizeHandler()
  //   }, this.resizeTimeout)
  // }

  // resizeHandler (): void {

  // }

  // handleAppTick = (): void => {
  //   this.grid.handleWorldTick(this.app.ticker.deltaMS)
  // }
}
