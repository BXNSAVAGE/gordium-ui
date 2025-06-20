export interface TokenInfo {
  symbol: string;
  mint: string;
  decimals: number;
  logoURI: string;
}

export const TOKEN_LIST: TokenInfo[] = [
  {
    symbol: "SOL",
    mint: "So11111111111111111111111111111111111111112",
    decimals: 9,
    logoURI: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png"
  },
  {
    symbol: "GORB",
    mint: "71Jvq4Epe2FCJ7JFSF7jLXdNk1Wy4Bhqd9iL6bEFELvg",
    decimals: 9,
    logoURI: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Trash_can_icon.png"
  },
  {
    symbol: "USDC",
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png"
  }
];