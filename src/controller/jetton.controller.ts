import {Request, Response} from 'express';
import WalletService from '../services/wallet.service';
import config from '../config';
import AsyncLock from 'async-lock';
import {tgBot} from '../utility/telegram.utility';

const lock = new AsyncLock();

const JettonController = {
  transfer: async (req: Request, res: Response) => {
    const {dest, chatID} = req.body;
    const {mnemonic, transferAmount, network} = config.app;

    if (lock.isBusy('transfer')) return res.send('service is busy');
    const wallet = new WalletService(mnemonic);
    await wallet.init();
    const isEnough = await wallet.checkBalanceEnough();
    if (!isEnough) return res.send('not enough balance');

    lock
      .acquire('transfer', async () => {
        const queryId = await wallet.transferJetton({
          dest,
          amount: transferAmount,
        });

        if (!tgBot) throw new Error('tgBot not initialized');

        const sendingMessage = `Sending jetton to ${dest} requested\n ${chatID}`;
        tgBot.send(chatID, sendingMessage);

        const hash = await WalletService.getStatus(dest, queryId.toString());
        const subdomain = network === 'testnet' ? 'testnet.' : '';
        const tonViewerUrl = `https://${subdomain}tonviewer.com/transaction/${hash}`;
        tgBot.send(chatID, tonViewerUrl);

        console.info(`transtaction hash: ${hash}`);
      })
      .catch(err => {
        console.error(err);
      });

    return res.send('ok');
  },
};

export default JettonController;
