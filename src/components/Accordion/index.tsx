import React from 'react';
import Link from '@docusaurus/Link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './accordion.module.scss';

import { Icon } from '@iconify/react';

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
  return (
    <Accordion key={index}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <h3>
          {' '}
          <Icon
            icon={icon}
            // style={{ width: '1.75em', height: '1.75em', marginRight: '0.5em' }}
          />
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
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={'panel' + index + '-content'}
                  id={'panel' + index + '-header'}
                >
                  {question}
                </AccordionSummary>
                <AccordionDetails className={styles.innerAccordionContent}>
                  <p>{answer}</p>
                  <p>
                    <Link to={link}>{linkLabel}</Link>
                  </p>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
