import React from 'react';

interface CodeSandboxProps {
  src?: string;
}

const CodeSandbox: React.FC<CodeSandboxProps> = ({
  src = 'https://codesandbox.io/embed/c4tfhf?view=split+%2B+preview&module=%2Fsrc%2Findex.ts&previewwindow=console&fontsize=11&hidenavigation=1&theme=dark',
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio
        marginBottom: '2rem',
      }}
    >
      <iframe
        src={src}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
        title="LUKSO Playground"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </div>
  );
};

export default CodeSandbox;
