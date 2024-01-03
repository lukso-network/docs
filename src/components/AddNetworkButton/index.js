import React from 'react';

import { LUKSO_NETWORK_CONFIGS } from '../../constants';

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
        params: [{ chainId: LUKSO_NETWORK_CONFIGS[networkName].chainId }],
      });
      alert('Your extension is now connected to LUKSO network.');
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [LUKSO_NETWORK_CONFIGS[networkName]],
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
      Add LUKSO {networkName}
    </button>
  );
}
