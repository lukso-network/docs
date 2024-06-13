import React from 'react';

import CONTRACT_VERSIONS from './contracts-versions.json';

const {
  LSP23LinkedContractsFactory,
  UniversalProfileInitPostDeploymentModule,
  UniversalProfileInit,
  LSP6KeyManagerInit,
  LSP1UniversalReceiverDelegateUP,
} = CONTRACT_VERSIONS;

export const BaseContractsTable = () => {
  const baseContracts = [
    UniversalProfileInit,
    LSP6KeyManagerInit,
    LSP1UniversalReceiverDelegateUP,
  ];

  const baseContractNames = Object.keys({
    UniversalProfileInit,
    LSP6KeyManagerInit,
    LSP1UniversalReceiverDelegateUP,
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Contract</th>
          <th>Version</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {baseContracts.map((baseContract, index) => {
          return baseContract.versions.map(
            ({ version, address, releaseurl }) => (
              <tr>
                <td>
                  <code>{baseContractNames[index]}</code>
                </td>
                <td>
                  <code>
                    <a href={releaseurl} target="_blank">
                      {version}
                    </a>
                  </code>
                </td>
                <td>
                  <code>
                    <a
                      href={`https://explorer.execution.mainnet.lukso.network/address/${address}`}
                      target="_blank"
                    >
                      {address}
                    </a>
                  </code>
                </td>
              </tr>
            ),
          );
        })}
      </tbody>
    </table>
  );
};

export const FactoryContractsTable = () => {
  const { address: lsp23Address } = LSP23LinkedContractsFactory;
  const { address: postDeploymentModuleAddress } =
    UniversalProfileInitPostDeploymentModule;

  return (
    <table>
      <thead>
        <tr>
          <th>Contract</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>LSP23LinkedContractsFactory</code>
          </td>
          <td>
            <a
              href={`https://explorer.execution.mainnet.lukso.network/address/${lsp23Address}`}
              target="_blank"
            >
              <code>{lsp23Address}</code>
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <code>UniversalProfilePostDeploymentModule</code>
          </td>
          <td>
            <a
              href={`https://explorer.execution.mainnet.lukso.network/address/${postDeploymentModuleAddress}`}
              target="_blank"
            >
              <code>{postDeploymentModuleAddress}</code>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
