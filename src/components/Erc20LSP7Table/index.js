import React from 'react';

export default function Erc20LSP7Table() {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>ERC20 Function</th>
          <th>LSP7 Equivalent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>name()</code>
          </td>
          <td>
            <code>getData(bytes32 dataKey)</code> with <br />{' '}
            <code>dataKey = keccak256('LSP4TokenName')</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>symbol()</code>
          </td>
          <td>
            <code>getData(bytes32 dataKey)</code> with <br />{' '}
            <code>dataKey = keccak256('LSP4TokenSymbol')</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>decimals()</code>
          </td>
          <td>
            <code>decimals()</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>totalSupply()</code>
          </td>
          <td>
            <code>totalSupply()</code>
          </td>
        </tr>
        <tr style={{ backgroundColor: '#dcfce7' }}>
          <td>
            <code>balanceOf(address account)</code>
          </td>
          <td>
            <code>balanceOf(address account)</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>approve(address spender, uint256 amount)</code>
          </td>
          <td>
            <code>
              authorizeOperator(address spender,
              <br />
              uint256 amount,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>allowance(address owner, address spender)</code>
          </td>
          <td>
            <code>
              authorizedAmountFor(address spender,
              <br />
              address owner)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>getOperatorsOf(address owner)</code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>
              revokeOperator(address spender,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>
              increaseAllowance(address spender,
              <br />
              uint256 addedAmount,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>
              decreaseAllowance(address spender,
              <br />
              uint256 subtractedAmount,
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>transfer(address to, uint256 amount)</code>
          </td>
          <td>
            <code>
              transfer(address from,
              <br />
              address to,
              <br />
              uint256 amount,
              <br />
              bool force
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <code>transferFrom(address from, address to, uint256 amount)</code>
          </td>
          <td>
            <code>
              transfer(address from,
              <br />
              address to,
              <br />
              uint256 amount,
              <br />
              bool force
              <br />
              bytes memory data)
            </code>
          </td>
        </tr>
        <tr>
          <td>
            <i>No equivalent</i>
          </td>
          <td>
            <code>batchCalls(bytes[] memory data)</code>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
