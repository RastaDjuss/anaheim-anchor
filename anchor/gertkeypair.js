import * as fs from 'fs';
import { Keypair } from '@solana/web3.js';

const pathToKeypair = 'anchor/target/deploy/anaheim-keypair.json';

// check si le file exist avant de le lire
if (!fs.existsSync(pathToKeypair)) {
	console.error(`Error: ${pathToKeypair} does not exist. Please run 'anchor build' to generate the keypair.`);
	process.exit(1);
}

const secretKeyString = fs.readFileSync(pathToKeypair, { encoding: 'utf8' });
const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
const keypair = Keypair.fromSecretKey(secretKey);

console.log('Public Key:', keypair.publicKey.toBase58());