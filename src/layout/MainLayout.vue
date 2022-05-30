<template>
  <the-navbar></the-navbar>
  <div class="container-fluid">
    <router-view />
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
export default {
  components: {
    TheNavbar,
  }
}
</script>

<style scoped>

</style>