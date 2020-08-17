<template>
  <div id="app">
    <router-view />
    <transition name="fade">
      <LoginPopup v-if="!token"></LoginPopup>
    </transition>
    <transition name="fade">
      <Loader v-if="loading"></Loader>
    </transition>
    <transition name="fade">
      <Confirm v-if="confirm"></Confirm>
    </transition>

    <button class="logout-btn" @click="logoutHandler" v-if="token">
      <i class="material-icons">arrow_forward</i> Выйти
    </button>
    <button class="back-btn" @click="backHandler" v-if="$route.name!=='Home'">
      <i class="material-icons">arrow_back</i> Назад
    </button>
  </div>
</template>

<script>
import LoginPopup from "@/components/LoginPopup";
import Loader from "@/components/Loader";
import Confirm from "@/components/Confirm";
import Home from "@/views/Home";
import { mapState, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Home,
    LoginPopup,
    Loader,
    Confirm,
  },
  computed: {
    ...mapState({
      token: (state) => state.auth.token,
      loading: (state) => state.common.loading,
    }),
    ...mapGetters({
      confirm: "common/confirmDisplay",
    }),
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("auth/logout");
    },
    backHandler() {
      if (this.$route.name !== "Home") this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  position: relative;
  height: 100vh;
}
.logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 80px;
  height: 30px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  background-color: rgb(253, 166, 166);
  border-radius: 5px;
  color: #ffffff;
  border: 3px solid rgb(252, 138, 138);
  transition: all 0.3s ease;
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  &:hover {
    background-color: rgb(252, 138, 138);
  }
}
.back-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: 80px;
  height: 30px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  background-color: rgb(116, 255, 111);
  border-radius: 5px;
  color: #ffffff;
  border: 3px solid rgb(73, 255, 67);
  transition: all 0.3s ease;
  i {
    font-size: 16px;
    margin-right: 5px;
  }
  &:hover {
    background-color: rgb(73, 255, 67);
  }
  &:focus {
    outline: none !important;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
