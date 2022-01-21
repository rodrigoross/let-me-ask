<template>
  <div
    :class="[
      'question',
      {
        answered: isAnswered,
        highlighted: isHighlighted && !isAnswered,
      },
    ]"
  >
    <p>{{ content }}</p>
    <footer>
      <div class="user-info">
        <img :src="author.avatar" :alt="author.name" />
        <span>{{ author.name }}</span>
      </div>
      <div>
        <slot></slot>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Object as PropType<{
        name: string;
        avatar: string;
      }>,
      required: true,
    },
    isAnswered: {
      type: Boolean,
      default: false,
    },
    isHighlighted: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
.question {
  background: #fefefe;
  border-radius: 0.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;

  & + .question {
    margin-top: 0.5rem;
  }

  &.highlighted {
    background: var(--blue-100);
    border: 1px solid var(--blue-800);

    footer .user-info span {
      color: var(--gray-800);
    }
  }

  &.answered {
    background: var(--gray-100);
  }

  p {
    text-align: left;
    color: var(--gray-800);
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    .user-info {
      display: flex;
      align-items: center;

      img {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
      }

      span {
        margin-left: 0.125rem;
        color: var(--gray-500);
        font-size: 14px;
      }
    }

    > div {
      display: flex;
      gap: 0.5rem;
    }

    ::v-slotted(button) {
      border: 0;
      background: transparent;
      cursor: pointer;

      transition: filter 0.2s;

      &.like-button {
        display: flex;
        align-items: flex-end;
        color: var(--gray-500);
        gap: 0.5rem;

        &.liked {
          color: var(--blue-800);
          svg path {
            stroke: var(--blue-800);
          }
        }
      }

      &:hover {
        filter: brightness(0.7);
      }
    }
  }
}
</style>