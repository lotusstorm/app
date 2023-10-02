<template>
  <div class="slots-root-container">
    <img class="img img-left" src="/julia_bg.webp" loading="lazy">
    <div class="content-container">
      <div class="content-container-bg" />
      <div class="author">
        <img src="/avatar.webp" alt="avatar" class="avatar">
        <a href="https://www.twitch.tv/pinkjuli" class="text" target="_blank">
          pinkjuli
        </a>
      </div>
      <ClientOnly>
        <MemSlotView />
      </ClientOnly>
    </div>
    <img class="img img-right" src="/leon_bg.webp" loading="lazy">

    <Transition name="slide-fade">
      <Loader v-show="isShow" :is-ready="isDataReady">
        <UiButton
          class="play-btn"
          @click="handleStart"
        >
          <UiIcon icon="play" />
        </UiButton>
      </Loader>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import MemSlotView from '~/components/slots/MemSlotView.vue'
import Loader from '~/components/common/Loader.vue'
import UiIcon from '~/components/ui/icons/UiIcon.vue'

const isDataReady = ref(false)
const isShow = ref(true)

const handleStart = () => {
  isShow.value = false
  console.log('click')
}

useNuxtApp().hook('page:finish', () => {
  isDataReady.value = true
  console.log('99999999999999')
})
</script>

<style scoped lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
}

.slots-root-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: relative;
  overflow: hidden;

  .content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0);
    width: 695px;
    height: 360px;
    margin-top: 180px;
    margin-bottom: auto;
    z-index: 99;
    border-radius: 0 0 10px 10px;

    .author {
      position: absolute;
      content: "";
      top: -130px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;

      .avatar {
        border-radius: 50%;
        overflow: hidden;
        animation: pulsate-bg 1.2s linear infinite alternate;
        border: 3px solid rgb(237, 1, 171);
        width: 80px;
        height: 80px;
        margin-bottom: 10px;
      }

      .text {
        color: #FFA12B;
        font-size: 30px;
        font-family: 'Black Ops One', cursive;
      }
    }

    &-bg {
      width: 100%;
      height: 220px;
      background-color: rgba(0, 0, 0);
      z-index: 11;
      margin: 15px;
      position: absolute;
    }

    &::before {
      content: "";
      width: 344px;
      height: 344px;
      border-radius: 50% 50% 0 0;
      background-color: rgba(0, 0, 0);
      position: absolute;
      top: -165px;
      border: 5px solid rgb(237, 1, 171);
      // animation: pulsate-bg 1.2s linear infinite alternate;
      z-index: 10;
    }

    &::after {
        content: "";
        position: absolute;
        border: 5px solid rgb(237, 1, 171);
        width: 660px;
        height: 220px;
        top: 10px;
        z-index: 250;
        border-radius: 5px;
        // animation: pulsate-bg 1.2s linear infinite alternate;
      }

    // &::after {
    //   content: "";
    //   width: 344px;
    //   height: 344px;
    //   position: absolute;
    //   top: -250px;
    //   background-image: url('/logo_pj.png');
    //   background-position: center;
    //   background-repeat: no-repeat;
    //   z-index: 101;
    // }
  }

  .img {
    height: 100%;

    &.img-left {
      position: relative;
      left: 135px;
    }

    &.img-right {
      position: relative;
      right: 135px;
    }
  }
}
</style>
