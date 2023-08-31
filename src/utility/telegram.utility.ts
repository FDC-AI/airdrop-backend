import {Telegraf} from 'telegraf';
import config from '../config';
export default class TelegramUtility {
  bot: Telegraf;
  constructor(tgBotToken: string, domain: string) {
    this.bot = new Telegraf(tgBotToken);
    this.init(domain);
  }
  init(domain: string) {
    this.bot.start(ctx => {
      const chatID = ctx.message?.chat.id;
      ctx.reply('Type /help to get more information');
      const twaUrl = `${domain}?id=${chatID}`;
      ctx.setChatMenuButton({
        type: 'web_app',
        text: 'launch App',
        web_app: {url: twaUrl},
      });
      ctx.telegram.setMyCommands([
        {command: 'send', description: '輸入對方地址以開始轉帳'},
        {command: 'help', description: '顯示指令列表'},
      ]);
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

    console.info('Telegram bot started');
  }

  send(chatID: string, message: string) {
    this.bot.telegram.sendMessage(chatID, message);
  }
}

// export default tgBot;
