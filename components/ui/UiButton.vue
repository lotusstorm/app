<template>
  <div class="ui-button">
    <button class="ui-button-content" :class="themClasses">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
import { type Size, size } from '~/components/ui/constants/size'

const props = defineProps({
  isRound: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
    default: size.x
  }
})

console.log(props.size, 'props.size')

const themClasses = computed(() => ({
  'them-rounded': props.isRound,
  [`them-size-${props.size}`]: true,
}))

</script>

<style scoped lang="scss">
.ui-button {
  position: relative;
  display: inline-block;

  & .ui-button-content {
    color: black;
    height: 100%;
    font-family: 'Black Ops One', cursive;
    text-align: center;
    text-decoration: none;
    background-color: #FFA12B;
    display: flex;
    position: relative;
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);
    box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
    border-radius: 10px;
    border: none;
    cursor: pointer;

    &.them-size-x {
      padding: 20px 20px;
      font-weight: bold;
      font-size: 36px;
    }

    &.them-size-l {
      padding: 15px;
      font-weight: bold;
      font-size: 32px;
    }

    &.them-size-s {
      padding: 10px;
      font-weight: bold;
      font-size: 24px;
    }

    &.them-size-m {
      padding: 5px;
      font-weight: bold;
      font-size: 18px;
    }

    &.them-rounded {
      border-radius: 50%;
    }

    &:active{
      top: 10px;
      background-color: #F78900;
      box-shadow: inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
    }
  }
}
</style>
