export const LUKSO_NETWORK_CONFIGS = {
  mainnet: {
    chainId: '42',
    chainName: 'LUKSO',
    nativeCurrency: {
      name: 'LYX',
      symbol: 'LYX',
      decimals: 18,
    },
    rpcUrls: ['https://42.rpc.thirdweb.com'],
    blockExplorerUrls: ['https://explorer.lukso.network/'],
  },
  testnet: {
    chainId: '4201',
    chainName: 'LUKSO Testnet',
    nativeCurrency: {
      name: 'LYXt',
      symbol: 'LYXt',
      decimals: 18,
    },
    rpcUrls: ['https://4201.rpc.thirdweb.com'],
    blockExplorerUrls: ['https://explorer.execution.testnet.lukso.network'],
  },
};
