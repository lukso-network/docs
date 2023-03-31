---
sidebar_position: 1
---

# Mainnet

:::note
The Mainnet of LUKSO has not started yet. Please follow the progress at [L16 Public Testnet](./l16-testnet/parameters).
:::

## Architecture

LUKSO's Blockchain Architecture consists of three clients:

- The beacon chain client running Casper the Friendly Finality Gadget (Casper FFG) as the consensus protocol (`Casper Consensus`: <https://github.com/lukso-network/prysm>)
- The execution engine client (EVM) (`Smart Contract Execution`: <https://github.com/lukso-network/go-ethereum>)
- The validator client (`Validator`)

## Becoming a Genesis Validator

LUKSO will start as a PoS Blockchain with an Initial Genesis Validator Set that anyone can join.

Once deployed on Ethereum, the Genesis Validator Smart contract will allow users to deposit LYXe and become Genesis Validators for LUKSO Mainnet. For each validator, you run, you must generate a validator key and deposit 32 LYXe. There will be no limit on the number of validators you can run.

The window for becoming a Genesis Validator will be around 3 weeks before launch (or longer if needed). At least **4,096 genesis validators** are required before the Genesis Validator Deposit Smart Contract can be frozen and the process of genesis can begin.

Once frozen, participants can generate two files: genesis.ssz and genesis.json. These files will be the network’s starting point and determine the initial network state.

A deposit dApp that reads from the Genesis Validator Deposit Smart Contract will be available for depositors. The initial network state will contain all Genesis Validator keys and be made available in the form of the genesis.ssz file.

The second file, genesis.json, contains the initial state of the chain. This includes the initial balances and total supply of LYX. The community will have the choice of setting the initial supply at 35M, 42M (the founding team's suggestion), or 100M.

The network start time will be defined in the genesis files. It will most likely be around 1 week after the Genesis Validator Deposit freeze. Validators must have their modes ready at least one day before the network start time. Nodes will automatically begin to create and receive blocks after the network start time.

## Further Information

- [LUKSO’s Mainnet Architecture → Casper Beacon Chain with EVM Execution](https://medium.com/lukso/luksos-mainnet-architecture-casper-beacon-chain-with-evm-execution-f68f9ef7039a)
- [LUKSO Mainnet Progress Update #2](https://medium.com/lukso/an-update-on-the-road-to-mainnet-48d39ce411d7)
- [LUKSO Mainnet Progress Update #1](https://medium.com/lukso/lukso-mainnet-progress-update-1-5d678e47a3eb)
- [LUKSO Mainnet Timeline and Process](https://medium.com/lukso/lukso-mainnet-timeline-and-process-dd997fe811c8)
