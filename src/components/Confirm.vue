<template>
  <div class="confirm">
    <div class="confirm__inside">
      <h3>{{confirm}}</h3>
      <div class="confirm__buttons">
        <div class="btn error" @click="btnHandler(false)">Нет</div>
        <div class="btn success" @click="btnHandler(true)">Да</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      confirm: state => state.common.confirmText
    })
  },
  methods: {
    ...mapActions({ clearConfirm: "common/clearConfirm" }),
    btnHandler(value) {
      this.$store.dispatch("common/clearConfirm", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.confirm {
  max-width: 300px;
  width: 300px;
  background-color: #ffffff;
  position: fixed;
  z-index: 9;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  text-align: center;
  border-radius: 3px;
  &__buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
  }
}
.btn {
  width: 102px;
  height: 25px;
  border-radius: 3px;
  justify-content: center;
  border: none;
  font-weight: bold;
  font-size: 13px;
  line-height: 19px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  &.success {
    background: #39c071;
  }
  &.error {
    background: tomato;
  }
}
</style>