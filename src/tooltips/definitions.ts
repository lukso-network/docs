type TooltipDefinition = {
  term: string;
  explanation: string;
};

type TooltipCategory = {
  [key: string]: TooltipDefinition;
};

export const TOOLTIP_DEFINITIONS = {
  blockchain: {
    ERC: {
      term: 'Ethereum Requests for Comments (ERCs)',
      explanation: 'Technical standards proposed to the Ethereum community',
    },
    gas: {
      term: 'gas',
      explanation: 'Transaction fees paid to network validators',
    },
    universalReceiver: {
      term: 'universalReceiver',
      explanation: 'A standardized way to handle notifications for token transfers and other events',
    },
  },
  profiles: {
    universalProfile: {
      term: 'Universal Profile',
      explanation: 'A smart contract-based account with advanced features',
    },
    permissions: {
      term: 'fine-grained permissions',
      explanation: 'Detailed control over what different devices or addresses can do with your profile',
    },
  },
  // Add more categories as needed
} as const;

// Helper component to get tooltip text
export const getTooltipContent = (category: keyof typeof TOOLTIP_DEFINITIONS, term: string): string => {
  const tooltipData = TOOLTIP_DEFINITIONS[category]?.[term];
  if (!tooltipData) {
    console.warn(`No tooltip found for ${term} in category ${category}`);
    return '';
  }
  return tooltipData.explanation;
}; 