<template>
  <component :is="`${sLayout}-settings`" v-if="sLayout"/>
</template>

<script>
import {computed} from 'vue'
import {useRoute} from 'vue-router'
import authSettings from '@/views/settings/AuthSettings'
import accountSettings from '@/views/settings/AccountSettings'

export default {
  setup() {
    const route = useRoute()
    return {
      sLayout: computed(() => route.meta.sLayout),
    }
  }, components: {
    authSettings, accountSettings,
  },
}
</script>

<style scoped>

</style>