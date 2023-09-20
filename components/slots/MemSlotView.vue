<template>
  <div class="container">
    <div ref="__PIXI_MEM_SLOT_ROOT_VIEW__" />
    <div class="container">
      {{ imgWebp }}
      <video autoplay playsinline class="video" :src="imgWebp" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import type { Pixi } from '~/types/pixi'

// type IResource= Pixi['Resource']
// type ITexture= Pixi['Texture']

const {
  Assets,
  Sprite,
  Application,
  Texture,
  Container,
  BlurFilter,
  Graphics,
  TextStyle,
  Text
} = usePixi()

const __PIXI_MEM_SLOT_ROOT_VIEW__ = ref()

const app = new Application({ width: 840, height: 800 })

class A extends Sprite {
  uuid: string

  constructor (uuid: any, params: any) {
    super(params)

    this.uuid = uuid
  }
}

const running = ref(false)
const imgWebp = ref('/video/one_pice_netflix_zoro.webm')

const dict = {
  '/tyrant.png': '1', // done
  '/chonguk.jpg': '2', // need
  '/julia_black.jpg': '3', // need
  '/leon.png': '4', // done
  '/naruto.png': '5', // done
  '/pain.jpg': '6', // done
  '/seven.jpg': '7', // done
  '/one_pice_black.png': '8', // need
  '/one_pice_netflix_zoro.jpg': '9' // done
}

const video = {
  344: '/video/ulia_leon_reaction.webm',
  311: '/video/julia_tyrant_reaction.webm',
  555: '/video/naruto_blue_bird.webm',
  777: '/video/papich_eto_mne.webm',
  111: '/video/papich_ninada_diadia.webm',
  // 6: '/video/sanboy_tyajalo.webm',
  999: '/video/one_pice_netflix_zoro.webm',
  666: '/video/pain_kek.webm'
}

Assets.load([
  '/tyrant.png',
  '/chonguk.jpg',
  '/julia_black.jpg',
  '/leon.png',
  '/seven.jpg',
  '/pain.jpg',
  '/naruto.png',
  '/one_pice_black.png',
  '/one_pice_netflix_zoro.jpg'
]).then(onAssetsLoaded)

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150

// onAssetsLoaded handler builds the example.
function onAssetsLoaded (data) {
  console.log(data, 'data')

  // Create different slot symbols.
  const slotTextures = Object.entries(data)
  console.log(slotTextures, 'slotTextures')

  // Build the reels
  const reels = []
  const reelContainer = new Container()
  // const resalt = new Container()

  // debugger

  for (let i = 0; i < 3; i++) {
    const rc = new Container()

    rc.x = i * REEL_WIDTH
    reelContainer.addChild(rc)

    const reel = {
      container: rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new BlurFilter()
    }

    reel.blur.blurX = 0
    reel.blur.blurY = 0
    rc.filters = [reel.blur]

    // Build the symbols
    for (let j = 0; j < 3; j++) {
      const symbol = new A(...slotTextures[Math.floor(Math.random() * slotTextures.length)])
      // Scale the symbol to fit symbol area.

      symbol.y = j * SYMBOL_SIZE
      symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height)
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2)
      reel.symbols.push(symbol)
      rc.addChild(symbol)
    }
    reels.push(reel)
  }
  app.stage.addChild(reelContainer)

  // Build top & bottom covers and position reelContainer
  const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2

  reelContainer.y = margin
  reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5)
  // const top = new Graphics()

  // top.beginFill(0, 1)
  // top.drawRect(0, 0, app.screen.width, margin)
  const bottom = new Graphics()

  bottom.beginFill(0, 1)
  bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin)

  // Add play text
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440
  })

  const playText = new Text('Spin the wheels!', style)

  playText.x = Math.round((bottom.width - playText.width) / 2)
  playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2)
  bottom.addChild(playText)

  // Add header text
  // const headerText = new Text('PIXI MONSTER SLOTS!', style)

  // headerText.x = Math.round((top.width - headerText.width) / 2)
  // headerText.y = Math.round((margin - headerText.height) / 2)
  // top.addChild(headerText)

  // app.stage.addChild(top)
  app.stage.addChild(bottom)

  // Set the interactivity.
  bottom.eventMode = 'static'
  bottom.cursor = 'pointer'
  bottom.addListener('pointerdown', () => {
    startPlay()
  })

  // let running = false

  // Function to start playing.
  function startPlay () {
    // debugger
    console.log(reels, 'startPlay')

    if (running.value) { return }
    running.value = true

    for (let i = 0; i < reels.length; i++) {
      const r = reels[i]
      const extra = Math.floor(Math.random() * 3)
      const target = r.position + 10 + i * 5 + extra
      const time = 2500 + i * 600 + extra * 600

      tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null)
    }
  }

  // Reels done handler.
  function reelsComplete () {
    console.log(reels, 'reels')

    let res = ''

    for (let i = 0; i < reels.length; i++) {
      const r = reels[i]

      for (let j = 0; j < r.symbols.length; j++) {
        const symbol = r.symbols[j]

        if (Math.floor(symbol.y) === 0) {
          console.log('reelsComplete', symbol)
          // resalt.addChild(symbol)
          res += dict[symbol.uuid]
        }
      }
    }

    // debugger

    console.log(res, 'res')

    // debugger
    imgWebp.value = video[res] || video[666]
    running.value = false
  }

  // Listen for animate update.
  app.ticker.add((delta) => {
    // Update the slots.
    for (let i = 0; i < reels.length; i++) {
      const r = reels[i]
      // Update blur filter y amount based on speed.
      // This would be better if calculated with time in mind also. Now blur depends on frame rate.

      r.blur.blurY = (r.position - r.previousPosition) * 8
      r.previousPosition = r.position

      // Update symbol positions on reel.
      // debugger
      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j]
        const prevy = s.y

        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE
        if (s.y < 0 && prevy > SYMBOL_SIZE) {
          // Detect going over and swap a texture.
          // This should in proper product be determined from some logical reel.
          const [uuid, texture] = slotTextures[Math.floor(Math.random() * slotTextures.length)]
          // const [uuid, texture] = slotTextures[3]
          s.uuid = uuid
          s.texture = texture
          s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height)
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2)
        }
      }
    }
  })
}

const tweening = []

function tweenTo (object, property, target, time, easing, onchange, oncomplete) {
  const tween = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now()
  }

  tweening.push(tween)

  return tween
}
// Listen for animate update.
app.ticker.add((delta) => {
  const now = Date.now()
  const remove = []

  for (let i = 0; i < tweening.length; i++) {
    const t = tweening[i]
    const phase = Math.min(1, (now - t.start) / t.time)

    t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase))
    if (t.change) { t.change(t) }
    if (phase === 1) {
      t.object[t.property] = t.target
      remove.push(t)
      if (t.complete) { t.complete(t) }
    }
  }
  for (let i = 0; i < remove.length; i++) {
    tweening.splice(tweening.indexOf(remove[i]), 1)
  }
})

// Basic lerp funtion.
function lerp (a1, a2, t) {
  return a1 * (1 - t) + a2 * t
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout (amount) {
  return t => (--t * t * ((amount + 1) * t + amount) + 1)
}

const test = () => {
  globalThis.__PIXI_APP__ = app
  __PIXI_MEM_SLOT_ROOT_VIEW__.value.appendChild(app.view)
}

// watch(running, () => {
//   console.log('');
// })

onMounted(test)
</script>

<style>
.container {
  display: flex;
  flex-direction: row wrap;
}

.video {
  width: 500px;
  height: 500px;
}
</style>
