<template>
  <button class="room-code">
    <div>
      <img src="@/assets/icons/copy.svg" alt="Copiar código da sala" />
    </div>
    <span>Sala #{{ code }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    code: {
      type: String,
      required: true,
    },
  },
});
</script>


<style lang="scss" scoped>
.room-code {
  height: 2rem; //32px
  border-radius: 0.5rem;
  overflow: hidden;

  background: var(--white);
  border: 1px solid var(--blue-800);
  cursor: pointer;

  display: flex;

  div {
    background: var(--blue-800);
    height: inherit; // para preencher todo o espaço do botão
    padding: 0 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: block;
    align-self: center;
    flex: 1;
    padding: 0 1rem 0 0.75rem;
    width: 15rem; //240px
    font-size: 14px;
    font-weight: 500;
  }
}
</style>