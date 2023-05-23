---
sidebar_position: 3
---

# L14 Public Testnet

:::success L14-Testnet is running.
This testnet is the lastest stable network.
:::

The [L14 Public Testnet](http://explorer.l14.lukso.network/) is the soon-deprecated POA test network currently used for all UniversalProfiles and issued (Pre) NFTs. L14 is up-to-date with the latest Ethereum forks until Constantinople.

## MetaMask

To add the L14 Network to MetaMask, these are the settings:

| Setting            | Value                            |
| ------------------ | -------------------------------- |
| Network Name       | L14                              |
| New RPC URL        | https://rpc.l14.lukso.network    |
| Chain ID           | 22 (0x16)                        |
| Currency Symbol    | LYXt                             |
| Block Explorer URL | https://blockscout.com/lukso/l14 |

And if you need it, [here is a tutorial on how to do it](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC).

## Running a Node

### Install the Node

Install a parity node `> 2.2.7-stable` as [described here](https://openethereum.github.io/Setup.html).

The LUKSO L14 test network requires most of [Constantinople transitions](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/). This means you need to at least run parity > 2.2.7-stable.

### Start the Node

Run your parity node and connect to the LUKSO L14 test network using:

```bash
$ parity --chain spec.json --bootnodes enode://6a6b0b286e3f96dee993d995f3fd435a065388664e211f02533e28c9ddc31089eb90f71d1386c3c74ee60f79df86cacdb10992c38e2f9cccac4881cb84526415@35.195.116.26:30303
```

The [spec.json](https://github.com/lukso-network/lukso-chain-spec/blob/l14/spec.json) is in the [l14](https://github.com/lukso-network/lukso-chain-spec/tree/l14) branch of the `lukso-chain-spec` repository.

In case the bootnode from above does not work, you can find the current specifications [here](https://github.com/lukso-network/lukso-chain-spec/blob/l14/bootnodes.txt).

## Links

- RPC Endpoint: <https://rpc.l14.lukso.network>
- Explorer: <https://blockscout.com/lukso/l14>
- Faucet: <http://faucet.l14.lukso.network>

## Repositories

- <https://github.com/lukso-network/l14-deploy-node-gcloud>
- <https://github.com/lukso-network/l14-chain-spec>
- <https://github.com/lukso-network/l14-dapps-validators>

## Features

Enabled EiPs are:

- [eip140](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-140.md)
- [eip145](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-145.md)
- [eip211](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-211.md)
- [eip214](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-214.md)
- [eip658](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-658.md)
- [eip1014](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1014.md)
- [eip1052](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1052.md)
- [eip1283](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1283.md)

Not included compared to Ethereum mainnet:

- [eip1234](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1234.md) (Difficulty bomb adjustment)

## Resources

- https://medium.com/lukso/announcing-the-l14-test-network-38d7c622c6cb
- https://github.com/lukso-network/l14-deploy-node-gcloud
