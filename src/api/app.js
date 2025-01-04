import supabase from "@/services/supabase.js";
import { useTelegram } from "@/services/telegram.js";
import { useScoreStore } from "@/stores/score.js";

const { user } = useTelegram();

export async function fetchTasks() {
  try {
    const { data } = await supabase
      .from("tasks")
      .select("*");

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getOrCreateUser() {
  try {
    const candidate = await supabase
      .from("users")
      .select()
      .eq("telegram", user?.id);

    if (candidate.data?.length) {
      return candidate.data[0];
    }

    const newUser = {
      telegram: user?.id,
      friends: {},
      tasks: {},
      score: 0
    };

    await supabase
      .from("users")
      .insert(newUser);

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

export async function updateScore(score) {
  try {
    await supabase
      .from("users")
      .update({ score })
      .eq("telegram", user?.id);
  } catch (error) {
    console.log(error);
  }
}

export async function registerRef(userName, refId) {
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("telegram", +refId);

    const refUser = data[0];

    await supabase
      .from("users")
      .update({
        friends: { ...refUser.friends, [user?.id]: userName },
        score: refUser.score + 50
      })
      .eq("telegram", +refId);
  } catch (error) {
    console.log(error);
  }
}

export async function completeTask(user, task) {
  try {
    const score = useScoreStore();
    const newScore = score.score + task.amount;

    score.setScore(newScore);
    await supabase
      .from("users")
      .update({
        tasks: { ...user.tasks, [task.id]: true },
        score: newScore
      })
      .eq("telegram", user?.id);
  } catch (error) {
    console.log(error);
  }
}