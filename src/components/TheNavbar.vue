<template>
  <nav class="navbar navbar-dark bg-white navbar-expand-lg">
    <div class="container-fluid max-width-16">
      <router-link class="navbar-brand px-2 text-black fw-bold" to="/">МБВ</router-link>
      <button class="navbar-toggler bg-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end bg-warning" tabindex="-1" id="offcanvasNavbar"
           aria-labelledby="offcanvasNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title text-black" id="offcanvasNavbarLabel">Menu</h5>
          <button type="button" class="btn-close text-reset bg-light" data-bs-dismiss="offcanvas"
                  aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-white">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item px-1">
              <router-link class="nav-link text-black" aria-current="page" to="/">Главная</router-link>
            </li>
            <li class="nav-item px-1">
              <router-link to="/calendar" class="nav-link text-black">Календарь</router-link>
            </li>
<!--            <li class="nav-item px-1">-->
<!--              <router-link to="/" class="nav-link text-black"> employees</router-link>-->
<!--            </li>-->
<!--            <li class="nav-item px-1">-->
<!--              <router-link class="nav-link text-black" to="/"> calendar</router-link>-->
<!--            </li>-->
            <li class="nav-item dropdown px-1">
              <a class="nav-link dropdown-toggle text-black" href="#" id="offcanvasNavbarDropdown" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                {{ email }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
                <li><a class="dropdown-item" href="#">Actions</a></li>
                <li><a class="dropdown-item" href="#">Actions</a></li>
                <li>
                  <hr class="dropdown-divider">
                </li>
                <li>
                  <router-link to="/accountSettings" class="dropdown-item">Настройки</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import {ref} from "vue"

export default {
  setup() {
    const email = ref(localStorage.getItem('email'))
    return {
      email,
    }
  }
}
</script>

<style scoped>
.max-width-16 {
  max-width: 1600px;
}
</style>