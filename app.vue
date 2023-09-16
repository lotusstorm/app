<template>
  <div ref="root" />
</template>

<script setup lang="ts">
const root = ref();

onMounted(() => {
  const app = usePixi({ width: 640, height: 360 });

  // console.log(app, '$pixi');
  root.value.appendChild(app.view);
})

</script>
