<template>
  <el-container class="bg-deep-purple">
    <el-main
      class="pa-12"
      style="display: flex; justify-content: center; padding: 35px"
    >
      <el-card class="mx-auto" shadow="hover" style="width: 450px">
        <div slot="header" style="text-align: center">User Registration</div>
        <el-form :model="formData" ref="userForm" label-position="top">
          <el-form-item label="Username">
            <el-input
              v-model="formData.username"
              placeholder="Username"
            ></el-input>
          </el-form-item>
          <el-form-item label="First name">
            <el-input
              v-model="formData.first"
              placeholder="First name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Last name">
            <el-input
              v-model="formData.last"
              placeholder="Last name"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input v-model="formData.email" placeholder="Email"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input
              v-model="formData.password"
              placeholder="Enter your password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formData.terms">
              I agree to site terms and conditions
            </el-checkbox>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <el-row>
          <el-button type="success" @click="saveUser" class="fr">
            Complete Registration
          </el-button>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      formData: {
        first: null,
        last: null,
        email: null,
        password: null,
        username: null,
        terms: false,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  created() {
    this.$store.dispatch("auth/registerUserElementUI");
  },
  methods: {
    async setUser(actionType) {
      const newForm = {
        firstname: this.formData.first,
        lastname: this.formData.last,
        email: this.formData.email,
        password: this.formData.password,
        username: this.formData.username,
      };
      this.$store.dispatch(`auth/${actionType}`, newForm);
    },
    async saveUser() {
      await this.setUser("registerUserElementUI");
    },
  },
  watch: {
    user(user) {},
  },
};
</script>
