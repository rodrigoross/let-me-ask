<template>
  <div class="page-auth">
    <aside>
      <img
        src="@/assets/icons/illustration.svg"
        alt="Ilustração de perguntas sendo respondidas"
      />
      <strong>Toda pergunta tem uma resposta.</strong>
      <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
    </aside>
    <main>
      <div class="main-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  // setup() {
  // },
});
</script>

<style lang="scss">
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

    h2 {
      font-size: 1.5rem;
      margin: 4rem 0 1.5rem;
      font-family: "Poppins", sans-serif;
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
    p {
      font-size: 0.875rem;
      color: var(--gray-500);
      margin-top: 1rem;

      a {
        color: var(--pink);
      }
    }
  }
}
</style>