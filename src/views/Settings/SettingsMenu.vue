<template>
  <div class="row" role="navigation">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/accountSettings" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': accProp}]">
            Профиль
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/authSettings" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': authProp}]">
            Авторизация
          </router-link>
        </li>
        <li class="nav-item text-nowrap">
          <router-link to="/deleteAccount" :class="['text-decoration-none', 'text-dark', 'nav-link', {'bg-warning': delProp}]">
            Удалить аккаунт
          </router-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
      <ul class="nav">
        <li class="nav-item ">
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