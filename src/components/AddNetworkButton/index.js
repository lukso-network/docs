import React from 'react';

import styles from './AddNetworkButton.module.scss';

// TODO: we could use a global config file and fetch the info from there on all pages
const LUKSO_NETWORK_CONFIGS = {
  mainnet: {
    chainId: '0x2A', // 42
    chainName: 'LUKSO',
    nativeCurrency: {
      name: 'LYX',
      symbol: 'LYX',
      decimals: 18,
    },
    rpcUrls: ['https://rpc.lukso.gateway.fm'],
    blockExplorerUrls: ['https://explorer.execution.mainnet.lukso.network'],
  },
};

export default function AddNetworkButton() {
  const addNetwork = async () => {
    const ethereum = window.ethereum;

    if (!ethereum) {
      alert('No extension detected.');
      return;
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: LUKSO_NETWORK_CONFIGS.mainnet.chainId }],
      });
      alert('Your extension is now connected to LUKSO network.');
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [LUKSO_NETWORK_CONFIGS.mainnet],
          });
        } catch (addError) {
          alert(addError.message);
        }
      } else {
        alert(switchError.message);
      }
    }
  };

  return (
    <button className={styles.button} onClick={addNetwork}>
      Add LUKSO network
    </button>
  );
}
