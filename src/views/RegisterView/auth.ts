import router from "@/router";
const state = () => ({
  products: [],
  user: JSON.parse(localStorage.getItem("user")) || null,
  fakeUsers: [
    {
      id: 1,
      email: "user1@example.com",
      password: "password1",
      userName: "User1",
    },
    {
      id: 2,
      email: "user2@example.com",
      password: "password2",
      userName: "User2",
    },
  ],
});

const actions = {
  async loginUser({ commit, state }, payload) {
    try {
      const { email, password } = payload;

      const user = state.fakeUsers.find(
        (user) => user.email === email && user.password === password,
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        commit("setLoggedInUser", user);
        await router.push("/home");
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    }
  },

  async logOut({ commit }, payload) {
    try {
      window.location.href = "/login";
      await router.push("/login");
      commit("setLogoutUser");
    } catch (e) {}
  },
};

const mutations = {
  setLoggedInUser(state, loggedUser) {
    state.user = loggedUser;
    localStorage.setItem("accessToken", loggedUser.token);
  },
  setLogoutUser(state) {
    state.user = null;
    localStorage.removeItem("accessToken");
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
