<template>
  <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
  <h2>Criar uma nova sala</h2>
  <form>
    <input type="text" name="codigo" id="codigo" />
    <BaseButton type="submit">Criar sala</BaseButton>
  </form>
  <p>
    Quer entrar em uma sala existente?
    <router-link to="/">Clique aqui</router-link>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "NewRoom",
  components: {
    BaseButton,
  },
});
</script>