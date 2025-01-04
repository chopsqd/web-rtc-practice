import { defineStore } from "pinia";
import debounce from "lodash.debounce";
import { updateScore } from "@/api/app.js";

const debouncedUpdateScore = debounce(updateScore, 500);

const BASE_LEVEL_SCORE = 25;

const LEVELS = new Array(15)
  .fill(0)
  .map((_, i) => BASE_LEVEL_SCORE * Math.pow(2, i));

const LEVEL_SCORES = LEVELS.map((_, level) => {
  let sum = 0;

  for (let [index, value] of LEVELS.entries()) {
    if (index >= level) {
      return sum + value;
    }

    sum += value;
  }

  return sum;
});

const computeLevelByScore = score => {
  for (let [index, value] of LEVEL_SCORES.entries()) {
    if (score <= value) {
      return {
        level: index,
        value: LEVELS[index]
      };
    }
  }
};

export const useScoreStore = defineStore("score", {
  state: () => ({
    score: 0
  }),
  getters: {
    level(state) {
      return computeLevelByScore(state.score);
    },
    currentScore(state) {
      if (this.level.level === 0) {
        return state.score;
      }

      return state.score - LEVEL_SCORES[this.level.level - 1];
    }
  },
  actions: {
    add(score = 1) {
      this.score += score;
      debouncedUpdateScore(this.score);
    },
    setScore(score) {
      this.score = score;
    }
  }
});
