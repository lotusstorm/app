<template>
  <div class="root-container">
    <img class="img img-left" src="/swap_face_no_background_julia_3.png">
    <div class="view-container">
      <div class="balance">
        <span>{{ balance }}</span>
        <UiIcon icon="pj-icon" height="24px" />
      </div>
      <div ref="__PIXI_MEM_SLOT_ROOT_VIEW__" class="view" />
      <div class="controle-panel">
        <div class="left">
          <UiButton
            class="play-btn"
            is-round
            @click="handleStart"
          >
            <UiIcon icon="play" />
          </UiButton>
          <UiButton
            class="repeat-btn"
            is-round
            @click="handleRefresh"
          >
            <UiIcon icon="repeat" />
          </UiButton>
        </div>
        <div class="center">
          <span class="bid">
            {{ bid }}
          </span>
          <UiIcon icon="pj-icon" />
        </div>
        <div class="right">
          <UiButton
            v-for="item in bidsList"
            :key="item"
            :size="size.s"
            class="bid-btn"
            @click="handleBid(item)"
          >
            {{ item }}
          </UiButton>
        </div>
      </div>
    </div>
    <img class="img img-right" src="/leon_background_2.png">

    <div v-show="!!imgWebm" class="modal-container">
      <video autoplay playsinline loop class="video" :src="imgWebm" />
      <div class="modal-description">
        <!-- <span class="main">Аноним</span> -->
        <span class="description">{{ winBid }}</span>
      </div>
    </div>
    <span class="inspect">
      src: {{ imgWebm }}
      <br>
      duration: {{ duration }}
      <br>
      emptyRole: {{ emptyRole }}
      <br>
      balance: {{ balance }}
      <br>
      bid: {{ bid }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import UiIcon from '~/components/ui/icons/UiIcon.vue'
import { size } from '~/components/ui/constants/size'

const {
  Assets,
  Sprite,
  Application,
  Container,
  BlurFilter,
} = usePixi()

const __PIXI_MEM_SLOT_ROOT_VIEW__ = ref()

const height = 220
const width = 665

const balance = ref(999999)
const bid = ref(10)

const winBid = ref(0)

const bidsList = ref([10, 20, 50, 100, 1000])

const reels = ref([])
const reelContainer = new Container()

const app = new Application({
  width,
  height,
})

const REEL_WIDTH = Math.floor(app.screen.width / 3)
const SYMBOL_SIZE = height

const running = ref(false)
const imgWebm = ref('')
const duration = ref(0)

const emptyRole = ref(0)

const MAX_EMPTY_ROLE = 10

class A extends Sprite {
  uuid: string

  constructor (uuid: any, params: any) {
    super(params)

    this.uuid = uuid
  }
}

const dict = {
  '/app/tyrant.png': '1', // done
  '/app/chonguk.jpg': '2', // need
  '/app/julia_black.jpg': '3', // need
  '/app/leon.png': '4', // done
  '/app/naruto.png': '5', // done
  '/app/pain.jpg': '6', // done
  '/app/seven.png': '7', // done
  '/app/one_pice_black.png': '8', // need
  '/app/one_pice_netflix_zoro.jpg': '9', // done
  '/app/B.jpg': 'b', // done
  '/app/T.png': 't', // done
  '/app/S.jpg': 's' // done
}

const video = {
  111: {
    video: '/app/video/papich_ninada_diadia.webm',
    duration: 8000,
    winBid: 100,
  }, // papich
  222: {
    video: '/app/video/chonguk_press_2.webm',
    duration: 5000,
    winBid: 100,
  }, // chonguk
  333: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // juli
  444: {
    video: '/app/video/leon_krinj.webm',
    duration: 8000,
    winBid: 100,
  }, // leon
  555: {
    video: '/app/video/naruto_blue_bird.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto
  666: {
    video: '/app/video/pain_kek.webm',
    duration: 8000,
    winBid: 100,
  }, // pain
  777: {
    video: '/app/video/papich_eto_mne.webm',
    duration: 8000,
    winBid: 100,
  }, // papich
  888: {
    video: '/app/video/one_pice.webm',
    duration: 8000,
    winBid: 100,
  }, // one
  999: {
    video: '/app/video/one_pice_netflix_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro
  1000: {
    video: '/app/video/sanboy_tyajalo.webm',
    duration: 8000,
    winBid: 100,
  }, // sanboy
  bts: {
    video: '/app/video/bts.webm',
    duration: 5000,
    winBid: 100,
  },
  // ======================================
  344: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  443: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  433: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  334: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  343: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  434: {
    video: '/app/video/julia_leon_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + leon
  311: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  113: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  133: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  331: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  313: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  131: {
    video: '/app/video/julia_tyrant_reaction.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + tyrant
  233: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 4000,
    winBid: 100,
  }, // chonguk + juli ??
  332: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 4000,
    winBid: 100,
  }, // chonguk + juli ??
  223: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 4000,
    winBid: 100,
  }, // chonguk + juli ??
  322: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 4000,
    winBid: 100,
  }, // chonguk + juli ??
  323: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 4000,
    winBid: 100,
  }, // chonguk + juli ??
  232: {
    video: '/app/video/chonguk_press_1.webm',
    duration: 8000,
    winBid: 100,
  }, // chonguk + juli ??
  339: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  993: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  399: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  933: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  393: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  939: {
    video: '',
    duration: 8000,
    winBid: 100,
  }, // zoro + juli
  556: {
    video: '/app/video/pain_naruto_2.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  665: {
    video: '/app/video/pain_naruto_1.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  566: {
    video: '/app/video/pain_naruto_2.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  655: {
    video: '/app/video/pain_naruto_1.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  565: {
    video: '/app/video/pain_naruto_1.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  656: {
    video: '/app/video/pain_naruto_1.webm',
    duration: 8000,
    winBid: 100,
  }, // naruto + pain
  441: {
    video: '/app/video/leon_vs_tyrant.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  144: {
    video: '/app/video/leon_vs_tyrant_3.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  411: {
    video: '/app/video/leon_vs_tyrant.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  114: {
    video: '/app/video/leon_vs_tyrant_3.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  141: {
    video: '/app/video/leon_vs_tyrant_3.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  414: {
    video: '/app/video/leon_vs_tyrant_3.webm',
    duration: 8000,
    winBid: 100,
  }, // leon + tyrant
  998: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  889: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  988: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  899: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  898: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  989: {
    video: '/app/video/one_pice_zoro.webm',
    duration: 8000,
    winBid: 100,
  }, // zoro + one_pice
  229: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  992: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  299: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  922: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  292: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  929: {
    video: '/app/video/gachi_gym_boss.webm',
    duration: 5000,
    winBid: 100,
  }, // zoro + chonguk
  833: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
  338: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
  883: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
  388: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
  383: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
  838: {
    video: '/app/video/twitch_ban.webm',
    duration: 8000,
    winBid: 100,
  }, // juli + one_pice => ban
}

