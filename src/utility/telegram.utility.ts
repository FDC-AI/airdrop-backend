import {Telegraf} from 'telegraf';
import config from '../config';
class TelegramUtility {
  bot: Telegraf;
  constructor(tgBotToken: string) {
    this.bot = new Telegraf(tgBotToken);
    this.init();
  }
  init() {
    this.bot.start(ctx => {
      ctx.reply('Type /help to get more information');
    });

    this.bot.command('send', ctx => {
      const chatID = ctx.message?.chat.id;
      const id = chatID;
      const userMessage = ctx.message!.text;
      const destAddress = userMessage!.split(' ');
      if (destAddress.length > 2)
        ctx.reply('Wrong format, Syntax: \n\n/send yourAddress');
      else if (destAddress.length < 2)
        ctx.reply('Missing arguements, Syntax: \n\n/send yourAddress');
      else {
        // add call backend api here
        ctx.reply('Sending jetton to ' + destAddress[1] + ' requested\n' + id);
      }
    });

    this.bot.help(ctx =>
      ctx.reply('Type command */send yourAddress* to send your token')
    );

    this.bot.launch();
  }

  send(chatID: string, message: string) {
    this.bot.telegram.sendMessage(chatID, message);
  }
}

const {tgBotKey} = config.app;

const tgBot = new TelegramUtility(tgBotKey);

export default tgBot;
