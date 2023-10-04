---
sidebar_label: 'Create a custom Forwarder URD (1/2)'
sidebar_position: 1
---

# Create a custom forwarder URD

In this guide, we will create a custom [Universal Receiver Delegate](../../standards/generic-standards/lsp1-universal-receiver-delegate.md) contract. This contract will be called each time the associated UP receives a [LSP7 token](../../standards/nft-2.0/LSP7-Digital-Asset.md), and will forward a certain percentage to another address. The use-case it answers is:

> **"As a Universal Profile (UP) owner, I want to transfer part of the tokens I received to another UP"**.

An example scenario could be: _"each time I receive USDT, I want to automatically transfer 20% to my wife's UP"_.

## Requirements

In order to follow this guide, you'll need to:

1. Install the [UP Browser extension](../browser-extension/install-browser-extension.md).
2. Fund the main controller (EOA) of your UP (You can find this address in the extension if you click on the controller tab > "UP Extension") using the [Testnet Faucet](https://faucet.testnet.lukso.network/).
3. Setup a new Hardhat project using the [Getting started](../../contracts/getting-started.md) guide.

## 1 - EOA permission

First, we will need to give the EOA that controls our UP proper permission to add / edit an Universal Receiver Delegate (called "Automation").

To do that, click on the controller tab > "UP Extension" which will bring the controller information page.

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/ControllerSettings.png"
    alt="Screenshot of the controller settings in the extension"
/>
</div>

Scroll down to the "Administration & Ownership" part and check both "Add notifications & automation" and "Edit notifications & automation".

<div style={{textAlign: 'center'}}>
<img
    src="/img/guides/lsp1/ControllerPerm.png"
    alt="Screenshot of the controller permissions in the extension"
/>
</div>

Confirm the changes and submit the transaction.

## 2 - Environment variables

In your hardhat project, create a `.env` file (if it's not already present) and fill the `PRIVATE_KEY` and `UP_ADDR` with the info coming from your UP Browser Extension. To get those values:

- Click on the extension
- Click on the Settings icon ⚙️ at the top right corner, then select "reveal private keys"
- Enter your password
- Scroll down and copy the `privateKey` field to your `.env` file in `PRIVATE_KEY`
- Copy the `address` field to your `.env` file in `UP_ADDR`

We will need 2 additional information:

- `UP_RECEIVER` => the address that will receive part of the tokens
- `PERCENTAGE` => the percentage of the received tokens that will be transfered

## 3 - (Optional) Create a Custom LSP7 Token

We can start fresh with a brand new LSP7 Token, or we can use an already existing one. If you want to deploy a new one, you can follow the "Create a Custom LSP7 Token" [Guide](../../contracts/getting-started.md#create-a-custom-lsp7-token-contract) and [deploy it](../../contracts/getting-started.md#deploy-our-lsp7-token-contract-on-lukso-testnet).

## 4 - Create the Custom URD Contract

The custom URD contract can be created using 2 methods.

The first method will execute the LSP7 transfer function as the UP. In order to work, the Custom URD will needs special privileges on the UP (`SUPER_CALL` + `REENTRANCY`). The advantages of this method is that it doesn't requires additional setup (`authorizeOperator` operation) and you can trace the transfer from your UP transactions' activity tab. The downside is that it will cost a bit more gas (+/- 23k) than the 2nd method.

The second method will execute the LSP7 transfer function directly from the URD. In order to work, the custom URD needs to be authorized as an operator at the LSP7 level (using [`authorizeOperator`](../contracts/contracts/LSP7DigitalAsset#authorizeoperator)) with unlimited amount (type(uint256).max). This is the main disadvantage of this method: you'll have to authorize your URD to spend your LSP7 token for an unlimited amount. And this, for all the LSP7 you want to allow. The advantage is the gas efficiency.

### Method 1

In Hardhat, create a new file in `contracts/` folder named `LSP1URDForwarderMethod1.sol` with the following content:

```solidity title="contracts/LSP1URDForwarderMethod1.sol"
// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.4;

// interfaces
import { IERC725X } from "@erc725/smart-contracts/contracts/interfaces/IERC725X.sol";
import { ILSP1UniversalReceiver } from "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/ILSP1UniversalReceiver.sol";
import { ILSP7DigitalAsset } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/ILSP7DigitalAsset.sol";

// modules
import { ERC165 } from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import { ERC165Checker } from "@openzeppelin/contracts/utils/introspection/ERC165Checker.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// constants
import { _TYPEID_LSP7_TOKENSRECIPIENT } from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/LSP7Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Constants.sol";
import "@lukso/lsp-smart-contracts/contracts/LSP0ERC725Account/LSP0Constants.sol";

// errors
import "@lukso/lsp-smart-contracts/contracts/LSP1UniversalReceiver/LSP1Errors.sol";

contract LSP1URDForwarderSimpleMethod1 is
    ERC165,
    ILSP1UniversalReceiver
{

    // CHECK onlyOwner
    modifier onlyOwner {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    // Owner
    address owner;

    // Set a recipient
    address public recipient;

    // Set a percentage to send to recipient
    uint256 public percentage;

    // Set a mapping of authorized LSP7 tokens
    mapping (address => bool) allowlist;

    // we set the recipient & percentage & allowedAddresses of the deployer in the constructor for simplicity
    constructor(address _recipient, uint256 _percentage, address[] memory tokenAddresses) {
        require(_percentage < 100, "Percentage should be < 100");
        recipient = _recipient;
        percentage = _percentage;
        owner = msg.sender;

        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            allowlist[tokenAddresses[i]] = true;
        }
    }

    function addAddress(address token) public onlyOwner {
        allowlist[token] = true;
    }

    function setRecipient(address _recipient) public onlyOwner {
        recipient = _recipient;
    }

    function setPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage < 100, "Percentage should be < 100");
        percentage = _percentage;
    }

    function removeAddress(address token) public onlyOwner {
        allowlist[token] = false;
    }

    function getAddressStatus(address token) public view returns (bool) {
        return allowlist[token];
    }

    function universalReceiver(
        bytes32 typeId,
        bytes memory data
    ) public payable virtual returns (bytes memory) {
        // CHECK that we did not send any native tokens to the LSP1 Delegate, as it cannot transfer them back.
        if (msg.value != 0) {
            revert NativeTokensNotAccepted();
        }

        // CHECK that the caller is an ERC725Account (e.g: a UniversalProfile)
        // by checking it supports the LSP0 interface
        // by checking its interface support
        if (
            !ERC165Checker.supportsERC165InterfaceUnchecked(
                msg.sender,
                _INTERFACEID_LSP0
            )
        ) {
            return "Caller is not a LSP0";
        }

        // GET the address of the notifier from the calldata (e.g., the LSP7 Token)
        address notifier = address(bytes20(msg.data[msg.data.length - 52:]));

        // CHECK that notifier is a contract with a `balanceOf` method
        // and that msg.sender (the UP) has a positive balance
        if (notifier.code.length > 0) {
            try ILSP7DigitalAsset(notifier).balanceOf(msg.sender) returns (
                uint256 balance
            ) {
                if (balance == 0) {
                    return "LSP1: balance is zero";
                }
            } catch {
                return "LSP1: `balanceOf(address)` function not found";
            }
        }

        // CHECK that the address of the LSP7 is whitelisted
        if (!allowlist[notifier]) {
            return "Token not in allowlist";
        }

        // extract data (we only need the amount that was transfered / minted)
        (, , uint256 amount, ) = abi.decode(
            data,
            (address, address, uint256, bytes)
        );

        // CHECK that amount is not too low
        if (amount < 100) {
            return "Amount is too low (< 100)";
        } else {
            uint256 tokensToTransfer = (amount * percentage) / 100;

            bytes memory encodedTx = abi.encodeWithSelector(
                ILSP7DigitalAsset.transfer.selector,
                msg.sender,
                recipient,
                tokensToTransfer,
                true,
                ""
            );
            IERC725X(msg.sender).execute(0, notifier, 0, encodedTx);
            return "";
        }
    }

    // --- Overrides

    /**
     * @inheritdoc ERC165
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
        return
            interfaceId == _INTERFACEID_LSP1 ||
            super.supportsInterface(interfaceId);
    }
}
```

This code is commented enough to be self explanatory, but let's dive a bit more into some interesting bits.

#### Creation of the transaction

When all the verification passed in the `universalReceiver` function, we calculate the amount of token to transfer (`tokensToTransfer`) and create the transaction that will be executed:

```solidity title="Create the transaction"
bytes memory encodedTx = abi.encodeWithSelector(
    ILSP7DigitalAsset.transfer.selector,
    msg.sender,
    recipient,
    tokensToTransfer,
    true,
    ""
);
```

The `encodeWithSelector` function takes the function that will be called as 1st parameter, and its parameters as the following ones. Here, we target the `transfer` method of the LSP7 token that we received (e.g., the notifier), and we need 4 additional parameters:

- the `from` (msg.sender => the UP that received tokens)
- the `to` (recipient => the address that will receives part of the tokens)
- the `amount` (tokensToTransfer => a percentage of the total amount received)
- the `allowNonLSP1Recipient` boolean that indicates if we can transfer to any address, or if it has to be a LSP1 enabled one
- the `data` (no additional data)

#### Execution of the transaction

Directly after creating our encoded transaction, we can execute it using the following line:

```solidity title="Execute the transaction"
IERC725X(msg.sender).execute(0, notifier, 0, encodedTx);
```

As we know from the `// CHECK that the caller is a LSP0 (UniversalProfile)` test, the `msg.sender` is a Universal Profile which extends `ERC725XCore`. We can then explicitly convert `msg.sender` as a ERC725X contract, then call the `execute` function on it. This means that we "run the execute function as the Universal Profile". The parameters are:

- the `operationType` (0 => CALL operation)
- the `target` (notifier => our LSP7 contract)
- the `value` (in native token) (0 => nothing is sent)
- the `data` (our encoded transaction)

### Method 2

In Hardhat, copy the `contracts/LSP1URDForwarderMethod1.sol` file to `contracts/LSP1URDForwarderMethod2.sol` and change the following:

```solidity title="contracts/LSP1URDForwarderMethod2.sol"
// ...
        // CHECK if amount is not too low
        if (amount < 100) {
            return "Amount is too low (< 100)";
        } else {
            uint256 tokensToTransfer = (amount * percentage) / 100;

            ILSP7DigitalAsset(notifier).transfer(msg.sender, recipient, tokensToTransfer, true, "");
            return "";
        }
// ...
```

Let's explain what changed.

### Execution of the transaction

In this method, we're directly calling the `transfer` method of the notifier (the LSP7 token) as the URD. Of course, in order for this to work, the custom URD needs to be authorized to spend the token of the UP on his behalf (using `authorizeOperator`).

## Congratulations 🥳

You now have a custom Universal Receiver Delegate contract that we will register on our Universal Profile in the [second part](./create-custom-urd-2.md) of this guide!
