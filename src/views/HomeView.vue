<template>
  <main>
    <el-container>
      <el-main>
        <el-card class="user-card" shadow="hover">
          <div class="user-info">
            <div class="info-row">
              <span class="info-label">Email:</span>
              <div class="info-value">{{ this.user && this.user.email }}</div>
            </div>
            <div class="info-row">
              <span class="info-label">UserName:</span>
              <div class="info-value">
                {{ this.user && this.user.userName }}
              </div>
            </div>
          </div>
          <div
            class="logout-button"
            style="display: flex; justify-content: end"
          >
            <el-button type="success" @click="logOutUser">Logout</el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </main>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    async logOut(actionType) {
      await this.$store.dispatch(`auth/${actionType}`);
    },
    async logOutUser() {
      await this.logOut("logOut");
    },
  },
};
</script>

<style scoped>
.user-card {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.user-info {
  font-size: 18px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.info-label {
  font-weight: bold;
  margin-right: 10px;
  width: 100px;
  text-align: start;
}

.info-value {
  flex-grow: 1;
}

.logout-button {
  margin-top: 20px;
}
</style>
