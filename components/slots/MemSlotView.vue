<template>
  <PixiView ref="app" />
</template>

<script lang="ts" setup>
import PixiView from '~/components/common/PixiView.client.vue'

const app = ref()

onMounted(() => {
  console.log(app.value.pixiApp, 'MemSlotView')
})
</script>
