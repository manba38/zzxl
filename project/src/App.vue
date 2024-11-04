<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { reqLogin } from './api/user';

export default {
  setup() {
    onMounted(() => {
      reqLogin({ username: 'admin', password: '111111' });
    });

    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>