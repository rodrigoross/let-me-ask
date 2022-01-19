<template>
  <div id="page-room">
    <header>
      <div class="content">
        <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
        <RoomCode :code="roomId" />
      </div>
    </header>

    <main>
      <div class="room-title">
        <h1>Sala VueJS</h1>
        <span>2 Perguntas</span>
      </div>
      <form>
        <textarea name="pergunta" id="pergunta"></textarea>
        <div class="form-footer">
          <div class="user-info" v-if="user">
            <img :src="user.avatar" :alt="user.name" />
            <span>{{ user.name }}</span>
          </div>
          <span v-else>
            Para enviar uma pergunta,
            <button @click.prevent="handleLogin">faça seu login</button>.
          </span>

          <BaseButton> Enviar pergunta </BaseButton>
        </div>
      </form>

      <div class="question-list">
        <img
          src="@/assets/icons/empty-questions.svg"
          alt="Sem perguntas exibidas"
        />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

import BaseButton from "@/components/BaseButton.vue";
import RoomCode from "@/components/Room/RoomCode.vue";
import { ActionTypes } from "@/store/actions";

export default defineComponent({
  components: {
    BaseButton,
    RoomCode,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const user = computed(() => store.state.user);
    const roomId = ref(route.params.id);

    async function handleLogin() {
      const response = await store.dispatch(ActionTypes.SIGN_WITH_GOOGLE);
    }

    return {
      user,
      roomId,
      handleLogin,
    };
  },
});
</script>

<style lang="scss" scoped>
#page-room {
  header {
    padding: 0.825rem;
    border-bottom: 1px solid var(--gray-100);

    .content {
      max-width: 1120px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      > img {
        max-height: 1.5; // 24px
      }

      div {
        display: flex;
        gap: 1rem;

        button {
          height: 2.5rem;
        }
      }
    }
  }

  main {
    max-width: 800px;
    margin: 0 auto;

    .room-title {
      margin: 2rem 0 1.5rem;
      display: flex;
      align-items: center;

      h1 {
        font-family: "Poppins", sans-serif;
        font-size: 1.5rem; // 24px
        color: var(--gray-800);
      }

      span {
        margin-left: 1rem;
        background: var(--pink);
        border-radius: 9999px;
        padding: 0.5rem 1rem;
        color: var(--white);
        font-size: 0.875rem; //14px
      }
    }

    form {
      textarea {
        width: 100%;
        border: 0;
        padding: 1rem;
        border-radius: 0.5rem;
        background: var(--gray-50); // mudar pra #fefefe
        box-shadow: 0 1px 12px rgba(8, 0, 0, 0.8);
        resize: vertical;
        min-height: 8.125rem; // 130px
      }

      .form-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;

        .user-info {
          display: flex;
          align-items: center;

          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }

          span {
            margin-left: 0.5rem;
            color: var(--gray-800);
            font-size: 14px;
            font-weight: 500;
          }
        }

        > span {
          font-size: 0.875rem; //14px
          color: var(--gray-500);
          font-weight: 500;

          button {
            background: transparent;
            border: 0;
            color: var(--blue-800);
            text-decoration: underline;
            font-size: 0.875rem; //14px
            font-weight: 500;

            &:hover {
              filter: brightness(0.5);
            }
          }
        }
      }
    }

    .question-list {
      margin-top: 2rem;
    }
  }
}
</style>
