// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace AirDrop {
  namespace Config {
    type App = {
      port: number;
    };
    type Blockchain = {
      network: string;
      mnemonic: string;
      jettonWalletAddress: string;
      jettonDecimal: number;
    };
  }
}
