<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="mb-md-5 mt-md-4 pb-5 card bg-white">
          <div class="m-2 p-1">
          <h4>Мы отправили письмо с подтверждением на вашу почту</h4>
        </div>
        <div class="m-2 p-1">
          <h4>
            <router-link to="/login" class="text-black">Вернуться</router-link>
          </h4>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {

    return {}
  }
}
</script>

<style scoped>

</style>