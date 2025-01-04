<template>
  <div class="text-content">
    <h1>Your Friends</h1>

    <div class="center">
      <button
        class="referal"
        @click="copy"
      >
        {{ referralText }}
      </button>
    </div>

    <h3 v-if="!friends.length">No friends yet</h3>

    <ul class="list">
      <li
        class="list-item"
        v-for="friend in friends"
        :key="friend.id"
      >
        {{ friend.name }}
        <span class="list-btn done">50</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTelegram } from "@/services/telegram.js";
import { useAppStore } from "@/stores/app.js";
import { computed, ref } from "vue";

const app = useAppStore();
const { user } = useTelegram();

const referralText = ref("Your referal link");

const friends = computed(() =>
  Object.keys(app.user.friends).map((id) => ({
    id,
    name: app.user.friends[id]
  }))
);

function copy() {
  navigator.clipboard.writeText(`https://t.me/LizzardClickerBot?start=${user?.id}`);
  referralText.value = "Copied!";
}
</script>