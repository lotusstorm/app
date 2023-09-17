<template>
  <div ref="__PIXI_ROOT_VIEW__" />
</template>

<script setup lang="ts">
// todo after up vue to 3.3 in nuxt 3 deps
// import type { IApplicationOptions } from '~/types/pixi'

// type Options = Partial<IApplicationOptions>

// const props = withDefaults(defineProps<Options>(), { width: 640, height: 360 })
// import {defineExpose} from ''

const atts = useAttrs()

const __PIXI_ROOT_VIEW__ = ref()
const pixiApp = ref()

defineExpose({
  pixiApp
})

onMounted(() => {
  pixiApp.value = usePixi(atts)

  __PIXI_ROOT_VIEW__.value.appendChild(pixiApp.value.view)
})
</script>
