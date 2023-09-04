import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "@/views/RegisterView/auth";
import students from "@/views/StudentsView/students";

export default createStore({
  modules: {
    students,
    auth,
  },
  plugins: [
    createPersistedState({
      key: "my-app",
      paths: ["auth.user"],
    }),
  ],
});
