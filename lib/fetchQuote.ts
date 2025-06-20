import { TOKEN_LIST } from '../tokenList';

export async function fetchQuote(fromSymbol: string, toSymbol: string, amount: string): Promise<string> {
  const fromToken = TOKEN_LIST.find(t => t.symbol === fromSymbol);
  const toToken = TOKEN_LIST.find(t => t.symbol === toSymbol);

  if (!fromToken || !toToken || !amount || isNaN(Number(amount))) return '0';

  // Example Raydium API path simulation
  const url = `https://api.raydium.io/swap/quote?fromMint=${fromToken.mint}&toMint=${toToken.mint}&amount=${amount}&slippage=1`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data && data.outAmount) {
      const factor = Math.pow(10, toToken.decimals);
      return (Number(data.outAmount) / factor).toFixed(6);
    }
    return '0';
  } catch (err) {
    console.error('Failed to fetch quote:', err);
    return '0';
  }
}