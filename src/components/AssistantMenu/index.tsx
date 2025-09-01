import { useState } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Icon } from '@iconify/react';
import {
  Menu,
  MenuItem,
  Button,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import styles from './styles.module.scss';

export default function AssistantMenu({ currentPath }) {
  const [menuTrigger, setMenuTrigger] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const isMenuOpen = !!menuTrigger;

  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();

  const copyPageContent = async () => {
    const content = document.querySelector('.markdown')?.innerText || '';
    const url = `${siteConfig.url}${location.pathname}`;
    const title = document.querySelector('h1')?.innerText || 'Page';
    await navigator.clipboard.writeText(`# ${title} - ${url}\n\n${content}`);
    setCopiedToClipboard(true);
  };

  const openChatGPTAssistant = () => {
    // Get the full URL of the current page without hash
    const pathname = location.pathname || currentPath || '';
    const prompt = `Fetch the document at ${encodeURIComponent(siteConfig.url + pathname)}/. I want to review its content so I can ask targeted questions.`;

    // Create the ChatGPT URL with the prompt
    const chatGptUrl = `https://chatgpt.com/g/g-681a44ae29108191b12d97296ab25912-lukso-assistant?hints=search&prompt=${prompt}`;

    // Open in a new tab
    window.open(chatGptUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={styles.copyPageButton}>
      <Button
        id="copy-page-button"
        className={styles.mainButton}
        onClick={(event) => setMenuTrigger(event.currentTarget)}
        aria-controls={isMenuOpen ? 'copy-page-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isMenuOpen ? 'true' : undefined}
        endIcon={
          <Icon
            icon="mdi:chevron-down"
            className={`${styles.dropdownIcon} ${isMenuOpen ? styles.dropdownIconOpen : ''}`}
            width="20"
            height="20"
          />
        }
      >
        <span className={styles.buttonText}>Page Assistant</span>
      </Button>

      <Menu
        id="copy-page-menu"
        anchorEl={menuTrigger}
        open={isMenuOpen}
        onClose={() => setMenuTrigger(null)}
        MenuListProps={{
          'aria-labelledby': 'copy-page-button',
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <AssistantOption
          icon="mdi:content-copy"
          title={
            copiedToClipboard ? 'Copied to Clipboard!' : 'Copy page content'
          }
          description="Copy as Markdown for LLMs"
          onClickAction={copyPageContent}
        />
        <AssistantOption
          icon="simple-icons:openai"
          title="Open in LUKSO Assistant"
          description="Ask a question about this page"
          onClickAction={openChatGPTAssistant}
        />
      </Menu>
    </div>
  );
}

type AssistantOptionProps = {
  icon: string;
  title: string;
  description: string;
  onClickAction: () => void;
};

const AssistantOption = ({
  icon,
  title,
  description,
  onClickAction,
}: AssistantOptionProps) => (
  <MenuItem onClick={onClickAction} className={styles.dropdownItem}>
    <ListItemIcon className={styles.dropdownItemIcon}>
      <Icon icon={icon} width="24" height="24" />
    </ListItemIcon>
    <Box>
      <ListItemText
        primary={title}
        secondary={description}
        primaryTypographyProps={{ className: styles.dropdownItemText }}
        secondaryTypographyProps={{
          className: styles.dropdownItemDescription,
        }}
      />
    </Box>
  </MenuItem>
);
