export const LUKSO_NETWORK_CONFIGS = {
  mainnet: {
    chainId: '42',
    chainName: 'LUKSO',
    nativeCurrency: {
      name: 'LYX',
      symbol: 'LYX',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.lukso.gateway.fm'],
    blockExplorerUrls: ['https://explorer.execution.mainnet.lukso.network'],
  },
  testnet: {
    chainId: '4201',
    chainName: 'LUKSO Testnet',
    nativeCurrency: {
      name: 'LYXt',
      symbol: 'LYXt',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.testnet.lukso.gateway.fm'],
    blockExplorerUrls: ['https://explorer.execution.testnet.lukso.network'],
  },
};
