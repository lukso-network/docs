import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useColorMode } from '@docusaurus/theme-common';
import createCustomTheme from '../../theme/themedComponents';
import { promptsData } from '../../data/prompts';
import styles from './PromptModal.module.scss';

type PromptModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  promptPath: string;
};

const PromptModal: React.FC<PromptModalProps> = ({
  open,
  onClose,
  title,
  promptPath,
}) => {
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  const theme = useMemo(() => createCustomTheme(isDarkTheme), [isDarkTheme]);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open && promptPath) {
      setCopied(false);
      setError(null);
      
      const promptContent = promptsData[promptPath];
      
      if (promptContent) {
        setContent(promptContent);
        setError(null);
      } else {
        setContent('');
        setError('Prompt content not found. Please check the prompt path.');
      }
    }
  }, [open, promptPath]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      
      // Clear existing timeout if any
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      
      // Set new timeout and store reference
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        scroll="paper"
        className={styles.modalDialog}
        PaperProps={{
          className: `${styles.modalPaper} ${isDarkTheme ? styles.modalPaperDark : styles.modalPaperLight}`,
          sx: {
            minHeight: '500px',
            maxHeight: '85vh',
            borderRadius: '12px',
          }
        }}
        BackdropProps={{
          className: styles.modalBackdrop,
        }}
      >
        <div className={styles.modalHeader}>
          <DialogTitle className={styles.modalTitle}>
            <div className={styles.titleContent}>
              <span className={styles.titleText}>{title}</span>
            </div>
            <IconButton 
              onClick={onClose} 
              className={styles.closeButton}
              size="small"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </div>
        
        <DialogContent className={styles.modalContent}>
          {error ? (
            <div style={{ 
              padding: '20px', 
              textAlign: 'center', 
              color: 'var(--ifm-color-danger)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Error Loading Prompt</div>
              <div>{error}</div>
            </div>
          ) : (
            <>
              <div className={styles.description}>
                Copy the prompt below to a <strong>new markdown file</strong> in your repo.
                <br /><br />
                Use the "include file" feature from your AI tool to include the prompt when chatting with your AI assistant.
              </div>
              
              <div className={styles.codeContainer}>
                <div className={styles.codeHeader}>
                  <div className={styles.codeHeaderLeft}>
                    <span className={styles.codeLanguage}>Prompt</span>
                  </div>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleCopy}
                    className={`${styles.copyButton} ${copied ? styles.copyButtonSuccess : ''}`}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </Button>
                </div>
                <pre
                  className={`${styles.codeBlock} ${
                    isDarkTheme ? styles.codeBlockDark : styles.codeBlockLight
                  }`}
                >
                  <code>{content}</code>
                </pre>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default PromptModal;