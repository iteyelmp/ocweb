import { defineChain } from 'viem'
import { http, createConfig } from '@wagmi/vue'
import { mainnet, sepolia, holesky, hardhat, arbitrum, arbitrumNova, optimism, base } from '@wagmi/vue/chains'
import { injected, coinbaseWallet } from '@wagmi/vue/connectors'

const quarkchain = defineChain({
  id: 3335,
  name: 'QuarkChain',
  network: 'quarkchain',
  rpcUrls: {
    default: { http: ['https://rpc.beta.testnet.l2.quarkchain.io:8545'] },
  },
  nativeCurrency: {
    name: 'QuarkChain',
    symbol: 'QKC',
    decimals: 18,
  },
  blockExplorers: [
    {
      name: 'QuarkChain Explorer',
      url: 'https://explorer.beta.testnet.l2.quarkchain.io',
    },
  ],
  testnet: true,
});

export const config = createConfig({
  chains: [optimism, base, arbitrum, mainnet, sepolia, holesky, hardhat, quarkchain],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'OCWeb.eth',
    }),
  ],
  // Storage:
  // If protocol is "web3:", use no storage (localStorage+cookies are broken in EVM browser)
  // Otherwise use default localStorage storage
  storage: window.location.protocol === 'web3:' ? null : undefined,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [holesky.id]: http(),
    [hardhat.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [quarkchain.id]: http(),
  },
})
