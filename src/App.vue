<template>
  <component :is="`${layout}-layout`" v-if="layout" />
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import MainLayout from '@/layout/MainLayout'
import AuthLayout from '@/layout/AuthLayout'
import SettingsLayout from '@/layout/SettingsLayout'
export default {
  setup() {
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components:{
    MainLayout, AuthLayout, SettingsLayout

  }
}
</script>

<style>
body {
  font-family: Tahoma;
  background: rgb(56,143,252);
  background: linear-gradient(90deg, rgba(56,143,252,1) 0%, rgba(0,35,210,1) 100%);
}
.bg-warning {
  background: #FFA10D;
}
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>