const assets = [
  '/app/tyrant.png',
  '/app/chonguk.jpg',
  '/app/julia_black.jpg',
  '/app/leon.png',
  '/app/seven.png',
  '/app/pain.jpg',
  '/app/naruto.png',
  '/app/one_pice_black.png',
  '/app/one_pice_netflix_zoro.jpg',
  // '/B.jpg',
  // '/T.png',
  // '/S.jpg',
]

Assets.load(assets).then(onAssetsLoaded)

const handleStart = () => {
  startPlay()
}

const handleRefresh = () => {
  console.log('handleRefresh')
}

const handleBid = (newBid: number) => {
  bid.value = newBid
}

function startPlay() {
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
      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j]
        const prevy = s.y

        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE

        if (s.y < 0 && prevy > SYMBOL_SIZE) {
          // Detect going over and swap a texture.
          // This should in proper product be determined from some logical reel.
          const [uuid, texture] = slotTextures[Math.floor(Math.random() * slotTextures.length)]

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

watch(imgWebm, () => {
  const t = setTimeout(() => {
    imgWebm.value = ''
    duration.value = 0

    clearTimeout(t)
  }, unref(duration))
})

onMounted(test)
</script>

<style scoped lsng="scss">
.inspect {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
  z-index: 100;
}

.modal-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);

  .video {
    display: flex;
    margin-top: 3%;
    width: 500px;
    background-color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .modal-description {
    .main {}
    .description {}
  }
}

.root-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: url("/main_background_4.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

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

    .balance {
      content: "";
      position: absolute;
      color: #FFA12B;
      padding: 10px;
      border-radius: 0 5px 0 0;
      font-size: 36px;
      text-align: center;
      background-color: rgb(0, 0, 0);
      top: -62px;
      right: 4%;
      display: flex;
      align-items: center;
    }

    &::before {
      content: "";
      width: 344px;
      height: 344px;
      border-radius: 50% 50% 0 0;
      background-color: rgba(0, 0, 0, 0.7);
      position: absolute;
      top: -165px;
    }

    &::after {
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
      margin-bottom: 10px;

      &::before {
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
    }

    .controle-panel {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 0;

      .left {
        .play-btn {}

        .repeat-btn {
          margin-left: 10px;
        }
      }

      .center {
        color: #FFA12B;
        padding: 10px;
        border: 2px solid #FFA12B;
        width: 100px;
        border-radius: 5px;

        .bid {
          font-size: 24px;
          text-align: center;
        }
      }

      .right {
        .bid-btn {
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
  }

  .img {
    height: 100%;

    &.img-left {
      position: relative;
      left: 135px;
    }

    &.img-right {
      position: relative;
      right: 135px;
    }
  }
}
</style>
