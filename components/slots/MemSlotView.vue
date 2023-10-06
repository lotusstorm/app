<template>
  <div class="root-container">
    <div class="view-container">
      <div class="indicator left">
        <UiIcon icon="dice" fill="#FFA12B" height="22px" width="22px" />
        <span class="delimeter">x</span>
        <UiSwitch v-if="!isLuckyCooldown" v-model="isLucky" />
        <span v-else class="timer">
          {{ luckySpinsCooldown }}
        </span>
      </div>
      <Transition name="slide-fade">
        <div v-if="isLucky" class="indicator center">
          <div class="lucky-spins">
            {{ luckySpins }}
          </div>
          <span class="lucky-spins-text">
            LUCKY x SPINS
          </span>
        </div>
      </Transition>
      <div class="indicator right">
        <span>{{ formatedBalance }}</span>
        <UiIcon icon="pj-icon" height="18px" width="22px" />
      </div>
      <div ref="__PIXI_MEM_SLOT_ROOT_VIEW__" class="view" />
      <div class="controle-panel">
        <div class="left">
          <UiButton
            class="play-btn"
            :size="size.l"
            is-round
            @click="handleStart"
          >
            <UiIcon icon="play" />
          </UiButton>
          <UiButton
            class="repeat-btn"
            :size="size.l"
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

    <Teleport to="body">
      <div v-show="showVideo" class="modal-container">
        <video
          ref="__VIDEO_ROOT_VIEW__"
          :src="imgWebm"
          class="video"
          playsinline
          loop
        />
        <!-- <div id="root"></div> -->
        <div class="modal-description">
          <div class="description">
            <span class="text">+{{ winBid }}</span>
            <UiIcon icon="pj-icon" height="32px" width="32px" />
          </div>
        </div>
      </div>
    </Teleport>

    <!-- <Teleport to="body">
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
        <br>
        luckySpinsCooldown: {{ luckySpinsCooldown }}
      </span>
    </Teleport> -->
  </div>
</template>

<script lang="ts" setup>
import { useHelpers } from '~/components/slots/composables/useHelpers'
import { assets } from '~/components/slots/helpers/constants'
import UiIcon from '~/components/ui/icons/UiIcon.vue'
import { size } from '~/components/ui/constants/size'
import { RequestAnimFrameTimer } from '~/components/slots/helpers/utils'
// import { load, onPlayButtonClick } from '~/components/slots/helpers/utils'

const {
  Assets,
  Application,
} = usePixi()

const __PIXI_MEM_SLOT_ROOT_VIEW__ = ref()
const __VIDEO_ROOT_VIEW__ = ref()
const showVideo = ref(false)

const HEIGHT = 220
const WIDTH = 665

const counter = new RequestAnimFrameTimer()

const app = new Application({
  height: HEIGHT,
  width: WIDTH,
  background: '#000000',
})

// const videos = new VideoPreloader().load(Object.values(video).map(({ video }) => video))
// load(videoFileUlsList)

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
  // emptyRole,
  isLucky,
  luckySpins,
  luckySpinsCooldown,
} = useHelpers(app)

Assets.load(assets).then(onAssetsLoaded)

const formatedBalance = computed(() => balance.value >= 1000000 ? `${(balance.value / 1000000).toFixed(1)} kk` : balance.value)
const isLuckyCooldown = computed(() => luckySpinsCooldown.value > 0)

const handleStart = () => {
  startPlay()
}

const handleRefresh = () => {
  if (running.value) { return }

  balance.value = 31415
  bid.value = 10
}

const handleBid = (newBid: any) => {
  if (running.value) { return }

  bid.value = newBid.value
  multiplayer.value = newBid.multiplayer
}

const test = () => {
  globalThis.__PIXI_APP__ = app

  __PIXI_MEM_SLOT_ROOT_VIEW__.value.appendChild(app.view)
  __VIDEO_ROOT_VIEW__.value.addEventListener('loadeddata', (event: any) => {
    const { target } = event

    if (target) {
      showVideo.value = true
      target.play()

      counter.start(0).stop(event.target?.duration, () => {
        showVideo.value = false

        target.pause()
        target.currentTime = 0
      })
    }
  })
}

onMounted(test)
</script>

<style scoped lang="scss">
@import '~/components/slots/styles/main.scss';
</style>
