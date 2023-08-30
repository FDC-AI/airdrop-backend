import {Request, Response} from 'express';
import WalletService from '../services/wallet.service';
import config from '../config';
import AsyncLock from 'async-lock';

const lock = new AsyncLock();

const JettonController = {
  transfer: async (req: Request, res: Response) => {
    const {dest} = req.body;
    const {mnemonic, transferAmount} = config.app;
    const wallet = new WalletService(mnemonic);
    let result;
    if (lock.isBusy()) return res.json({warning: 'wallet is busy'});
    await lock.acquire('transfer', async () => {
      await wallet.init();
      result = await wallet.transferJetton({dest, amount: transferAmount});
    });
    return res.json(result);
  },
};

export default JettonController;
