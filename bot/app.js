import { Telegraf, Markup } from "telegraf";
import { TOKEN, WEB_APP_URL } from "./config.js";

const bot = new Telegraf(TOKEN);

bot.command("start", ctx => {
  ctx.reply("Hello! Press to start the app", Markup.inlineKeyboard([
    Markup.button.webApp(
      "Open mini app",
      `${WEB_APP_URL}?ref=${ctx.payload}`
    )
  ]));
});

bot.launch();