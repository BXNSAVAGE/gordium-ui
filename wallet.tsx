import { clusterApiUrl } from "@solana/web3.js";
import {
  PhantomWalletAdapter,
  BackpackWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
  SolletExtensionWalletAdapter
} from "@solana/wallet-adapter-wallets";

export const getWalletAdapters = () => {
  return [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
    new TorusWalletAdapter(),
    new SolletExtensionWalletAdapter()
  ];
};

export const network = "mainnet-beta";
export const endpoint = clusterApiUrl(network);