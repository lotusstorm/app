export const animateValue = (obj: any, start: any, end: any, duration: any) => {
  let startTimestamp: any = null

  const step = (timestamp: any) => {
    if (!startTimestamp) {
      startTimestamp = timestamp
    }

    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    obj.value = Math.floor(progress * (end - start) + start)

    console.log(Math.floor(progress * (end - start) + start), 'sxsx')

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export const Flag = {
  inc: 1,
  dec: -1,
}

export class RequestAnimFrameTimer {
  private isStarted = false
  private lastTime = 0
  private numSeconds = 0
  private currentTarget = null
  private _ID: null | number = null
  private max: null | number = null

  constructor(target: any) {
    this.currentTarget = target
  }

  private timer(step: number) {
    if (!this.currentTarget) {
      return
    }

    if (
      this.max !== null &&
      (step === Flag.inc
        ? this.numSeconds >= this.max
        : this.numSeconds <= this.max)
    ) {
      this.clear()

      return
    }

    const currentTime = (new Date()).getTime()

    this._ID = globalThis.requestAnimationFrame(() => this.timer(step))

    if (currentTime - this.lastTime >= 1000) {
      this.lastTime = currentTime
      this.numSeconds += step
      this.currentTarget.value = this.numSeconds
    }
  }

  start(from = 0, flag = Flag.inc) {
    if (!this.isStarted) {
      this.isStarted = true
      this.lastTime = (new Date()).getTime()
      this.numSeconds = from

      this.timer(flag)
    }

    return this
  }

  clear() {
    if (this._ID !== null) {
      globalThis.cancelAnimationFrame(this._ID)

      this.numSeconds = 0
      this.max = null
      this._ID = null
      this.isStarted = false
    }
  }

  stop(value: number) {
    this.max = value

    return this
  }

  reset(value: number) {
    this.numSeconds = value
  }
}

export class LuckySpins {
  private variants: any[] = []
  private variant: any = null
  private target = 0

  constructor(variants: any[]) {
    this.variants = variants

    this.variant = this.gen(this.target)
  }

  private *gen(start: any) {
    if (this.variants.length === 0) {
      return 0
    }

    const variant = this.variants[start]

    if (variant !== undefined) {
      for (const item of variant.split('')) {
        yield item
      }
    }
  }

  next(): any {
    const item = this.variant?.next()

    if (item?.done) {
      this.variant = this.gen(this.target)

      return this.next()
    }

    return item?.value
  }

  step() {
    this.target = Math.floor(Math.random() * this.variants.length)
    // this.target += 1

    if (this.target > this.variants.length - 1) {
      this.target = 0
    }

    this.variant = this.gen(this.target)
    console.log(this.target, 'step -> this.target')
  }
}

export class VideoPreloader {
  private videoPlayer: any = null

  load(videoFileUrls: any[]) {
    // debugger
    console.log(videoFileUrls, 'videoFileUrls')

    // Создадим предварительный кэш видео и сохраним в нем все первые сегменты видеофайлов.
    globalThis.caches.open('video-pre-cache')
      .then(cache => Promise.all(videoFileUrls.map((videoFileUrl: any) => this.fetchAndCache(videoFileUrl, cache))))

    return this
  }

  private fetchAndCache(videoFileUrl: RequestInfo | URL, cache: { match: (arg0: any) => Promise<any>; put: (arg0: any, arg1: Response) => void }) {
    // Сначала проверяем, есть ли видео в кэше.
    return cache.match(videoFileUrl)
      .then((cacheResponse: any) => {
      // Вернем кэшированный ответ, если видео в кэше.
        if (cacheResponse) {
          return cacheResponse
        }
        // В противном случае получаем видео из сети.
        return fetch(videoFileUrl)
          .then((networkResponse) => {
            // Добавляем ответ в кэш и параллельно возвращаем ответ сети.
            cache.put(videoFileUrl, networkResponse.clone())
            return networkResponse
          })
      })
  }

  init(videoPlayer: any) {
    this.videoPlayer = videoPlayer

    return this
  }

  private sourceOpen(data: any, mediaSource: MediaSource) {
    URL.revokeObjectURL(this.videoPlayer.src)

    const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp09.00.10.08"')
    sourceBuffer.appendBuffer(data)

    this.videoPlayer.play().then(() => {
    // Сделать: Получить остальную часть видео при начале воспроизведения.
    })
  }

  play(videoFileUrl: RequestInfo | URL) {
    this.videoPlayer.load() // Дает возможность проиграть видео позже.

    globalThis.caches.open('video-pre-cache')
      .then(cache => this.fetchAndCache(videoFileUrl, cache)) // Определено выше.
      .then(response => response.arrayBuffer())
      .then((data) => {
        const mediaSource = new MediaSource()
        this.videoPlayer.src = URL.createObjectURL(mediaSource)
        mediaSource.addEventListener('sourceopen', this.sourceOpen.bind(this, data, mediaSource), { once: true })
      })
  }
}

export const converter = (dict: any) => {
  return Object.assign(Object.entries(dict).reduce((acc, [key, val]: [string, any]) => {
    acc[val] = key

    return acc
  }, {} as any), dict)
}

// Basic lerp funtion.
export const lerp = (a1: any, a2: any, t: any) => {
  return a1 * (1 - t) + a2 * t
}

// Backout function from tweenjs.
// https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
export const backout = (amount: any) => {
  return (t: any) => (--t * t * ((amount + 1) * t + amount) + 1)
}
