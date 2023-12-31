import { dict, video, luckySpinVariants } from '~/components/slots/helpers/constants'
import { lerp, backout, RequestAnimFrameTimer, Flag, LuckySpins, converter } from '~/components/slots/helpers/utils'

export const useHelpers = (app: any) => {
  const {
    Sprite,
    Container,
    BlurFilter,
  } = usePixi()

  class UUIDSprite extends Sprite {
    uuid: string

    constructor (uuid: any, params: any) {
      super(params)

      this.uuid = uuid
    }
  }

  const REEL_WIDTH = Math.floor(app.screen.width / 3)
  const SYMBOL_SIZE = app.screen.height
  const MAX_EMPTY_ROLE = 10

  const reelContainer = new Container()

  const balance = ref(31415)
  const bid = ref(10)
  const multiplayer = ref(1)

  const winBid = ref(0)

  const bidsList = ref([
    {
      value: 10,
      multiplayer: 1,
    },
    {
      value: 50,
      multiplayer: 1.5,
    },
    {
      value: 100,
      multiplayer: 1.8,
    },
    {
      value: 500,
      multiplayer: 2,
    },
    {
      value: 1000,
      multiplayer: 2.5,
    },
  ])

  const reels = ref([])

  const running = ref(false)
  const imgWebm = ref('')

  const emptyRole = ref(0)

  const isLucky = ref(false)
  const luckySpins = ref(9)
  const luckySpinsCooldown = ref(0)

  const tweening = ref([])

  const timer = new RequestAnimFrameTimer()
  const spin = new LuckySpins(luckySpinVariants)

  const ids = converter(dict)

  function startPlay() {
    if (running.value || balance.value - bid.value < 0) { return }

    running.value = true
    balance.value -= bid.value

    if (isLucky.value) {
      spin.step()

      if (luckySpins.value > 0) {
        luckySpins.value -= 1
      }
    }

    const EXTRA = Math.floor(Math.random() * 3)

    for (let i = 0; i < reels.value.length; i++) {
      const r = reels.value[i]
      const target = r.position + 10 + i * 5 + EXTRA
      const time = 2500 + i * 600 + EXTRA * 600

      // console.log(i, 'reels.value[i]')
      // console.log(EXTRA, 'EXTRA')
      // console.log(target, 'target')
      // console.log(time, 'time')

      tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.value.length - 1 ? reelsComplete : null)
    }
  }

  const onEnd = () => {

  }

  // Reels done handler.
  function reelsComplete() {
    let res = ''

    for (let i = 0; i < reels.value.length; i++) {
      const r = reels.value[i]

      for (let j = 0; j < r.symbols.length; j++) {
        const symbol = r.symbols[j]

        if (Math.floor(symbol.y) === 0) {
          // console.log('reelsComplete', symbol)
          res += ids[symbol.uuid]
        }
      }
    }

    let webm = ''

    if (res in video) {
      webm = video[res].video

      if (Array.isArray(webm)) {
        const ind = Math.floor(Math.random() * webm.length)

        webm = webm[ind]
      }

      winBid.value = video[res].winBid + bid.value * multiplayer.value
      emptyRole.value = 0
    } else if (emptyRole.value > 0 && emptyRole.value % MAX_EMPTY_ROLE === 0) {
      webm = video['000'].video
      winBid.value = 0
    } else {
      running.value = false
    }

    if (isLucky.value) {
      nextTick(() => {
        if (luckySpins.value === 0) {
          isLucky.value = false
          luckySpins.value = 6

          timer.start(60, Flag.dec)
            .tick((count) => {
              luckySpinsCooldown.value = count
            })
            .stop(0)
        }
      })
    }

    imgWebm.value = webm
    emptyRole.value += 1
  }
  // onAssetsLoaded handler builds the example.
  function onAssetsLoaded(data: { [s: string]: unknown } | ArrayLike<unknown>) {
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
        const symbol = new UUIDSprite(...slotTextures[Math.floor(Math.random() * slotTextures.length)])
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
    app.ticker.add((delta: any) => {
      if (!running.value) {
        return
      }

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

            let uuid, texture

            if (isLucky.value || emptyRole.value === MAX_EMPTY_ROLE + 3) {
              const ind = spin.getWinCombina(i)
              uuid = ids[ind]
              texture = data[uuid]
            } else {
              [uuid, texture] = slotTextures[Math.floor(Math.random() * slotTextures.length)]
            }

            s.uuid = uuid
            s.texture = texture
            s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height)
            s.x = Math.round((SYMBOL_SIZE - s.width) / 2)
          }
        }
      }
    })
  }

  function tweenTo (object: never, property: string, target: any, time: number, easing: (t: any) => number, onchange: null, oncomplete: (() => void) | null) {
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

    tweening.value.push(tween)

    return tween
  }

  // Listen for animate update.
  app.ticker.add(() => {
    if (!running.value) {
      return
    }

    const now = Date.now()
    const remove: any[] = []

    for (let i = 0; i < tweening.value.length; i++) {
      const t = tweening.value[i]
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
      tweening.value.splice(tweening.value.indexOf(remove[i]), 1)
    }
  })

  return {
    balance,
    bid,
    multiplayer,
    winBid,
    bidsList,
    startPlay,
    onAssetsLoaded,
    running,
    imgWebm,
    emptyRole,
    isLucky,
    luckySpins,
    luckySpinsCooldown,
  }
}
