<template>
  <el-container class="bg-deep-purple">
    <el-main
      class="pa-12"
      style="display: flex; justify-content: center; padding: 35px"
    >
      <el-card
        shadow="hover"
        style="max-width: 344px; display: flex; justify-content: center"
      >
        <el-form :model="form" @submit.prevent="onSubmit">
          <el-form-item
            prop="email"
            :rules="[
              { required: true, message: 'Field is required', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.email"
              :readonly="loading"
              clearable
              placeholder="Email"
            ></el-input>
          </el-form-item>

          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: 'Field is required', trigger: 'blur' },
            ]"
          >
            <el-input
              v-model="form.password"
              :readonly="loading"
              clearable
              type="password"
              placeholder="Password"
            ></el-input>
          </el-form-item>

          <el-button
            :disabled="!form"
            :loading="loading"
            type="success"
            size="large"
            native-type="submit"
            style="width: 100%"
          >
            Sign In
          </el-button>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      loading: false,
    };
  },

  methods: {
    onSubmit() {
      if (!this.form.email || !this.form.password) return;

      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);

      const userInfo = {
        email: this.form.email,
        password: this.form.password,
      };

      this.$store.dispatch("auth/loginUser", userInfo);
    },
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
};
</script>
