import { createTheme } from '@mui/material/styles';

export default function createCustomTheme(isDarkTheme: boolean) {
  return createTheme({
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'var(--ifm-font-color-base)',
            borderColor: isDarkTheme
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-emphasis-200)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: 'var(--ifm-global-shadow-lw)',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'inherit',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'var(--ifm-font-color-base)',
            borderColor: isDarkTheme
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-emphasis-200)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: 'var(--ifm-global-shadow-lw)',
            '& .MuiAccordion-root': {
              boxShadow: 'none',
              border: 'none',
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkTheme
              ? 'var(--ifm-background-color)'
              : 'var(--ifm-background-surface-color)',
          },
          content: {
            margin: '8px 0',
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            padding: 0,
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'var(--ifm-color-primary)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: 'var(--ifm-background-color)',
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'var(--ifm-font-color-base)',
            borderColor: isDarkTheme
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-emphasis-200)',
            borderWidth: '1px',
            borderStyle: 'solid',
            boxShadow: 'var(--ifm-global-shadow-lw)',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'var(--ifm-font-color-base)',
            borderBottom: `1px solid ${isDarkTheme
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-emphasis-200)'}`,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            color: isDarkTheme
              ? 'var(--ifm-color-primary-lightest)'
              : 'var(--ifm-font-color-base)',
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            backgroundColor: 'var(--ifm-background-color)',
            borderTop: `1px solid ${isDarkTheme
              ? 'var(--ifm-color-emphasis-300)'
              : 'var(--ifm-color-emphasis-200)'}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'var(--ifm-color-primary)',
            '&:hover': {
              backgroundColor: isDarkTheme
                ? 'var(--ifm-color-emphasis-200)'
                : 'var(--ifm-color-emphasis-100)',
            },
          },
        },
      },
    },
  });
}
