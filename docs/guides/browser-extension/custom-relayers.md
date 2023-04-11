---
sidebar_label: 'Custom Transaction Relay Service'
---

# Custom Transaction Relay Service

The LUKSO Universal Profile extension supports custom Transaction Relay Services (relayer). They can be added through the GUI or via the RPC call: [`up_addTransactionRelayer`](../../standards/rpc-api.md).

To prevent users from adding wrong relayer endpoints, the extension will try to authenticate with the relay service:

<div style={{textAlign: 'center'}}>
<img
    src="/img/extension/add-relay.webp"
    alt="Add a new transaction relay service in the LUSKO extension"
/>
</div>

When the user confirms the import, the extension will try to authenticate the selected users with the relayer through the `/quota` endpoint.

## Resources

- [LUKSO Standards Proposals: LSP15 - Transaction Relay Service API (Standard Specification, GitHub)](https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-15-TransactionRelayServiceAPI.md)
