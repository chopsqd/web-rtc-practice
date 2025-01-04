<template>
  <div class="text-content">
    <h1>Your tasks</h1>
    <h3 v-if="!app.tasks.length">Loading tasks...</h3>
    <ul
      v-else
      class="list"
    >
      <li
        v-for="task in app.tasks"
        :key="task.id"
        class="list-item"
      >
        {{ task.title }}

        <span>
          <a
            @click.prevent="openTask(task)"
            target="_blank"
            class="list-btn"
            :class="{done: app.user?.tasks?.[task.id]}"
          >
              {{ task.amount }}
          </a>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAppStore } from "@/stores/app.js";
import { useTelegram } from "@/services/telegram.js";

const app = useAppStore();
const { tg } = useTelegram();

function openTask(task) {
  app.completeTask(task);
  if (task.url.includes("t.me")) {
    tg.openTelegramLink(task.url);
  } else {
    tg.openLink(task.url);
  }
}

onMounted(() => {
  app.fetchTasks();
});
</script>