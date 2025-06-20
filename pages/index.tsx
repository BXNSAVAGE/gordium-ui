import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import SwapPanel from '../components/SwapPanel';

const WalletMultiButtonDynamic = dynamic(
  async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Gordium DEX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ minHeight: '100vh', backgroundColor: '#0f0f23', color: '#fff', fontFamily: 'sans-serif' }}>
        <header style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src="/favicon.ico" alt="Gordium Logo" width={36} height={36} />
            <h1 style={{ color: '#80d4ff', fontSize: '1.5rem', margin: 0 }}>GORDIUM</h1>
          </div>
          <WalletMultiButtonDynamic />
        </header>
        <main style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>Swap $GORB on Gordium</h2>
          <SwapPanel />
        </main>
      </div>
    </>
  );
}