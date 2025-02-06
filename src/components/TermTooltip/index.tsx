import React from 'react';
import Tooltip from '../Tooltip';
import { getTooltipContent, TOOLTIP_DEFINITIONS } from '../../tooltips/definitions';

type TermTooltipProps = {
  category: keyof typeof TOOLTIP_DEFINITIONS;
  term: string;
  children?: React.ReactNode;
};

const TermTooltip: React.FC<TermTooltipProps> = ({ category, term, children }) => {
  const tooltipData = TOOLTIP_DEFINITIONS[category]?.[term];
  
  if (!tooltipData) {
    console.warn(`No tooltip found for ${term} in category ${category}`);
    return <>{children || term}</>;
  }

  return (
    <Tooltip text={tooltipData.explanation}>
      <span style={{ borderBottom: '1px dotted' }}>
        {children || tooltipData.term}
      </span>
    </Tooltip>
  );
};

export default TermTooltip; 