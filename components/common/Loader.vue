<template>
  <div class="root-loader">
    <img v-if="!isReady" class="loader" src="/loader.svg">
    <template v-else>
      <slot />
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isReady: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="scss">
@import '~/components/common/styles/loader.scss';
</style>
