<template>
  <div class="page-auth">
    <aside>
      <img src="@/assets/icons/illustration.svg" alt="Ilustração de perguntas sendo respondidas" />
      <strong>Toda pergunta tem uma resposta.</strong>
      <p>
        Aprenda e compartilhe conhecimento
        com outras pessoas
      </p>
    </aside>
    <main>
      <div class="main-content">
        <img src="@/assets/icons/logo.svg" alt="Let me Ask" />
        <BaseButton class="create-room">
          <img src="@/assets/icons/google-icon.svg" alt="Login com o Google" />
          Crie sua sala como o Google
        </BaseButton>
        <div class="separator">Ou entre em uma sala</div>
        <form>
          <input type="text" name="codigo" id="codigo" />
          <BaseButton type="submit">Entrar na sala</BaseButton>
        </form>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseButton from "@/components/BaseButton.vue";

export default defineComponent({
  name: "Home",
  components: {
    BaseButton
  }
  // setup() {
  // },
});
</script>

<style lang="scss" scoped>
.page-auth {
  display: flex;
  align-items: stretch;
  height: 100vh;

  aside {
    flex: 4;
    background: var(--blue-800);
    color: var(--white);

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 7.5rem 5.25rem;

    img {
      max-width: 20rem;
    }

    strong {
      font: 600 2.25rem "Nunito", sans-serif;
      text-align: left;
      margin-top: 0.5rem;
    }

    p {
      font-family: "Open Sans", monospace;
      font-weight: 300;
      font-size: 1.25rem; // 20px
      margin-top: 0.5rem;
      text-align: left;
      color: var(--gray-50);
    }
  }

  main {
    flex: 6;

    padding: 0 2.25rem; // 0 35px
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 20rem; // 320px
    align-items: stretch;
    text-align: center;

    // Afeta somente img dentro de .main-content
    > img {
      align-self: center;
    }

    form {
      input {
        height: 3rem;
        border-radius: 0.5rem;
        padding: 0 1rem;
        background: var(--white);
        border: 1px solid var(--gray-200);
      }

      button {
        margin-top: 1rem;
      }

      button,
      input {
        width: 100%;
      }
    }
  }

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
}
</style>