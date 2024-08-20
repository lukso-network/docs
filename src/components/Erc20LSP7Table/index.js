import React from 'react';

export default function Erc20LSP7Table() {
  return (
    <table id="erc20-to-lsp7-table" width="100%">
      <thead>
        <tr>
          <th>ERC20 Function</th>
          <th>LSP7 Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">name()</pre>
          </td>
          <td>
            <pre language="javascript">
              const dataKey = keccak256('LSP4TokenName')
              <br />
              getData(bytes32 dataKey)
            </pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">symbol()</pre>
          </td>
          <td>
            <pre language="solidity">
              const dataKey = keccak256('LSP4TokenSymbol')
              <br />
              getData(bytes32 dataKey)
            </pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <pre language="solidity">decimals()</pre>
          </td>
          <td>
            <pre language="solidity">decimals()</pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <pre language="solidity">totalSupply()</pre>
          </td>
          <td>
            <pre language="solidity">totalSupply()</pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <pre language="solidity">balanceOf(address account)</pre>
          </td>
          <td>
            <pre language="solidity">balanceOf(address account)</pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">
              allowance(address owner, address spender)
            </pre>
          </td>
          <td>
            <pre language="solidity">
              authorizedAmountFor(
              <br />
              {'  '} address spender,
              <br />
              {'  '} address owner
              <br />)
            </pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">getOperatorsOf(address owner)</pre>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">
              approve(address spender, uint256 amount)
            </pre>
          </td>
          <td>
            <pre language="solidity">
              authorizeOperator(
              <br />
              {'  '}address spender,
              <br />
              {'  '}uint256 amount,
              <br />
              {'  '}bytes memory data
              <br />
              );
            </pre>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#authorizeoperator">
              🔍 Function details
            </a>{' '}
            <br />
            <a
              href="https://explorer.execution.mainnet.lukso.network/tx/0xdb96632f0fe300bf1f9e27ff67835b6bd2fc94a4470a2896a85de54a5de49175"
              target="_blank"
            >
              🔀 Example Transaction
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">
              revokeOperator(
              <br />
              {'  '}address spender,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#revokeoperator">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">
              increaseAllowance(
              <br />
              {'  '}address spender,
              <br />
              {'  '}uint256 addedAmount,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#increaseallowance">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">
              decreaseAllowance(
              <br />
              {'  '}address spender,
              <br />
              {'  '}uint256 subtractedAmount,
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#decreaseallowance">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">transfer(address to, uint256 amount)</pre>
          </td>
          <td>
            <pre language="solidity">
              transfer(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}uint256 amount,
              <br />
              {'  '}bool force
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <p style={{ marginBottom: '1rem' }}>
              Pass the <code>msg.sender</code> address as <code>from</code>{' '}
              parameter.
            </p>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#transfer">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <pre language="solidity">
              transferFrom(
              <br />
              {'  '}address from,
              <br />
              {'  '} address to,
              <br />
              {'  '} uint256 amount
              <br />
              {'  '})
            </pre>
          </td>
          <td>
            <pre language="solidity">
              transfer(
              <br />
              {'  '}address from,
              <br />
              {'  '}address to,
              <br />
              {'  '}uint256 amount,
              <br />
              {'  '}bool force
              <br />
              {'  '}bytes memory data
              <br />)
            </pre>
            <p style={{ marginBottom: '1rem' }}>
              Use <code>msg.sender</code> as an operator and use a different{' '}
              <code>from</code> address to transfer tokens from.
            </p>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#transfer">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">
              function transferBatch(
              <br /> {'  '} address[] from,
              <br /> {'  '} address[] to,
              <br /> {'  '} uint256[] amount,
              <br /> {'  '} bool[] force,
              <br /> {'  '} bytes[] data
              <br />
              );
            </pre>
            <p>
              Transfer the same token to multiple recipients in a single
              transaction.{' '}
              <i>
                <a href="http://docs.lukso.tech/learn/digital-assets/transfer-batch">
                  See our examples code snippets.
                </a>
              </i>
            </p>
            <a href="../../contracts/contracts/LSP7DigitalAsset/#transferbatch">
              🔍 Function details
            </a>
          </td>
        </tr>
        <tr style={{ backgroundColor: 'transparent' }}>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <pre language="solidity">batchCalls(bytes[] memory data)</pre>
            <p style={{ marginBottom: '1rem' }}>
              Allows to pass multiple calls into a single transaction. For
              instance:
              <ol>
                <li>Transfer tokens to an address.</li>
                <li>Authorize an operator.</li>
                <li>Update the token contract metadata.</li>
                <li>etc...</li>
              </ol>
              <a href="../../contracts/contracts/LSP7DigitalAsset/#batchcalls">
                🔍 Function details
              </a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
