import { Keypair, Connection, Commitment } from "@solana/web3.js";
import { createMint } from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);


(async () => {
    try {

        const mint = await createMint(connection,keypair,keypair.publicKey,null, 6)
        console.log(mint.toBase58())
        console.log(mint)
        //Dp2SmeNQfyKopM4RoEyip7AAUQ1Qd5WVZ1pCeN2dxNwx
        //4hyuMzmvs7C7iEG9BSe5nR1GqDzNMXYuRca39J6YntFJ
    } catch(error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
