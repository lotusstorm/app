<template>
  <div class="root-container">
    <img class="img img-left" src="/swap_face_no_background_julia_3.png">
    <div class="view-container">
      <div ref="__PIXI_MEM_SLOT_ROOT_VIEW__" class="view" />
      <div class="controle-panel">
        <UiButton
          class="play-btn"
          is-round
          @click="handleStart"
        >
          <UiIcon icon="play" />
        </UiButton>
        <UiButton
          class="play-btn"
          is-round
          @click="handleRefresh"
        >
          <UiIcon icon="repeat" />
        </UiButton>
      </div>
    </div>
    <img class="img img-right" src="/leon_background_2.png">

    <div v-show="!!imgWebm" class="modal-container">
      <video autoplay playsinline loop class="video" :src="imgWebm" />
      <div class="modal-description">
        <span>Аноним</span>
        <span>+100</span>
      </div>
    </div>
    <span class="inspect">
      src: {{ imgWebm }}
      <br>
      duration: {{ duration }}
      <br>
      emptyRole: {{ emptyRole }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import UiIcon from '~/components/ui/icons/UiIcon.vue'

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

const width = computed(() => window.innerWidth / 2)
const height = computed(() => window.innerHeight / 2)

const reels = ref([])
const reelContainer = new Container()

const a = 665
const b = 220

const app = new Application({
  width: a,
  height: b,
  // resizeTo: window,
})

// console.log(app.screen);

const REEL_WIDTH = Math.floor(app.screen.width / 3)
const SYMBOL_SIZE = b

class A extends Sprite {
  uuid: string

  constructor (uuid: any, params: any) {
    super(params)

    this.uuid = uuid
  }
}

const running = ref(false)
const imgWebm = ref('')
const duration = ref(0)

const emptyRole = ref(0)

const MAX_EMPTY_ROLE = 10

watch(imgWebm, () => {
  const t = setTimeout(() => {
    imgWebm.value = ''
    duration.value = 0

    clearTimeout(t)
  }, unref(duration))
})

const dict = {
  '/tyrant.png': '1', // done
  '/chonguk.jpg': '2', // need
  '/julia_black.jpg': '3', // need
  '/leon.png': '4', // done
  '/naruto.png': '5', // done
  '/pain.jpg': '6', // done
  '/seven.png': '7', // done
  '/one_pice_black.png': '8', // need
  '/one_pice_netflix_zoro.jpg': '9', // done
  '/B.jpg': 'b', // done
  '/T.png': 't', // done
  '/S.jpg': 's' // done
}

const video = {
  111: {
    video: '/video/papich_ninada_diadia.webm',
    duration: 8000,
  }, // papich
  222: {
    video: '/video/chonguk_press_2.webm',
    duration: 5000,
  }, // chonguk
  333: {
    video: '',
    duration: 8000,
  }, // juli
  444: {
    video: '/video/leon_krinj.webm',
    duration: 8000,
  }, // leon
  555: {
    video: '/video/naruto_blue_bird.webm',
    duration: 8000,
  }, // naruto
  666: {
    video: '/video/pain_kek.webm',
    duration: 8000,
  }, // pain
  777: {
    video: '/video/papich_eto_mne.webm',
    duration: 8000,
  }, // papich
  888: {
    video: '/video/one_pice.webm',
    duration: 8000,
  }, // one
  999: {
    video: '/video/one_pice_netflix_zoro.webm',
    duration: 8000,
  }, // zoro
  1000: {
    video: '/video/sanboy_tyajalo.webm',
    duration: 8000,
  }, // sanboy
  bts: {
    video: '/video/bts.webm',
    duration: 5000,
  },
  // ======================================
  344: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  443: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  433: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  334: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  343: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  434: {
    video: '/video/julia_leon_reaction.webm',
    duration: 8000,
  }, // juli + leon
  311: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  113: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  133: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  331: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  313: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  131: {
    video: '/video/julia_tyrant_reaction.webm',
    duration: 8000,
  }, // juli + tyrant
  233: {
    video: '/video/chonguk_press_1.webm',
    duration: 4000,
  }, // chonguk + juli ??
  332: {
    video: '/video/chonguk_press_1.webm',
    duration: 4000,
  }, // chonguk + juli ??
  223: {
    video: '/video/chonguk_press_1.webm',
    duration: 4000,
  }, // chonguk + juli ??
  322: {
    video: '/video/chonguk_press_1.webm',
    duration: 4000,
  }, // chonguk + juli ??
  323: {
    video: '/video/chonguk_press_1.webm',
    duration: 4000,
  }, // chonguk + juli ??
  232: {
    video: '/video/chonguk_press_1.webm',
    duration: 8000,
  }, // chonguk + juli ??
  339: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  993: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  399: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  933: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  393: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  939: {
    video: '',
    duration: 8000,
  }, // zoro + juli
  556: {
    video: '/video/pain_naruto_2.webm',
    duration: 8000,
  }, // naruto + pain
  665: {
    video: '/video/pain_naruto_1.webm',
    duration: 8000,
  }, // naruto + pain
  566: {
    video: '/video/pain_naruto_2.webm',
    duration: 8000,
  }, // naruto + pain
  655: {
    video: '/video/pain_naruto_1.webm',
    duration: 8000,
  }, // naruto + pain
  565: {
    video: '/video/pain_naruto_1.webm',
    duration: 8000,
  }, // naruto + pain
  656: {
    video: '/video/pain_naruto_1.webm',
    duration: 8000,
  }, // naruto + pain
  441: {
    video: '/video/leon_vs_tyrant.webm',
    duration: 8000,
  }, // leon + tyrant
  144: {
    video: '/video/leon_vs_tyrant_3.webm',
    duration: 8000,
  }, // leon + tyrant
  411: {
    video: '/video/leon_vs_tyrant.webm',
    duration: 8000,
  }, // leon + tyrant
  114: {
    video: '/video/leon_vs_tyrant_3.webm',
    duration: 8000,
  }, // leon + tyrant
  141: {
    video: '/video/leon_vs_tyrant_3.webm',
    duration: 8000,
  }, // leon + tyrant
  414: {
    video: '/video/leon_vs_tyrant_3.webm',
    duration: 8000,
  }, // leon + tyrant
  998: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  889: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  988: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  899: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  898: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  989: {
    video: '/video/one_pice_zoro.webm',
    duration: 8000,
  }, // zoro + one_pice
  229: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  992: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  299: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  922: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  292: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  929: {
    video: '/video/gachi_gym_boss.webm',
    duration: 5000,
  }, // zoro + chonguk
  833: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
  338: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
  883: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
  388: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
  383: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
  838: {
    video: '/video/twitch_ban.webm',
    duration: 8000,
  }, // juli + one_pice => ban
}

Assets.load([
  '/tyrant.png',
  '/chonguk.jpg',
  '/julia_black.jpg',
  '/leon.png',
  '/seven.png',
  '/pain.jpg',
  '/naruto.png',
  '/one_pice_black.png',
  '/one_pice_netflix_zoro.jpg',
  // '/B.jpg',
  // '/T.png',
  // '/S.jpg',
]).then(onAssetsLoaded)

const handleStart = () => {
  startPlay()
}

const handleRefresh = () => {
  console.log('handleRefresh')
}
// let running = false

// Function to start playing.
function startPlay() {
  // debugger
  console.log(reels.value, 'startPlay')

  if (running.value) { return }
  running.value = true

  const extra = Math.floor(Math.random() * 3)

  for (let i = 0; i < reels.value.length; i++) {
    const r = reels.value[i]
    const target = r.position + 10 + i * 5 + extra
    const time = 2500 + i * 600 + extra * 600

    console.log(i, 'reels.value[i]')
    console.log(extra, 'extra')
    console.log(target, 'target')
    console.log(time, 'time')

    tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.value.length - 1 ? reelsComplete : null)
  }
}

