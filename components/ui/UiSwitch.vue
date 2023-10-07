<template>
  <label class="switch">
    <input v-model="value" :disabled="disabled" type="checkbox" class="self">
    <span class="slider round" />
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  .self {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + .slider {
      background-color: #FFA12B;
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #FFA12B;
    }

    &:checked + .slider:before {
      transform: translateX(26px);
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;

    &:before {
      content: "";
      position: absolute;
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: black;
      transition: .4s;
    }

    /* Rounded sliders */
    &.round {
      border-radius: 34px;

      &:before {
        border-radius: 50%;
      }
    }
  }
}
</style>
