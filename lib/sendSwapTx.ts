import { TOKEN_LIST } from '../tokenList';
import { Connection, PublicKey, sendAndConfirmTransaction, Transaction } from '@solana/web3.js';
import base64js from 'base64-js';

export async function sendSwapTx(connection: Connection, publicKey: PublicKey, sendTransaction: any, fromSymbol: string, toSymbol: string, amount: string): Promise<string> {
  const fromToken = TOKEN_LIST.find(t => t.symbol === fromSymbol);
  const toToken = TOKEN_LIST.find(t => t.symbol === toSymbol);

  if (!fromToken || !toToken) throw new Error("Invalid token symbols");

  const apiUrl = `https://api.raydium.io/swap/route?inputMint=${fromToken.mint}&outputMint=${toToken.mint}&amount=${amount}&slippage=1`;

  const routeRes = await fetch(apiUrl);
  const routeData = await routeRes.json();
  const swapTxB64 = routeData?.data?.swapTransaction;

  if (!swapTxB64) throw new Error("No swap transaction found");

  const rawTx = base64js.toByteArray(swapTxB64);
  const transaction = Transaction.from(rawTx);

  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  transaction.feePayer = publicKey;

  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, 'processed');

  return signature;
}