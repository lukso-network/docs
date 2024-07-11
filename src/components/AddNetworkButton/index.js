import React from 'react';

import { LUKSO_NETWORK_CONFIGS } from '../../constants.js';

import styles from './AddNetworkButton.module.scss';

/**
 *
 * @param {*} networkName: either mainnet or testnet
 * @returns
 */
export default function AddNetworkButton({ networkName }) {
  const addNetwork = async () => {
    const ethereum = window.ethereum;

    if (!ethereum) {
      alert('No extension detected.');
      return;
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId:
              '0x' +
              BigInt(LUKSO_NETWORK_CONFIGS[networkName].chainId).toString(16),
          },
        ],
      });
      alert(
        `Your extension is now connected to LUKSO ${
          networkName == 'mainnet' ? 'Mainnet' : 'Testnet'
        }`,
      );
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId:
                  '0x' +
                  BigInt(LUKSO_NETWORK_CONFIGS[networkName].chainId).toString(
                    16,
                  ),
                chainName: LUKSO_NETWORK_CONFIGS[networkName].chainName,
                rpcUrls: LUKSO_NETWORK_CONFIGS[networkName].rpcUrls,
                blockExplorerUrls:
                  LUKSO_NETWORK_CONFIGS[networkName].blockExplorerUrls,
                nativeCurrency: {
                  name: 'LYX',
                  symbol: 'LYX',
                  decimals: 18,
                },
              },
            ],
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
      ADD LUKSO {networkName.toUpperCase()}
    </button>
  );
}
