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
      <p class="server-error">{{error}}</p>
      <transition name="fade" mode="out-in">
        <form action="#" @submit.prevent="loginHandler" v-if="!contentActive" key="login">
          <div class="form-item">
            <input
              id="email"
              type="text"
              v-model="$v.formData.email.$model"
              placeholder="Введите email"
            />
            <p
              v-if="!$v.formData.email.required && $v.formData.email.$dirty"
            >Поле не должно быть пустым</p>
            <p
              v-if="!$v.formData.email.minLength"
            >Поле не должно быть меньше {{$v.formData.email.$params.minLength.min}} символов</p>
            <p v-if="!$v.formData.email.email">Это должен быть email</p>
          </div>
          <div class="form-item">
            <input
              id="password"
              type="password"
              v-model.trim="$v.formData.password.$model"
              placeholder="Введите пароль"
            />
            <p
              v-if="!$v.formData.password.required && this.$v.formData.password.$dirty"
            >Поле не должно быть пустым</p>
            <p
              v-if="!$v.formData.password.minLength"
            >Поле не должно быть меньше {{$v.formData.password.$params.minLength.min}} символов</p>
          </div>
          <button type="submit" :disabled="!btnDisable">Войти</button>
          <p>{{text}}</p>
        </form>
        <form action="#" @submit.prevent="registerHandler" v-if="contentActive" key="register">
          <div class="form-item">
            <input
              id="email"
              type="text"
              v-model.trim="$v.formData.email.$model"
              placeholder="Введите email"
            />
            <p
              v-if="!$v.formData.email.required && $v.formData.email.$dirty"
            >Поле не должно быть пустым</p>
            <p
              v-if="!$v.formData.email.minLength"
            >Поле не должно быть меньше {{$v.formData.email.$params.minLength.min}} символов</p>
            <p v-if="!$v.formData.email.email">Это должен быть email</p>
          </div>
          <div class="form-item">
            <input
              id="password"
              type="password"
              v-model.trim="$v.formData.password.$model"
              placeholder="Введите пароль"
            />
            <p
              v-if="!$v.formData.password.required && $v.formData.password.$dirty"
            >Поле не должно быть пустым</p>
            <p
              v-if="!$v.formData.password.minLength"
            >Поле не должно быть меньше {{$v.formData.password.$params.minLength.min}} символов</p>
          </div>
          <div class="form-item">
            <input
              id="repeat_password"
              type="password"
              v-model.trim="$v.formData.passwordRepeat.$model"
              placeholder="Повторите пароль"
            />
            <p
              v-if="!$v.formData.passwordRepeat.sameAsPassword && $v.formData.passwordRepeat.$dirty"
            >Passwords must be identical.</p>
          </div>
          <button type="submit" :disabled="!btnDisable">Зарегестрироваться</button>
          <p>{{text}}</p>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
import { mapState } from "vuex";
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
      try {
        this.$store.dispatch("auth/login", this.formData);
      } catch (error) {
        throw error;
      }
    },
    registerHandler() {
      try {
        this.$store.dispatch("auth/register", this.formData);
      } catch (error) {
        throw error;
      }
    }
  },
  validations: {
    formData: {
      email: {
        required,
        email,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      passwordRepeat: {
        sameAsPassword: sameAs("password")
      }
    }
  },
  computed: {
    ...mapState({
      error: state => state.common.error
    }),
    btnDisable() {
      if (!this.contentActive)
        return (
          !this.$v.formData.email.$invalid &&
          !this.$v.formData.password.$invalid
        );
      else return !this.$v.$invalid;
      return false;
    }
  },
  watch: {
    contentActive(val) {
      this.$v.$reset();
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
  p {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 12px;
    color: tomato;
    margin-top: -3px;
  }
}
.server-error {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 12px;
  color: tomato;
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
  width: 100%;
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
  &:disabled {
    background-color: rgb(160, 160, 160);
  }
}
</style>