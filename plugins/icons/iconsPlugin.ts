import iconSettings from './settings.json'

declare module '#app' {
  interface NuxtApp {
    $icons: any
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $icons: any
  }
}

export const iconsPlugin = (app: any) => {
  // console.log(app, iconSettings);

  app.provide('icons', iconSettings?.icons || {})
}
