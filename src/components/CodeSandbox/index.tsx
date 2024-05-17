import React from 'react';

const CodeSandbox = () => {
  return (
    <iframe
      src="https://codesandbox.io/embed/c4tfhf?view=split+%2B+preview&module=%2Fsrc%2Findex.ts&previewwindow=console"
      style={{
        width: '100%',
        height: '500px',
        border: 0,
        borderRadius: '4px',
        overflow: 'hidden',
      }}
      title="dark-cookies"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};
export default CodeSandbox;
