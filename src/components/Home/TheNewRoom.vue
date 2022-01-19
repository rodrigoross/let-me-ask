<template>
  <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
  <h2>Criar uma nova sala</h2>
  <p>{{ name }}</p>
  <form>
    <input type="text" name="codigo" id="codigo" v-model="newRoom" />
    <BaseButton type="submit" @click.prevent="handleCreateRoom"
      >Criar sala</BaseButton
    >
  </form>
  <p>
    Quer entrar em uma sala existente?
    <router-link to="/">Clique aqui</router-link>
  </p>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { useStore } from "@/store";
import { child, push, ref as firebaseRef } from "@firebase/database";
import { database } from "@/services/firebase";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NewRoom",
  components: {
    BaseButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const name = computed(() => store.state.user?.name);
    const userId = computed(() => store.state.user?.id);

    const newRoom = ref("");

    async function handleCreateRoom() {
      if (newRoom.value.trim() === "") return;

      const roomRef = child(firebaseRef(database), "rooms");

      const firebaseRoom = await push(roomRef, {
        title: newRoom.value,
        authorId: userId.value,
      });

      router.push(`/rooms/${firebaseRoom.key}`);
    }

    return { name, newRoom, handleCreateRoom };
  },
});
</script>