// Reels done handler.
function reelsComplete() {
  console.log(reels.value, 'reels.value')

  let res = ''

  for (let i = 0; i < reels.value.length; i++) {
    const r = reels.value[i]

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

  let webm = ''
  let dur = 0

  if (res in video) {
    webm = video[res].video
    dur = video[res].duration
    emptyRole.value = 0
  } else if (emptyRole.value === MAX_EMPTY_ROLE) {
    webm = video[1000].video
    dur = video[1000].duration
    emptyRole.value = 0
  }

  imgWebm.value = webm
  duration.value = dur
  emptyRole.value += 1

  running.value = false
}
// onAssetsLoaded handler builds the example.
function onAssetsLoaded(data) {
  console.log(data, 'data')

  // Create different slot symbols.
  const slotTextures = Object.entries(data)
  console.log(slotTextures, 'slotTextures')

  // Build the reels
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
    reels.value.push(reel)
  }

  app.stage.addChild(reelContainer)

  // Build top & bottom covers and position reelContainer
  // const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2

  // reelContainer.y = 155
  // reelContainer.x = 5
  // reelContainer.
  // const top = new Graphics()

  // top.beginFill(0, 1)
  // top.drawRect(0, 0, app.screen.width, margin)

  // Listen for animate update.
  app.ticker.add((delta) => {
    // Update the slots.
    for (let i = 0; i < reels.value.length; i++) {
      const r = reels.value[i]
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
function lerp(a1, a2, t) {
  return a1 * (1 - t) + a2 * t
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
function backout(amount) {
  return t => (--t * t * ((amount + 1) * t + amount) + 1)
}

const test = () => {
  globalThis.__PIXI_APP__ = app
  __PIXI_MEM_SLOT_ROOT_VIEW__.value.appendChild(app.view)
}

onMounted(test)
</script>

<style>
body {
  margin: 0px;
  /* background-image: url("/main_background_4.jpg"); */
  background-image: url("/main_background_4.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.inspect {
  position: absolute;
  right: 0;
  top: 0;
  /* width: 100px;
  height: 70px; */
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
  z-index: 100;
}

.modal-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  /* justify-content: center; */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);
}

.video {
  display: flex;
  /* position: relative; */
  /* top: 50px; */
  margin-top: 3%;
  width: 500px;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.root-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.view-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  margin-top: 180px;
  margin-bottom: auto;
  z-index: 99;
}

.view-container::before {
  content: "";
  width: 344px;
  height: 344px;
  border-radius: 50% 50% 0 0;
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: -165px;
}

.view-container::after {
  content: "";
  width: 344px;
  height: 344px;
  position: absolute;
  top: -250px;
  background-image: url('/logo_pj.png');
  background-position: center;
  background-repeat: no-repeat;
}

.view {
  z-index: 100;
}

.view::before {
  content: "";
  position: absolute;
  border: 5px solid rgb(237, 1, 171);
  width: 665px;
  height: 220px;
  top: 10px;
  left: 10px;
  bottom: 0;
  right: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 5px rgba(237, 1, 171, 0.7);
}

.controle-panel {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.root-container .play-btn {
  /* position: absolute;
  bottom: 15px;
  left: 10px; */
}

.img {
  height: 100%;
}

.img.img-left {
  position: relative;
  left: 135px;
}

.img.img-right {
  position: relative;
  right: 135px;
}

</style>
