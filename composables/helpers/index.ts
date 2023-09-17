export const getElementFromContext = (name: string) => {
  // const vm = getCurrentScope();
  // const nuxtApp = useNuxtApp();

  const nuxtApp = getCurrentInstance()?.appContext.app.$nuxt

  console.log(nuxtApp, 'sdfds')

  return nuxtApp?.[name]
}
