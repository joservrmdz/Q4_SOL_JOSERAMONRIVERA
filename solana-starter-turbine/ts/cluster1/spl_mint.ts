import {Keypair, PublicKey, Connection, Commitment} from "@solana/web3.js";
import {getOrCreateAssociatedTokenAccount, mintTo} from '@solana/spl-token';
import wallet from "../wba-wallet.json"

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("4hyuMzmvs7C7iEG9BSe5nR1GqDzNMXYuRca39J6YntFJ");

(async () => {
    try {
        // Create an ATA
        const ata = await getOrCreateAssociatedTokenAccount(connection, keypair, mint, keypair.publicKey);
        console.log(`Your ata is: ${ata.address.toBase58()}`);
        //FVuvsUg49oChiQbmGWdN2dYGLGnqXUvTtAJcpqstLiDY

        // Mint to ATA
        const mintTx = await mintTo(connection, keypair, mint, ata.address, keypair.publicKey, 1_000_000_000n * token_decimals);
        console.log(`Your mint txid: ${JSON.stringify(mintTx)}`);
        //44herpJUwpibtcAde3huyMoq1nJtmTYkL2BYw1gfANizDzGoLqfuWjVhFmtiYYU6CcWoYa4s4W1rGTA5qYPcVhQV
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`)
    }
})()
