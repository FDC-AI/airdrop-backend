import {Request, Response} from 'express';
import WalletService from '../services/wallet.service';
import config from '../config';

const JettonController = {
  transfer: async (req: Request, res: Response) => {
    const {dest} = req.body;
    const mnemonic = config.blockchain.mnemonic;
    const wallet = new WalletService(mnemonic);
    await wallet.init();
    const result = await wallet.transferJetton({dest, amount: '5'});
    return res.json(result);
  },
};

export default JettonController;
