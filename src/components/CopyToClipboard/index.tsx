import React, { useCallback, useState } from 'react';

import { Icon } from '@iconify/react';

const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    setCopied(true);
  }, []);

  return (
    <>
      <Icon icon="solar:copy-outline" color="grey" />
      <code>{text}</code>
    </>
  );
};

export default CopyToClipboard;
