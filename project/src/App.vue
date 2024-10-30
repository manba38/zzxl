<template>
  <div>
    <h1>我是App</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
const str = '我爱你祖国'
export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.box {
  width: 500px;
  height: 400px;
  background: black;

  h1 {
    color: white;
  }
}
</style>
