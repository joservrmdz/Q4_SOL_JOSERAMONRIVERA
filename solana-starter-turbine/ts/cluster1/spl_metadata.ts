import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import {
    createMetadataAccountV3,
    CreateMetadataAccountV3InstructionAccounts,
    CreateMetadataAccountV3InstructionArgs,
    DataV2Args, fetchMetadataFromSeeds, updateV1
} from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, signerIdentity, publicKey } from "@metaplex-foundation/umi";
import bs58 from "bs58";
import {SendTransactionError} from "@solana/web3.js";
import {burn} from "@solana/spl-token";

// Define our Mint address
const mint = publicKey("4hyuMzmvs7C7iEG9BSe5nR1GqDzNMXYuRca39J6YntFJ")

// Create a UMI connection
const umi = createUmi('https://api.devnet.solana.com');
const keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
    try {
        // Start here
        let accounts: CreateMetadataAccountV3InstructionAccounts = {
            mint: mint,
            mintAuthority: signer,
        }

        let data: DataV2Args = {
            name: "Grimlock Token",
            symbol: "$GRMLK$",
            uri: "",
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null
        }

        let args: CreateMetadataAccountV3InstructionArgs = {
            data,
            isMutable: true,
            collectionDetails: null
        }

        let tx = createMetadataAccountV3(
            umi,
            {
                ...accounts,
                ...args
            }
        )

        const initialMetadata = await fetchMetadataFromSeeds(umi, { mint })
        // console.log(initialMetadata);
        await updateV1(umi, {
            mint,
            authority: signer,
            data: { ...initialMetadata, name: "Grimlock\'s Coin", symbol: "$GRMLCK$", uri: "https://bafybeihyfcq2runkkrpeeqpvbxxyjfgztwp4abj6modv4hiztco6bppoxm.ipfs.w3s.link/metadata.json" },
        }).sendAndConfirm(umi)

        // let result = await tx.sendAndConfirm(umi);
        // // const signature = umi.transactions.deserialize(result.signature);
        // console.log(bs58.encode(result.signature));
        // console.log(`Succesfully Minted!. Transaction Here: https://explorer.solana.com/tx/${tx}?cluster=devnet`)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();

