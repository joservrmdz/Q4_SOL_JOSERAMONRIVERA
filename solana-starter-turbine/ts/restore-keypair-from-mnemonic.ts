import { Keypair } from "@solana/web3.js";
import * as bip39 from "bip39";

const mnemonic =
    "imitate practice idea secret pact ice guide wolf forum traffic dentist often";

// arguments: (mnemonic, password)
const seed = bip39.mnemonicToSeedSync(mnemonic, "");
const keypair = Keypair.fromSeed(seed.slice(0, 32));

console.log(`${keypair.publicKey.toBase58()}`);
console.log(`@`)

// output: 5ZWj7a1f8tWkjBESHKgrLmXshuXxqeY9SYcfbshpAqPG