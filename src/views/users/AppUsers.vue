<template>
  <div class="m-1 p-2 bg-light" style="border-radius: 8px">
    <app-table :users="users" @loadUsers="loadUsers" for-app-list="true"></app-table>
  </div>
</template>

<script>
import AppTable from "@/components/AppTable";
import axios from "axios";
export default {
  data() {
    const users = []
    return {
      users
    }
  }, methods: {
    async loadUsers() {
      const {data} = await axios.get(`${process.env.VUE_APP_DB_URL}/appUsers.json`)
      this.users = Object.keys(data).map(key => {
        return {key: key ,...data[key]}
      })
    }
  },
  components: {AppTable}

}
</script>

<style scoped>

</style>