import React from 'react';

import styles from './AddNetworkButton.module.scss';

// TODO: we could use a global config file and fetch the info from there on all pages
const LUKSO_NETWORK_CONFIGS = {
    testnet: {
        chainId: '0x1069', // 4201
        chainName: 'Testnet',
        nativeCurrency: {
            name: 'LYXt',
            symbol: 'LYXt',
            decimals: 18,
        },
        rpcUrls: ['https://rpc.testnet.lukso.gateway.fm'],
        blockExplorerUrls: ['https://explorer.execution.testnet.lukso.network'],
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
                params: [{ chainId: LUKSO_NETWORK_CONFIGS.testnet.chainId }],
            });
            alert('Your extension is now connected to LUKSO Testnet network.');
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [LUKSO_NETWORK_CONFIGS.testnet],
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
            Add LUKSO Testnet
        </button>
    );
}
