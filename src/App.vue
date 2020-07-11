<template>
  <div id="app">
    <div class="container">
      <TaskList v-for="(item, i) in tasks" :data="item" :key="`tasklist${i}`"></TaskList>
      <AddList></AddList>
      <button class="logout-btn" @click="logoutHandler">Выйти</button>
    </div>
    <transition name="fade">
      <LoginPopup v-if="!token"></LoginPopup>
    </transition>
    <transition name="fade">
      <Loader v-if="loading"></Loader>
    </transition>
    <transition name="fade">
      <Confirm v-if="confirm"></Confirm>
    </transition>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList";
import LoginPopup from "@/components/LoginPopup";
import Loader from "@/components/Loader";
import Confirm from "@/components/Confirm";
import AddList from "@/components/AddList";
import { mapState, mapGetters } from "vuex";
import fb from "firebase/app";
export default {
  name: "App",
  components: {
    TaskList,
    LoginPopup,
    Loader,
    AddList,
    Confirm
  },
  computed: {
    ...mapState({
      tasks: state => state.tasks.data,
      token: state => state.auth.token,
      loading: state => state.common.loading
    }),
    ...mapGetters({
      confirm: "common/confirmDisplay"
    })
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch("auth/logout");
    }
  },
  mounted() {
    console.log('App',process.env);
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  position: relative;
  height: 100vh;
}
.container {
  padding: 20px;
  align-items: flex-start;
  display: flex;
  overflow-x: auto;
  height: 100%;
}
.logout-btn {
  position: fixed;
  right: 10px;
  bottom: 10px;
  width: 100px;
  height: 40px;
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
