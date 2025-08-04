import React, { useState } from 'react';
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
import styles from './styles.module.css';

export default function CopyPageButton({ currentPath }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState('Copy page');
  const open = Boolean(anchorEl);

  // Try to use hooks, but fall back to props if not in router context
  let location = { pathname: currentPath || '' };
  let siteConfig = { url: 'https://docs.lukso.tech' };

  try {
    // Only use hooks if we're in a proper React context
    if (typeof window !== 'undefined') {
      location = useLocation();
      const context = useDocusaurusContext();
      siteConfig = context.siteConfig || { url: 'https://docs.lukso.tech' };
    }
  } catch (e) {
    // If hooks fail (e.g., when rendered outside router context), use props
    // Keep the default values
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyPage = async () => {
    try {
      // Get the markdown content container
      const markdownContainer = document.querySelector('.markdown');

      if (!markdownContainer) {
        console.error('Could not find markdown content');
        return;
      }

      // Clone the markdown container to manipulate it without affecting the DOM
      const clonedContainer = markdownContainer.cloneNode(true);

      // Remove the copy page button container from the cloned content
      const copyButtonContainer = clonedContainer.querySelector(
        '.copy-page-button-container',
      );
      if (copyButtonContainer) {
        copyButtonContainer.remove();
      }

      // Get the page title
      const titleElement =
        document.querySelector('h1') ||
        document.querySelector(
          '.docTitle_src-theme-DocItem-Layout-styles-module',
        );
      const title = titleElement
        ? titleElement.textContent
        : 'Documentation Page';

      // Get the current page URL
      const pathname = location.pathname || currentPath || '';
      const currentPageUrl = `${siteConfig.url}${pathname}`;

      // Extract text content from the cloned container (excluding button texts)
      const textContent =
        clonedContainer.textContent || clonedContainer.innerText || '';

      // Format the content for clipboard with title and URL on same line
      const formattedContent = `# ${title} - ${currentPageUrl}\n\n${textContent}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(formattedContent);

      // Show feedback
      setCopyFeedback('Copied to Clipboard!');
      // Don't close the dropdown so user can see the feedback

      // Reset feedback after 1 second
      setTimeout(() => {
        setCopyFeedback('Copy page');
      }, 1000);
    } catch (error) {
      console.error('Failed to copy content:', error);
      setCopyFeedback('Copy failed');

      // Reset feedback after 1 second
      setTimeout(() => {
        setCopyFeedback('Copy page');
      }, 1000);
    }
  };

  const handleOpenAssistant = () => {
    // Get the full URL of the current page without hash
    const pathname = location.pathname || currentPath || '';
    const currentPageUrl = `${siteConfig.url}${pathname}`;

    // Create the ChatGPT URL with the prompt
    const chatGptUrl = `https://chatgpt.com/g/g-681a44ae29108191b12d97296ab25912-lukso-assistant?hints=search&prompt=${encodeURIComponent(`Fetch the document at ${currentPageUrl}. I want to review its content so I can ask targeted questions.`)}`;

    // Open in a new tab
    window.open(chatGptUrl, '_blank', 'noopener,noreferrer');

    handleClose();
  };

  return (
    <div className={styles.copyPageButton}>
      <Button
        id="copy-page-button"
        className={styles.mainButton}
        onClick={handleClick}
        aria-controls={open ? 'copy-page-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        endIcon={
          <Icon
            icon="mdi:chevron-down"
            className={`${styles.dropdownIcon} ${open ? styles.dropdownIconOpen : ''}`}
            width="20"
            height="20"
          />
        }
      >
        <span className={styles.buttonText}>Copy Page</span>
      </Button>

      <Menu
        id="copy-page-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'copy-page-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            className: styles.dropdown,
            elevation: 3,
          },
        }}
      >
        <MenuItem onClick={handleCopyPage} className={styles.dropdownItem}>
          <ListItemIcon className={styles.dropdownItemIcon}>
            <Icon icon="mdi:content-copy" width="16" height="16" />
          </ListItemIcon>
          <Box>
            <ListItemText
              primary={copyFeedback}
              secondary="Copy the page content for LLMs"
              primaryTypographyProps={{ className: styles.dropdownItemText }}
              secondaryTypographyProps={{
                className: styles.dropdownItemDescription,
              }}
            />
          </Box>
        </MenuItem>

        <MenuItem onClick={handleOpenAssistant} className={styles.dropdownItem}>
          <ListItemIcon className={styles.dropdownItemIcon}>
            <Icon icon="mdi:comment-question-outline" width="16" height="16" />
          </ListItemIcon>
          <Box>
            <ListItemText
              primary="Open with LUKSO Assistant"
              secondary="Ask questions about this page"
              primaryTypographyProps={{ className: styles.dropdownItemText }}
              secondaryTypographyProps={{
                className: styles.dropdownItemDescription,
              }}
            />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
}
