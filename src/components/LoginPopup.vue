<template>
  <div class="wrapper">
    <div class="content">
      <div class="header">
        <h3
          :class="[`header__item header__item_login`, {active: !contentActive}]"
          @click="contentActive=false"
        >Вход</h3>
        <h3
          :class="[`header__item header__item_register`, {active: contentActive}]"
          @click="contentActive=true"
        >Регистрация</h3>
      </div>
      <transition name="fade" mode="out-in">
        <form action="#" @submit.prevent="loginHandler" v-if="!contentActive" key="login">
          <input type="email" v-model="formData.email" placeholder="Введите email" />
          <input type="password" v-model="formData.password" placeholder="Введите пароль" />
          <button type="submit">Войти</button>
          <p>{{text}}</p>
        </form>
        <form action="#" @submit.prevent="registerHandler" v-if="contentActive" key="register">
          <input type="email" v-model="formData.email" placeholder="Введите email" />
          <input type="password" v-model="formData.password" placeholder="Введите пароль" />
          <input type="password" v-model="formData.passwordRepeat" placeholder="Повторите пароль" />
          <button type="submit">Зарегестрироваться</button>
          <p>{{text}}</p>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    text: "",
    contentActive: false,
    formData: {
      email: "",
      password: "",
      passwordRepeat: ""
    }
  }),
  methods: {
    loginHandler() {
      this.$store.dispatch("auth/login", this.formData);
    },
    registerHandler() {
      if (this.formData.password == this.formData.passwordRepeat)
        this.$store.dispatch("auth/register", this.formData);
    }
  },
  watch: {
    contentActive(val) {
      this.formData.password = "";
      if (!val) this.formData.passwordRepeat = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.99);
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 50%;
  max-width: 500px;
  background-color: #eeeeee;
  padding: 30px;
}
.header {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  user-select: none;
  &__item {
    width: 50%;
    text-align: center;
    position: relative;
    &::after {
      display: block;
      content: "";
      height: 2px;
      width: 100%;
      background-color: tomato;
      position: absolute;
      bottom: -12px;
      left: 0;
      transform: scaleX(0);
      transition: all 0.4s ease;
    }
    &_login::after {
      transform-origin: right;
    }
    &_register::after {
      transform-origin: left;
    }
  }
  &__item.active::after {
    transform: scaleX(1);
  }
}
form {
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 19px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 8px 4px 8px 12px;
  margin-bottom: 10px;
  font-weight: 600;
  border: none;
  outline: none;
}
button {
  height: 40px;
  background: #39c071;
  border-radius: 3px;
  border: none;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
}
</style>