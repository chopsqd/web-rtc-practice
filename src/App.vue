<template>
  <main
    class="game"
    v-if="loaded"
  >
    <div class="page">
      <RouterView />
    </div>
    <TheMenu />
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import TheMenu from "./components/TheMenu.vue";
import { useAppStore } from "@/stores/app.js";
import { useTelegram } from "@/services/telegram.js";

const loaded = ref(false);

const app = useAppStore();
const { tg } = useTelegram();

const urlParams = new URLSearchParams(window.location.search);

app.init(urlParams.get("ref")).then(() => {
  loaded.value = true;
});

onMounted(() => {
  tg.ready();

  tg.expand();
});
</script>
