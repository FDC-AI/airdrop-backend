import {Request, Response} from 'express';
import WalletService from '../services/wallet.service';
import config from '../config';
import AsyncLock from 'async-lock';
import tgBot from '../utility/telegram.utility';

const lock = new AsyncLock();

const JettonController = {
  transfer: async (req: Request, res: Response) => {
    const {dest, chatID} = req.body;
    const {mnemonic, transferAmount, network} = config.app;
    const wallet = new WalletService(mnemonic);

    if (lock.isBusy('transfer')) return res.json({warning: 'wallet is busy'});

    lock
      .acquire('transfer', async () => {
        await wallet.init();
        const queryId = await wallet.transferJetton({
          dest,
          amount: transferAmount,
        });

        const sendingMessage = `Sending jetton to ${dest} requested\n ${chatID}`;
        tgBot.send(chatID, sendingMessage);

        const hash = await WalletService.getStatus(dest, queryId.toString());
        const subdomain = network === 'testnet' ? 'testnet.' : '';
        const tonViewerUrl = `https://${subdomain}}tonviewer.com/transaction/${hash}`;
        tgBot.send(chatID, tonViewerUrl);
      })
      .catch(err => {
        console.error(err);
      });

    return res.json({success: true});
  },
};

export default JettonController;
