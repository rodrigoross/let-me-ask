<template>
  <div id="page-room">
    <header>
      <div class="content">
        <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
        <div>
          <RoomCode :code="roomId" />
          <BaseButton isOutlined>Encerrar Sala</BaseButton>
        </div>
      </div>
    </header>

    <main>
      <div class="room-title">
        <h1>Sala {{ roomTitle }}</h1>
        <span v-if="questions.length > 0"
          >{{ questions.length }} Pergunta(s)</span
        >
      </div>

      <div class="question-list">
        <img
          src="@/assets/icons/empty-questions.svg"
          alt="Sem perguntas exibidas"
          v-if="!questions.length"
        />
        <template v-else>
          <Question
            v-for="question in questions"
            :key="question.id"
            :content="question.content"
            :author="question.author"
            :isAnswered="question.isAnswered"
            :isHighlighted="question.isHighlighted"
          >
            <template v-if="!question.isAnswered">
              <button
                type="button"
                @click="handleCheckQuestionAsAnswered(question.id)"
              >
                <img
                  src="@/assets/icons/check.svg"
                  alt="Marcar pergunta como respondida"
                />
              </button>
              <button
                type="button"
                @click="handleHighlightQuestion(question.id)"
              >
                <img
                  src="@/assets/icons/answer.svg"
                  alt="Dar destaque à pergunta"
                />
              </button>
            </template>
            <button type="button" @click="handleDeleteQuesiton(question.id)">
              <img src="@/assets/icons/delete.svg" alt="Remover pergunta" />
            </button>
          </Question>
        </template>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";

import Question from "@/components/Question/Question.vue";
import RoomCode from "@/components/Room/RoomCode.vue";
import BaseButton from "@/components/BaseButton.vue";

import { ActionTypes } from "@/store/actions";
import { child, ref as databaseRef, remove, update } from "@firebase/database";
import { database } from "@/services/firebase";

type RoomParams = {
  id: string;
};

export default defineComponent({
  components: {
    RoomCode,
    Question,
    BaseButton,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const params = route.params as RoomParams;

    const user = computed(() => store.state.user);
    const questions = computed(() => store.state.questions);
    const roomTitle = computed(() => store.state.title);
    const roomId = ref(params.id);

    async function handleLogin() {
      await store.dispatch(ActionTypes.SIGN_WITH_GOOGLE);
    }

    const handleHighlightQuestion = async (questionId: string) => {
      const questionRef = child(
        databaseRef(database),
        `rooms/${roomId.value}/questions/${questionId}`
      );

      await update(questionRef, {
        isHighlighted: true,
      });
    };

    const handleCheckQuestionAsAnswered = async (questionId: string) => {
      const questionRef = child(
        databaseRef(database),
        `rooms/${roomId.value}/questions/${questionId}`
      );

      await update(questionRef, {
        isAnswered: true,
      });
    };

    const handleDeleteQuesiton = async (questionId: string) => {
      if (window.confirm("Tem certeza que deseja excluir a pergunta?")) {
        const questionRef = child(
          databaseRef(database),
          `rooms/${roomId.value}/questions/${questionId}`
        );

        await remove(questionRef);
      }
    };

    onBeforeMount(() => {
      store.dispatch(ActionTypes.RETRIEVE_ROOM_DATA, roomId.value);
    });

    onBeforeRouteLeave(() => {
      store.dispatch(ActionTypes.UNSUBSCRIBE_ROOM_LISTENER);
    });

    return {
      user,
      roomId,
      roomTitle,
      questions,
      handleLogin,
      handleCheckQuestionAsAnswered,
      handleHighlightQuestion,
      handleDeleteQuesiton,
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

    .question-list {
      margin-top: 2rem;
    }
  }
}
</style>
