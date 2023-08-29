import TonWeb from 'tonweb';

export default class WalletService {
  constructor() {
    this.init();
  }

  init() {
    const tonweb = new TonWeb();
    const wallet = tonweb.wallet.create({publicKey: '', wc: 2});
    console.log(wallet);
  }

  airDrop(dest: string) {
    const transferData = {
      toAddress: 'user jetton wallet address',
      amount: '0.8TON',
      seqno: '',
      payload: {
        queryId: '',
        jettonAmount: '1000000000',
        toAddress: 'target v4r2 wallet address',
        responseAddress: 'user v4r2 wallet address',
        forwardAmount: '0.001TON',
        forwardPayload: undefined,
      },
    };
  }
}
