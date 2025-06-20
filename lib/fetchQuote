export async function fetchQuote(inputMint: string, outputMint: string, amount: number) {
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=50`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch quote: ${res.statusText}`);
  }

  return res.json();
}
