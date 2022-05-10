<template>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <ul class="nav nav-pills">
        <li class="nav-item m-2">
          <router-link to="/accountSettings" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': accProp}]">
            Профиль
          </router-link>
        </li>
        <li class="nav-item m-2">
          <router-link to="/authSettings" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': authProp}]">
            Авторизация
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
      <ul class="nav nav-pills">
        <li class="nav-item m-2">
          <router-link to="/deleteAccount" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': delProp}]">
            Удалить аккаунт
          </router-link>
        </li>
        <li class="nav-item m-2">
          <router-link to="/" class="text-decoration-none text-dark nav-link" @click="logout">
            Выйти
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
export default {
  props: ['authProp', 'delProp', 'accProp'],
  setup() {
    const logout = async () => {
      await store.dispatch('auth/logout')
      await router.push('/login')
    }
    return {
      logout,
    }
  },
}
</script>

<style scoped>

</style>