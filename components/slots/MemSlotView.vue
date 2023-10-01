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
          <div class="lucky-spins-text">
            LUCKY x SPINS
          </div>
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

    <Teleport to="body">
      <div v-show="!!imgWebm" class="modal-container">
        <video autoplay playsinline loop class="video" :src="imgWebm" />
        <div class="modal-description">
          <div class="description">
            <span class="text">+{{ winBid }}</span>
            <UiIcon icon="pj-icon" height="22px" width="22px" />
          </div>
        </div>
      </div>
    </Teleport>

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

const __PIXI_MEM_SLOT_ROOT_VIEW__ = ref()

const HEIGHT = 220
const WIDTH = 665

const app = new Application({
  height: HEIGHT,
  width: WIDTH,
  background: '#000000',
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
  isLucky,
  luckySpins,
  luckySpinsCooldown,
} = useHelpers(app)

Assets.load(assets).then(onAssetsLoaded)

const formatedBalance = computed(() => balance.value >= 1000000 ? `${Math.floor(balance.value / 1000000)} kk` : balance.value)
// const isShowModalDescription = computed(() => winBid.value > 0)
const isLuckyCooldown = computed(() => luckySpinsCooldown.value > 0)

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

<style scoped lang="scss">
@import '~/components/slots/styles/main.scss';
</style>
