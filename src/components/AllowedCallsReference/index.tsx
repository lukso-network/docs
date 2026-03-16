import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

type CallData = {
  useCase: string;
  func: string;
  callTypeLabel: string;
  callType: string;
  selector: string;
};

type Category = {
  title: string;
  items: CallData[];
  gotcha: string;
};

const categories: Category[] = [
  {
    title: 'LSP7 (Fungible Tokens)',
    items: [
      { useCase: 'Transfer tokens', func: 'transfer(address,address,uint256,bool,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x760d9bba' },
      { useCase: 'Authorize operator', func: 'authorizeOperator(address,uint256,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0xb49506fd' },
      { useCase: 'Revoke operator', func: 'revokeOperator(address,bool,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x4521748e' },
      { useCase: 'Mint tokens', func: 'mint(address,uint256,bool,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x7580d920' },
      { useCase: 'Burn tokens', func: 'burn(address,uint256,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x44d17187' },
    ],
    gotcha: 'LSP7 `transfer` does NOT send LYX. Use `CALL` only (`0x00000002`), not `TRANSFERVALUE|CALL`. If you add `TRANSFERVALUE`, you\'re granting unnecessary LYX transfer rights.'
  },
  {
    title: 'LSP8 (NFTs / Identifiable Digital Assets)',
    items: [
      { useCase: 'Transfer NFT', func: 'transfer(address,address,bytes32,bool,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x511b6952' },
      { useCase: 'Update token metadata', func: 'setDataForTokenId(bytes32,bytes32,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0xd6c1407c' },
      { useCase: 'Mint NFT', func: 'mint(address,bytes32,bool,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0xaf255b61' },
      { useCase: 'Burn NFT', func: 'burn(bytes32,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x6c79b70b' },
    ],
    gotcha: 'The `bytes32` tokenId in LSP8 `transfer` is the token identifier — NOT an ERC721-style `uint256`. Make sure your AllowedCalls entry targets the right contract address alongside the selector.'
  },
  {
    title: 'ERC725X / ERC725Y (Universal Profile core)',
    items: [
      { useCase: 'Execute external call', func: 'execute(uint256,address,uint256,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x44c028fe' },
      { useCase: 'Set single data key', func: 'setData(bytes32,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x7f23690c' },
      { useCase: 'Set multiple data keys', func: 'setDataBatch(bytes32[],bytes[])', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x97902421' },
    ],
    gotcha: 'Allowing `execute` on a UP gives the controller the ability to call ANY external contract on behalf of the UP — combine with `AllowedCalls` to restrict which contracts and functions it can call.'
  },
  {
    title: 'Stakingverse (LYX Liquid Staking)',
    items: [
      { useCase: 'Deposit LYX', func: 'deposit(address)', callTypeLabel: 'TRANSFERVALUE|CALL', callType: '0x00000003', selector: '0xf340fa01' },
      { useCase: 'Withdraw stake', func: 'withdraw(uint256,address)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0x00f714ce' },
      { useCase: 'Claim rewards', func: 'claim(uint256,address)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0xddd5e1b2' },
      { useCase: 'Transfer staked position', func: 'transferStake(address,uint256,bytes)', callTypeLabel: 'CALL', callType: '0x00000002', selector: '0xf2f1042f' },
    ],
    gotcha: '`deposit(address)` sends actual LYX to the vault — it MUST use `TRANSFERVALUE|CALL` (`0x00000003`), not just `CALL`. This is the #1 mistake when building staking controllers. All other Stakingverse functions are non-payable — use `CALL` only.'
  }
];

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
      <IconButton onClick={handleCopy} size="small" sx={{ ml: 1 }}>
        {copied ? <CheckIcon fontSize="small" color="success" /> : <ContentCopyIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default function AllowedCallsReference() {
  const [expanded, setExpanded] = useState<string | false>('panel0');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ my: 4 }}>
      {categories.map((cat, index) => {
        const panelId = `panel${index}`;
        return (
          <Accordion key={index} expanded={expanded === panelId} onChange={handleChange(panelId)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="bold">{cat.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Box sx={{ overflowX: 'auto', mb: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>Use case</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>Function</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>Call type</th>
                      <th style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>Selector</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, i) => (
                      <tr key={i}>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>{item.useCase}</td>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
                          <code>{item.func}</code>
                        </td>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
                          <Chip
                            label={`${item.callTypeLabel} (${item.callType})`}
                            size="small"
                            sx={{
                              ...(item.callType === '0x00000003'
                                ? {
                                    color: 'white',
                                    backgroundImage: 'linear-gradient(to bottom right, rgba(235,29,113,1), rgba(235,29,113,0.40))',
                                    fontWeight: 'bold',
                                    border: 'none',
                                  }
                                : {
                                    fontWeight: 'bold',
                                  }),
                            }}
                            variant={item.callType === '0x00000003' ? 'filled' : 'outlined'}
                          />
                        </td>
                        <td style={{ padding: '8px', borderBottom: '1px solid var(--ifm-color-emphasis-200)', whiteSpace: 'nowrap' }}>
                          <code>{item.selector}</code>
                          <CopyButton text={item.selector} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
              <Alert severity="warning" sx={{ '& code': { backgroundColor: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '4px' } }}>
                <span dangerouslySetInnerHTML={{ __html: cat.gotcha.replace(/`([^`]+)`/g, '<code>$1</code>') }} />
              </Alert>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
