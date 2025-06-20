import React from 'react';
import { TOKEN_LIST } from '../tokenList';

interface Props {
  selectedToken: string;
  onChange: (token: string) => void;
  tokenList: string[];
  label: string;
}

export default function TokenSelector({ selectedToken, onChange, tokenList, label }: Props) {
  const tokens = TOKEN_LIST.filter(t => tokenList.includes(t.symbol));

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ color: '#ccc', marginBottom: '6px', display: 'block' }}>{label}</label>
      <select
        value={selectedToken}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#2a2a40',
          color: '#fff',
          appearance: 'none',
          backgroundImage: 'none'
        }}
      >
        {tokens.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.symbol}
          </option>
        ))}
      </select>

      <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center' }}>
        {tokens.find(t => t.symbol === selectedToken)?.logoURI && (
          <img
            src={tokens.find(t => t.symbol === selectedToken)?.logoURI}
            alt={selectedToken}
            width={24}
            height={24}
            style={{ marginRight: '8px', borderRadius: '50%' }}
          />
        )}
        <span style={{ color: '#aaa' }}>{selectedToken}</span>
      </div>
    </div>
  );
}