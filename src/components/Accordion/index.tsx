import React from 'react';
import Link from '@docusaurus/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import createCustomTheme from '../../theme/themedComponents';

import styles from './accordion.module.scss';

import { Icon } from '@iconify/react';
import { useColorMode } from '@docusaurus/theme-common';

type AccordionData = {
  index: number; // index of the accordion line
  summary: string; // summary or heading of the accordion line
  icon: string;
  details: {
    question: string;
    answer: string;
    link?: string;
    linkLabel?: string;
  }[]; // any html data you want to see appearing in the dropdown.
};

const CustomAccordion: React.FC<AccordionData> = ({
  summary,
  icon,
  details,
  index,
}) => {
  const { colorMode } = useColorMode();
  const isDarkTheme = colorMode === 'dark';

  const theme = createCustomTheme(isDarkTheme);

  return (
    <ThemeProvider theme={theme}>
      <Accordion key={index} className={styles.outerAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={styles.expandIcon} />}
          aria-controls="panel-content"
          id="panel-header"
          className={styles.outerAccordionHeading}
        >
          <h3>
            {' '}
            <Icon icon={icon} className={styles.accordionIcon} />
            {summary}
          </h3>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '0' }}>
          {details.length > 0 &&
            details.map(({ question, answer, link, linkLabel }, index) => {
              return (
                <Accordion key={index} className={styles.innerAccordion}>
                  <AccordionSummary
                    className={styles.innerAccordionHeading}
                    expandIcon={
                      <ExpandMoreIcon className={styles.expandIcon} />
                    }
                    aria-controls={'panel' + index + '-content'}
                    id={'panel' + index + '-header'}
                  >
                    {question}
                  </AccordionSummary>
                  <AccordionDetails className={styles.innerAccordionContent}>
                    <p>{answer}</p>
                    {link && linkLabel && (
                      <p>
                        <Link to={link}>{linkLabel}</Link>
                      </p>
                    )}
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
};

export default CustomAccordion;
