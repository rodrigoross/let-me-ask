<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "./store";
import { ActionTypes } from "./store/actions";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.RETRIEVE_SIGNED_USER);
    // onBeforeUnmount(unsubscribe());
  },
});
</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white: #fff;

  --gray-50: #f8f8f8;
  --gray-100: #e2e2e2;
  --gray-200: #a8a8b3;
  --gray-500: #737380;
  --gray-800: #29292e;

  // --green-500: #04d361;
  --red-500: #ea4335;
  --red-700: #e73f5d;

  --pink: #e559f9;

  // --purple-300: #9f75ff;

  --blue-100: #f4f8ff;
  --blue-800: #835afd;
}

body {
  background: var(--gray-50);
  color: var(--gray-800);
}

body,
input,
button,
textarea {
  font: 400 16px "Nunito", sans-serif;
}

#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
