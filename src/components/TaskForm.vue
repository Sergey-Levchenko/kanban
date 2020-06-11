<template>
  <div class="task-form">
    <textarea type="text" :placeholder="text.input" v-model="inputValue" />
    <div class="task-form__footer">
      <button class="task-form__btn" @click="addTask">{{text.btn}}</button>
      <button class="task-form__close" @click="closeForm">
        <i class="material-icons">close</i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    type: { default: "task", type: String }
  },
  data: () => ({
    inputValue: ""
  }),
  computed: {
    text() {
      if (this.type === "task") {
        return { input: "Введите название карточки", btn: "Добавить карточку" };
      } else if (this.type === "list") {
        return { input: "Введите название списка", btn: "Добавить список" };
      } else return { input: "", btn: "" };
    }
  },
  methods: {
    closeForm() {
      this.$emit("closed");
    },
    addTask() {
      if (this.inputValue) this.$emit("added", this.inputValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.task-form {
  display: flex;
  flex-direction: column;
  textarea {
    font-size: 14px;
    line-height: 19px;
    background: #ffffff;
    box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
    border-radius: 3px;
    padding: 8px 4px 8px 12px;
    margin-bottom: 10px;
    font-weight: 600;
    border: none;
    resize: vertical;
    outline: none;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }
  &__btn {
    width: 152px;
    height: 30px;
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
  &__close {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    color: #808080;
    outline: none;
    cursor: pointer;
  }
}
</style>