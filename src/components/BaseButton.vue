<template>
  <button :class="['button', { outlined: isOutlined }]">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    isOutlined: {
      type: Boolean,
      default: false,
    },
  },
});
</script>


<style lang="scss">
.button {
  height: 3.12rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background: var(--blue-800);
  color: var(--white);
  padding: 0 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 0.5rem;
  }

  &.outlined {
    background: var(--white);
    border: 1px solid var(--blue-800);
    color: var(--blue-800);
  }

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>