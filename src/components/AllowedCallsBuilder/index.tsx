import React, { useMemo, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

type CallTypeOption = {
  label: string;
  value: string;
  description: string;
};

type TemplateItem = {
  useCase: string;
  func: string;
  callType: string;
  address: string;
  standard: string;
  selector: string;
};

type TemplateCategory = {
  title: string;
  items: TemplateItem[];
};

type AllowedCallEntry = {
  id: number;
  name: string;
  callType: string;
  address: string;
  standard: string;
  selector: string;
};

const callTypeOptions: CallTypeOption[] = [
  {
    label: 'TRANSFERVALUE',
    value: '0x00000001',
    description: 'Send LYX only',
  },
  {
    label: 'CALL',
    value: '0x00000002',
    description: 'Regular contract call',
  },
  {
    label: 'TRANSFERVALUE + CALL',
    value: '0x00000003',
    description: 'Send LYX and call a payable function',
  },
  {
    label: 'STATICCALL',
    value: '0x00000004',
    description: 'Read-only external call',
  },
  {
    label: 'DELEGATECALL',
    value: '0x00000008',
    description: 'Delegate execution context',
  },
];

const ANY_ADDRESS = '0xffffffffffffffffffffffffffffffffffffffff';
const ANY_STANDARD = '0xffffffff';
const ANY_SELECTOR = '0xffffffff';

const templateCategories: TemplateCategory[] = [
  {
    title: 'Common LSP token actions',
    items: [
      {
        useCase: 'LSP7 transfer',
        func: 'transfer(address,address,uint256,bool,bytes)',
        callType: '0x00000002',
        address: ANY_ADDRESS,
        standard: '0xe33f65c3',
        selector: '0x760d9bba',
      },
      {
        useCase: 'LSP8 transfer',
        func: 'transfer(address,address,bytes32,bool,bytes)',
        callType: '0x00000002',
        address: ANY_ADDRESS,
        standard: '0x3a271706',
        selector: '0x511b6952',
      },
      {
        useCase: 'UP setData',
        func: 'setData(bytes32,bytes)',
        callType: '0x00000002',
        address: ANY_ADDRESS,
        standard: '0x629aa694',
        selector: '0x7f23690c',
      },
    ],
  },
  {
    title: 'Stakingverse examples',
    items: [
      {
        useCase: 'Deposit LYX',
        func: 'deposit(address)',
        callType: '0x00000003',
        address: '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04',
        standard: ANY_STANDARD,
        selector: '0xf340fa01',
      },
      {
        useCase: 'Request withdrawal',
        func: 'withdraw(uint256,address)',
        callType: '0x00000002',
        address: '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04',
        standard: ANY_STANDARD,
        selector: '0x00f714ce',
      },
      {
        useCase: 'Claim withdrawal',
        func: 'claim(uint256,address)',
        callType: '0x00000002',
        address: '0x9F49a95b0c3c9e2A6c77a16C177928294c0F6F04',
        standard: ANY_STANDARD,
        selector: '0xddd5e1b2',
      },
    ],
  },
];

const createDefaultEntry = (): AllowedCallEntry => ({
  id: Date.now(),
  name: 'Entry 1',
  callType: '0x00000002',
  address: ANY_ADDRESS,
  standard: ANY_STANDARD,
  selector: ANY_SELECTOR,
});

const isHexOfBytes = (value: string, bytes: number) =>
  /^0x[0-9a-fA-F]+$/.test(value) && value.length === 2 + bytes * 2;

const getEntryError = (entry: AllowedCallEntry) => {
  if (!isHexOfBytes(entry.callType, 4)) return 'Call type must be 4 bytes';
  if (!isHexOfBytes(entry.address, 20)) return 'Address must be 20 bytes';
  if (!isHexOfBytes(entry.standard, 4)) return 'Standard must be 4 bytes';
  if (!isHexOfBytes(entry.selector, 4))
    return 'Function selector must be 4 bytes';
  return null;
};

const encodeEntry = (entry: AllowedCallEntry) => {
  const error = getEntryError(entry);
  if (error) return null;

  return `0x${entry.callType.slice(2)}${entry.address.slice(2)}${entry.standard.slice(2)}${entry.selector.slice(2)}`.toLowerCase();
};

const encodeCompactBytesArray = (entries: AllowedCallEntry[]) => {
  const encodedEntries = entries.map(encodeEntry);
  if (encodedEntries.some((value) => value === null)) return null;

  return `0x${encodedEntries
    .map((value) => `0020${value!.slice(2)}`)
    .join('')}`.toLowerCase();
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
      <IconButton onClick={handleCopy} size="small">
        {copied ? (
          <CheckIcon fontSize="small" color="success" />
        ) : (
          <ContentCopyIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default function AllowedCallsBuilder() {
  const [entries, setEntries] = useState<AllowedCallEntry[]>([
    createDefaultEntry(),
  ]);
  const [selectedTab, setSelectedTab] = useState(0);

  const compactBytesArray = useMemo(
    () => encodeCompactBytesArray(entries),
    [entries],
  );

  const updateEntry = (
    id: number,
    field: keyof AllowedCallEntry,
    value: string,
  ) => {
    setEntries((current) =>
      current.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry,
      ),
    );
  };

  const addEntry = () => {
    setEntries((current) => [
      ...current,
      {
        ...createDefaultEntry(),
        id: Date.now() + current.length,
        name: `Entry ${current.length + 1}`,
      },
    ]);
  };

  const removeEntry = (id: number) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  };

  const applyTemplate = (template: TemplateItem) => {
    setEntries((current) => {
      const first = current[0] ?? createDefaultEntry();
      return [
        {
          ...first,
          name: template.useCase,
          callType: template.callType,
          address: template.address,
          standard: template.standard,
          selector: template.selector,
        },
        ...current.slice(1),
      ];
    });
  };

  return (
    <Box sx={{ my: 4 }}>
      <Paper
        variant="outlined"
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          borderColor: 'var(--ifm-color-emphasis-300)',
        }}
      >
        <Stack spacing={2.5}>
          <Box>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Allowed Calls Builder
            </Typography>
            <Typography color="text.secondary">
              Build one or more 32-byte Allowed Calls entries, preview the
              packed values, and copy the final <code>CompactBytesArray</code>{' '}
              you can store under
              <code> AddressPermissions:AllowedCalls:&lt;address&gt;</code>.
            </Typography>
          </Box>

          <Alert severity="info">
            Each entry is packed as{' '}
            <code>
              callType (4 bytes) + address (20 bytes) + standard (4 bytes) +
              selector (4 bytes)
            </code>
            . The final value below is the <code>CompactBytesArray</code>{' '}
            representation, where every 32-byte entry is prefixed by{' '}
            <code>0x0020</code>.
          </Alert>

          <Box>
            <Tabs
              value={selectedTab}
              onChange={(_, value) => setSelectedTab(value)}
              variant="scrollable"
              allowScrollButtonsMobile
            >
              <Tab label="Manual builder" />
              <Tab label="Quick presets" />
            </Tabs>
          </Box>

          {selectedTab === 1 && (
            <Stack spacing={2}>
              {templateCategories.map((category) => (
                <Box key={category.title}>
                  <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                    {category.title}
                  </Typography>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                    {category.items.map((item) => (
                      <Button
                        key={`${category.title}-${item.useCase}`}
                        variant="outlined"
                        onClick={() => applyTemplate(item)}
                        sx={{ textTransform: 'none' }}
                      >
                        {item.useCase}
                      </Button>
                    ))}
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}

          <Stack spacing={2}>
            {entries.map((entry, index) => {
              const error = getEntryError(entry);
              const encodedEntry = encodeEntry(entry);

              return (
                <Paper
                  key={entry.id}
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderColor: 'var(--ifm-color-emphasis-300)',
                  }}
                >
                  <Stack spacing={2}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="space-between"
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      spacing={1}
                    >
                      <TextField
                        label="Label"
                        size="small"
                        value={entry.name}
                        onChange={(event) =>
                          updateEntry(entry.id, 'name', event.target.value)
                        }
                        sx={{ minWidth: { xs: '100%', sm: 220 } }}
                      />
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label={`Entry ${index + 1}`} size="small" />
                        <IconButton
                          aria-label="Delete entry"
                          onClick={() => removeEntry(entry.id)}
                          disabled={entries.length === 1}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <FormControl fullWidth>
                        <InputLabel id={`call-type-label-${entry.id}`}>
                          Call type
                        </InputLabel>
                        <Select
                          labelId={`call-type-label-${entry.id}`}
                          value={entry.callType}
                          label="Call type"
                          onChange={(event) =>
                            updateEntry(
                              entry.id,
                              'callType',
                              event.target.value,
                            )
                          }
                        >
                          {callTypeOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label} — {option.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        fullWidth
                        label="Target address"
                        value={entry.address}
                        onChange={(event) =>
                          updateEntry(
                            entry.id,
                            'address',
                            event.target.value.trim(),
                          )
                        }
                        helperText="20-byte address or 0xffff...ffff for any address"
                        error={!isHexOfBytes(entry.address, 20)}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Standard / interface ID"
                        value={entry.standard}
                        onChange={(event) =>
                          updateEntry(
                            entry.id,
                            'standard',
                            event.target.value.trim(),
                          )
                        }
                        helperText="4-byte interface ID or 0xffffffff for any standard"
                        error={!isHexOfBytes(entry.standard, 4)}
                      />

                      <TextField
                        fullWidth
                        label="Function selector"
                        value={entry.selector}
                        onChange={(event) =>
                          updateEntry(
                            entry.id,
                            'selector',
                            event.target.value.trim(),
                          )
                        }
                        helperText="4-byte selector or 0xffffffff for any function"
                        error={!isHexOfBytes(entry.selector, 4)}
                      />
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={1}
                      useFlexGap
                      flexWrap="wrap"
                    >
                      <Button
                        size="small"
                        variant="text"
                        onClick={() =>
                          updateEntry(entry.id, 'address', ANY_ADDRESS)
                        }
                      >
                        Any address
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() =>
                          updateEntry(entry.id, 'standard', ANY_STANDARD)
                        }
                      >
                        Any standard
                      </Button>
                      <Button
                        size="small"
                        variant="text"
                        onClick={() =>
                          updateEntry(entry.id, 'selector', ANY_SELECTOR)
                        }
                      >
                        Any function
                      </Button>
                    </Stack>

                    {error ? (
                      <Alert severity="error">{error}</Alert>
                    ) : (
                      <Box>
                        <Stack
                          direction="row"
                          spacing={1}
                          alignItems="center"
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="subtitle2">
                            Packed 32-byte entry
                          </Typography>
                          <CopyButton text={encodedEntry!} />
                        </Stack>
                        <CodeBlock language="text">{encodedEntry!}</CodeBlock>
                      </Box>
                    )}
                  </Stack>
                </Paper>
              );
            })}
          </Stack>

          <Box>
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              onClick={addEntry}
            >
              Add another entry
            </Button>
          </Box>

          <Divider />

          <Box>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Typography variant="h6">CompactBytesArray output</Typography>
              {compactBytesArray && <CopyButton text={compactBytesArray} />}
            </Stack>
            {compactBytesArray ? (
              <CodeBlock language="text">{compactBytesArray}</CodeBlock>
            ) : (
              <Alert severity="warning">
                Fix the invalid fields above to generate the final
                CompactBytesArray.
              </Alert>
            )}
          </Box>

          {compactBytesArray && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Example with erc725.js
              </Typography>
              <CodeBlock language="typescript">{`import ERC725 from '@erc725/erc725.js';
import LSP6Schema from '@erc725/erc725.js/schemas/LSP6KeyManager.json';

const erc725 = new ERC725(LSP6Schema);

const encodedAllowedCalls = erc725.encodeData([
  {
    keyName: 'AddressPermissions:AllowedCalls:<address>',
    dynamicKeyParts: ['0xControllerAddress'],
    value: [
${entries
  .map(
    (entry) =>
      `      ['${entry.callType}', '${entry.address}', '${entry.standard}', '${entry.selector}'], // ${entry.name}`,
  )
  .join('')}
    ],
  },
]);

console.log(encodedAllowedCalls.values[0]);
// ${compactBytesArray}`}</CodeBlock>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
}
