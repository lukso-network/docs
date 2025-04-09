---
title: Customize transfer behaviour
sidebar_position: 2
---

# Customize transfer behaviour

The `LSP8IdentifiableDigitalAsset` contract implementation includes the `_beforeTokenTransfer` and `_afterTokenTransfer` functions that offer the ability to specify custom logic that can run before or after the token transfer has happen (= before or after the balances in the contract state have been updated).
