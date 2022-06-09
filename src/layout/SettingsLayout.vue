<template>
  <the-navbar></the-navbar>
  <MDBContainer>
    <div class="my-1 p-3 bg-white">
      <router-view />
    </div>
  </MDBContainer>
</template>

<script>
import {MDBContainer} from 'mdb-vue-ui-kit'
import TheNavbar from '@/components/TheNavbar'
export default {
  components: {TheNavbar, MDBContainer}
}
</script>

<style scoped>

</style>