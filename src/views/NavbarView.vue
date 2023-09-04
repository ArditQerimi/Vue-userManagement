<template>
  <div class="container">
    <div class="menu">
      <div>
        <ul>
          <li class="menu-item">
            <router-link
              to="/home"
              class="menu-link"
              v-bind:class="{ 'active-menu-item': $route.path === '/home' }"
              >Home</router-link
            >
          </li>
          <li class="menu-item">
            <router-link
              to="/students"
              class="menu-link"
              v-bind:class="{ 'active-menu-item': $route.path === '/students' }"
              >Students</router-link
            >
          </li>
          <li class="menu-item">
            <router-link
              to="/archives"
              class="menu-link"
              v-bind:class="{ 'active-menu-item': $route.path === '/archives' }"
              >Archive</router-link
            >
          </li>
          <li class="menu-item">
            <router-link
              to="/help"
              class="menu-link"
              v-bind:class="{ 'active-menu-item': $route.path === '/help' }"
              >Help</router-link
            >
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li class="menu-item user">
            <div>Welcome {{ this.user && this.user.userName }}</div>
            <div>
              <el-button type="success" @click="logOutUser">Logout</el-button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",

  methods: {
    ...mapState({
      archivedStudents: (state) => state.students.archivedStudents,
    }),
    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style scoped>
.container {
  width: 100%;
}

.menu {
  background-color: #fff;
  color: #545c64;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #545c64;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

.menu-item {
  padding: 10px;
}

.menu-link {
  text-decoration: none;
  color: #545c64;
  transition: color 0.3s;
}

.menu-link:hover {
  color: #67c23a;
}

.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.active-menu-item {
  color: #67c23a;
  font-weight: bold;
}
</style>
