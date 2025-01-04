import { defineStore } from "pinia";

import { fetchTasks, getOrCreateUser, registerRef, completeTask } from "@/api/app.js";
import { useScoreStore } from "@/stores/score.js";
import { useTelegram } from "@/services/telegram.js";

const { user } = useTelegram();

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
    tasks: []
  }),
  actions: {
    async init(ref) {
      this.user = await getOrCreateUser();

      const score = useScoreStore();
      score.setScore(this.user.score);

      if (ref && +ref !== +this.user.telegram) {
        await registerRef(user?.first_name ?? "Lizard User", ref);
      }
    },
    async completeTask(task) {
      await completeTask(this.user, task);
    },
    async fetchTasks() {
      this.tasks = await fetchTasks();
    }
  }
});