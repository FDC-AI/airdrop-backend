import path, {join} from 'path';
import * as yaml from 'js-yaml';
import {readFileSync} from 'fs';

const configPath = path.join(__dirname, '../config');

const appConfig = yaml.load(
  readFileSync(join(configPath, 'app.yaml'), 'utf8')
) as AirDrop.Config.App;

const blockchainConfig = yaml.load(
  readFileSync(join(configPath, 'blockchain.yaml'), 'utf8')
) as AirDrop.Config.Blockchain;

const config = {
  app: appConfig,
  blockchain: blockchainConfig,
};

export default config;
