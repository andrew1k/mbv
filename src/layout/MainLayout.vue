<template>
  <the-navbar></the-navbar>
  <MDBContainer fluid class="container-fluid">
    <div class="m-1 bg-light">
      <router-view />
    </div>
  </MDBContainer>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import { MDBContainer } from 'mdb-vue-ui-kit'
export default {
  components: {
    TheNavbar,
    MDBContainer
  }
}
</script>

<style scoped>
.container-fluid {
  padding-right: var(--mdb-gutter-x, 0.15rem);
  padding-left: var(--mdb-gutter-x, 0.15rem);
}
</style>