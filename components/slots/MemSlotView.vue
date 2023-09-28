<template>
  <div class="root-container">
    <img class="img img-left" src="/swap_face_no_background_julia_3.png">
    <div class="view-container">
      <div class="indicator left">
        <UiIcon icon="dice" fill="#FFA12B" height="22px" width="22px" />
        <span class="delimeter">x</span>
        <UiSwitch v-model="isLucky" />
      </div>
      <div class="indicator right">
        <span>{{ formatedBalance }}</span>
        <UiIcon icon="pj-icon" height="18px" width="22px" />
      </div>
      <div ref="__PIXI_MEM_SLOT_ROOT_VIEW__" class="view" />
      <div class="controle-panel">
        <div class="left">
          <UiButton
            class="play-btn"
            is-round
            @click="handleStart"
          >
            <UiIcon icon="play" />
          </UiButton>
          <UiButton
            class="repeat-btn"
            is-round
            @click="handleRefresh"
          >
            <UiIcon icon="repeat" />
          </UiButton>
        </div>
        <div class="center">
          <span class="bid">
            {{ bid }}
          </span>
          <UiIcon icon="pj-icon" />
        </div>
        <div class="right">
          <UiButton
            v-for="item in bidsList"
            :key="item.value"
            :size="size.s"
            class="bid-btn"
            @click="handleBid(item)"
          >
            {{ item.value }}
          </UiButton>
        </div>
      </div>
    </div>
    <img class="img img-right" src="/leon_background_2.png">

    <div v-show="!!imgWebm" class="modal-container">
      <video autoplay playsinline loop class="video" :src="imgWebm" />
      <div class="modal-description">
        <!-- <span class="main">Аноним</span> -->
        <div v-if="isShowModalDescription" class="description">
          <span class="text">+{{ winBid }}</span>
          <UiIcon icon="pj-icon" height="22px" width="22px" />
        </div>
      </div>
    </div>

    <span class="inspect">
      src: {{ imgWebm }}
      <br>
      duration: {{ duration }}
      <br>
      emptyRole: {{ emptyRole }}
      <br>
      balance: {{ balance }}
      <br>
      bid: {{ bid }}
      <br>
      winBid: {{ winBid }}
      <br>
      multiplayer: {{ multiplayer }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useHelpers } from '~/components/slots/composables/useHelpers'
import { assets } from '~/components/slots/helpers/constants'
import UiIcon from '~/components/ui/icons/UiIcon.vue'
import { size } from '~/components/ui/constants/size'

const {
  Assets,
  Application,
} = usePixi()

const isLucky = ref(false)

const __PIXI_MEM_SLOT_ROOT_VIEW__ = ref()

const height = 220
const width = 665

const app = new Application({
  height,
  width,
})

const {
  balance,
  bid,
  multiplayer,
  winBid,
  bidsList,
  startPlay,
  onAssetsLoaded,
  running,
  imgWebm,
  duration,
  emptyRole,
} = useHelpers(app)

Assets.load(assets).then(onAssetsLoaded)

const formatedBalance = computed(() => balance.value >= 1000000 ? `${Math.floor(balance.value / 1000000)} kk` : balance.value)
const isShowModalDescription = computed(() => winBid.value > 0)

const handleStart = () => {
  startPlay()
}

const handleRefresh = () => {
  if (running.value) { return }

  console.log('handleRefresh')
}

const handleBid = (newBid: any) => {
  if (running.value) { return }

  bid.value = newBid.value
  multiplayer.value = newBid.multiplayer
}

const test = () => {
  globalThis.__PIXI_APP__ = app
  __PIXI_MEM_SLOT_ROOT_VIEW__.value.appendChild(app.view)
}

watch(imgWebm, (newVal) => {
  if (newVal) {
    const t = setTimeout(() => {
      imgWebm.value = ''
      duration.value = 0
      balance.value += winBid.value
      // animateValue(balance, balance.value, balance.value + winBid.value, 5000)
      winBid.value = 0

      clearTimeout(t)
    }, unref(duration))
  }
})

onMounted(test)
</script>

<style scoped lsng="scss">
.inspect {
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  background-color: rgba(255, 255, 255, 0.6);
  font-size: 32px;
  z-index: 100;
}

.modal-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.7);

  .video {
    display: flex;
    margin-top: 5%;
    /* width: 500px; */
    background-color: white;
    padding: 5px 10px;
    border-radius: 5px;
    max-height: 80vh;
    min-height: 400px;
  }

  .modal-description {
    margin-top: 20px;

    .main {}
    .description {
      font-weight: bold;
      font-size: 48px;
      display: flex;
      align-items: center;
      padding-right: 10px;

      .text {
        color: #FFA12B;
        text-shadow: 0 -1px rgba(0, 0, 0, 0.1);
        animation: pulsate 1.2s linear infinite;
      }
    }
  }
}

@keyframes pulsate {
  50% {
    color: #fff;
    text-shadow: 0 -1px rgba(0, 0, 0, .3), 0 0 5px #ffd, 0 0 8px #fff;
  }
}

.root-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-image: url("/main_background_4.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .view-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 15px;
    margin-top: 180px;
    margin-bottom: auto;
    z-index: 99;

    .indicator {
      display: flex;
      align-items: center;
      content: "";
      width: 164px;
      position: absolute;
      color: #FFA12B;
      padding: 15px;
      background-color: rgba(0, 0, 0);
      top: -62px;
      display: flex;
      align-items: center;

      .delimeter {
        padding: 0 5px;
      }

      &.left {
        left: 4%;
        border-radius: 5px 0 0 0;
        justify-content: flex-start;
      }

      &.right {
        border-radius: 0 5px 0 0;
        font-size: 30px;
        right: 4%;
        justify-content: flex-end;
      }
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
      box-shadow: 0px 0px 15px 5px rgba(237, 1, 171, 0.7);
      z-index: 100;
    }

    &::after {
      content: "";
      width: 344px;
      height: 344px;
      position: absolute;
      top: -250px;
      background-image: url('/logo_pj.png');
      background-position: center;
      background-repeat: no-repeat;
      z-index: 101;
    }

    .view {
      z-index: 100;
      margin-bottom: 10px;

      &::before {
        content: "";
        position: absolute;
        border: 5px solid rgb(237, 1, 171);
        width: 665px;
        height: 220px;
        top: 10px;
        left: 10px;
        bottom: 0;
        right: 0;
        border-radius: 5px;
        box-shadow: 0px 0px 15px 5px rgba(237, 1, 171, 0.7);
      }
    }

    .controle-panel {
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 10px 0;

      .left {
        .play-btn {}

        .repeat-btn {
          margin-left: 10px;
        }
      }

      .center {
        color: #FFA12B;
        padding: 10px;
        border: 2px solid #FFA12B;
        width: 100px;
        border-radius: 5px;

        .bid {
          font-size: 24px;
          text-align: center;
        }
      }

      .right {
        .bid-btn {
          margin-right: 10px;

          &:last-child {
            margin-right: 0px;
          }
        }
      }
    }
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
