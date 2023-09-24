<template>
  <div class="ui-button">
    <button class="ui-button-content">
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
const { isRound } = defineProps<{isRound?: boolean}>()

const them = {
  radius: isRound ? '40px' : '10px'
}
</script>

<style scoped>
.ui-button{
  position:relative;
  display:inline-block;
  margin:20px;
  height: 76px;
}

.ui-button .ui-button-content {
  color: white;
  height: 100%;
  font-family: Helvetica, sans-serif;
  font-weight: bold;
  font-size: 36px;
  text-align: center;
  text-decoration: none;
  background-color: #FFA12B;
  display: block;
  position: relative;
  padding: 20px 20px;
  text-shadow: 0px 1px 0px #000;
  filter: dropshadow(color=#000, offx=0px, offy=1px);
  box-shadow: inset 0 1px 0 #FFE5C4, 0 10px 0 #915100;
  border-radius: v-bind('them.radius');
  border: none;
  cursor: pointer;
}

.ui-button .ui-button-content:active{
  top:10px;
  background-color:#F78900;
  box-shadow:inset 0 1px 0 #FFE5C4, inset 0 -3px 0 #915100;
}

/* .ui-button:after{
  content:"";
  height:100%;
  width:100%;
  padding:4px;
  position: absolute;
  bottom:-15px;
  left:-4px;
  z-index:-1;
  background-color:#2B1800;
  border-radius: 5px;
} */
</style>
