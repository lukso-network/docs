---
sidebar_label: 'Exit Validators'
sidebar_position: 5
---

# Exit Validators

In order to exit fully exit validator keys and all the staked LYX/LYXt, make sure to:

- Have the latest LUKSO CLI installed or [update your node](./update-the-node.md)
- Have the Withdrawal Cedential set or [perform an withdrawal update](./withdrawal-update.md)

## Perform the Withdrawal

After your node is synced up and running, you will be able to go through the complete exit process using the following command:

```bash
lukso validator exit
```

The exit setup will be different depending on your consensus client. Within [Prysm](https://docs.prylabs.network/docs/getting-started), you can select all or a specific number of validators by navigating the user interface in the terminal and selecting the public keys. For [Lighthouse](https://lighthouse-book.sigmaprime.io/intro.html), you have to input your validator and exit one at a time.

:::info Exit Submission

After the setup is completed, the validator exit credential is submitted to the blockchain without interruption. You can use `Ctrl+C` to stop the exit process anytime.

:::

## Check the Withdrawal Status

A maximum of 16 validator keys can exit per block. Depending on the number of exits in the queue, the change might take several hours to be included in a block. If the exit is not showing up after several hours, consider re-doing the exit within the terminal.

1. Open the Validator Withdrawal Page of the related network:
   - [LUKSO Mainnet Validator Withdrawals](https://explorer.consensus.mainnet.lukso.network/validators/withdrawals)
   - [LUKSO Testnet Validator Withdrawals](https://explorer.consensus.testnet.lukso.network/validators/withdrawals)
2. Input your validator's public key or index as described in the [Withdrawal Update Guide](./withdrawal-update.md)
3. If the exit has been successfully submitted, the page will show an estimated exit time

:::info

Your validators stay active until the full withdrawal exit time. Ensure your node runs to this point to gain further rewards and fees. If your node is offline, you will get penalized and lose your stake.

:::

## Further Reads

If you are using Dappnode or a custom client, please refer to the following sources:

- [Exit Dappnode Validators](https://discourse.dappnode.io/t/how-to-exit-your-validator-from-the-ui/1745)
- [Prysm Validator Exit Documentation](https://docs.prylabs.network/docs/wallet/exiting-a-validator)
- [Lighthouse Withdrawal Guide](https://lighthouse-book.sigmaprime.io/voluntary-exit.html)
- [How to exit Teku Validators](https://docs.teku.consensys.io/how-to/voluntarily-exit)
