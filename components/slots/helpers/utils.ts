export const animateValue = (obj: any, start: any, end: any, duration: any) => {
  let startTimestamp: any = null

  const step = (timestamp: any) => {
    if (!startTimestamp) { startTimestamp = timestamp }

    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    obj.value = Math.floor(progress * (end - start) + start)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
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
