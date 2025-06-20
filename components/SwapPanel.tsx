import React, { useEffect, useState } from 'react';
import TokenSelector from './TokenSelector';
import { TOKEN_LIST } from '../tokenList';
import { fetchQuote } from '../fetchQuote';
import { sendSwapTx } from '../sendSwapTx';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import toast from 'react-hot-toast';

export default function SwapPanel() {
  const tokenOptions = TOKEN_LIST.map((t) => t.symbol);

  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('GORB');
  const [isLoading, setIsLoading] = useState(false);

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchOutput = async () => {
      if (!fromAmount || isNaN(Number(fromAmount))) return setToAmount('');
      const quote = await fetchQuote(fromToken, toToken, fromAmount);
      setToAmount(quote);
    };
    fetchOutput();
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = async () => {
    if (!publicKey) return toast.error('Connect your wallet first!');
    setIsLoading(true);
    try {
      const signature = await sendSwapTx(
        connection,
        publicKey,
        sendTransaction,
        fromToken,
        toToken,
        fromAmount
      );
      toast.success(
        <span>
          Swap sent! <br />
          <a href={`https://solscan.io/tx/${signature}`} target="_blank" rel="noopener noreferrer" style={{ color: '#80d4ff', textDecoration: 'underline' }}>
            View on Solscan
          </a>
        </span>
      );
    } catch (err) {
      console.error(err);
      toast.error('Swap failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1e1e2f', padding: '30px', borderRadius: '12px', maxWidth: '400px', margin: '0 auto' }}>
      <h3 style={{ color: '#80d4ff', marginBottom: '20px' }}>Swap Tokens</h3>

      <TokenSelector
        selectedToken={fromToken}
        onChange={setFromToken}
        tokenList={tokenOptions}
        label="From Token"
      />

      <input
        type="number"
        value={fromAmount}
        onChange={(e) => setFromAmount(e.target.value)}
        placeholder="From amount"
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: 'none'
        }}
      />

      <TokenSelector
        selectedToken={toToken}
        onChange={setToToken}
        tokenList={tokenOptions}
        label="To Token"
      />

      <input
        type="text"
        value={toAmount}
        placeholder="To amount (estimated)"
        disabled
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#2a2a40',
          color: '#aaa'
        }}
      />

      <button
        onClick={handleSwap}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? '#ccc' : '#80d4ff',
          color: '#000',
          width: '100%',
          padding: '12px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: 'bold',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Swapping...' : 'Swap'}
      </button>
    </div>
  );
}