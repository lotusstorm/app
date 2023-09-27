export const size = {
  x: 'x',
  l: 'l',
  s: 's',
  m: 'm',
} as const

export type Size = typeof size[keyof typeof size]
