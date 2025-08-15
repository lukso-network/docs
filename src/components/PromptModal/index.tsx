import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider } from '@mui/material/styles';
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
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';
  const theme = createCustomTheme(isDarkTheme);

  useEffect(() => {
    if (open && promptPath) {
      setCopied(false);
      
      const promptContent = promptsData[promptPath];
      
      if (promptContent) {
        setContent(promptContent);
      } else {
        setContent('Prompt content not found. Please check the prompt path.');
      }
    }
  }, [open, promptPath]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
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
              onClick={handleClose} 
              className={styles.closeButton}
              size="small"
            >
              ×
            </IconButton>
          </DialogTitle>
        </div>
        
        <DialogContent className={styles.modalContent}>
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
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default PromptModal;