<template>
  <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
  <BaseButton class="create-room" @click="handleLogin">
    <img src="@/assets/icons/google-icon.svg" alt="Login com o Google" />
    Crie sua sala como o Google
  </BaseButton>
  <div class="separator">Ou entre em uma sala</div>
  <form>
    <input type="text" name="codigo" id="codigo" v-model="roomCode" />
    <BaseButton type="submit" @click.prevent="handleJoinRoom"
      >Entrar na sala</BaseButton
    >
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { useRouter } from "vue-router";
import { get, ref as databaseRef } from "@firebase/database";
import { database } from "@/services/firebase";

export default defineComponent({
  name: "Login",
  components: {
    BaseButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const roomCode = ref("");

    async function handleLogin() {
      if (!store.state.user) {
        await store.dispatch(ActionTypes.SIGN_WITH_GOOGLE);
      }

      router.push("/rooms/new");
    }

    async function handleJoinRoom() {
      console.log(roomCode.value);

      if (roomCode.value.trim() === "") return;

      // Verifica se a sala existe
      const roomRef = await get(
        databaseRef(database, `rooms/${roomCode.value}`)
      );

      if (!roomRef.exists()) {
        alert("Sala não existe!");
        return;
      }

      router.push(`/rooms/${roomCode.value}`);
    }

    return {
      roomCode,
      handleLogin,
      handleJoinRoom,
    };
  },
});
</script>

<style lang="scss" scoped>
.create-room {
  margin-top: 3.125rem;
  height: 3.12rem;
  border-radius: 0.5rem;
  font-weight: 500;
  background: var(--red-500);
  color: var(--white);

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;

  transition: filter 0.2s;

  img {
    margin-right: 0.5rem;
  }

  &:hover {
    filter: brightness(0.9);
  }
}

.separator {
  font-size: 0.875rem;
  color: var(--gray-200);

  margin: 2rem 0;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--gray-200);
    margin-right: 1rem;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: var(--gray-200);
    margin-left: 1rem;
  }
}
</style>