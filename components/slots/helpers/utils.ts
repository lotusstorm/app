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
    console.log(this._ID, 'this._ID')

    if (currentTime - this.lastTime >= 1000) {
      console.log('Last Time: ' + this.lastTime)
      console.log('Current Time: ' + currentTime)

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

    if (this.target > this.variants.length - 1) {
      this.target = 0
    }

    this.variant = this.gen(this.target)
    console.log(this.target, 'step -> this.target')
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
