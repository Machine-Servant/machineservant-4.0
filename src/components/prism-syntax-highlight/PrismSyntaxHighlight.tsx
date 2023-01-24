import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import theme from 'prism-react-renderer/themes/vsDark';
import React from 'react';

(typeof global !== 'undefined' ? (global as any) : window).Prism = Prism;

require('prismjs/components/prism-java');
require('prismjs/components/prism-python');
require('prismjs/components/prism-typescript');

interface PrismSyntaxHighlightProps {
  children: string;
  className: string;
}

const PrismSyntaxHighlight: React.FC<PrismSyntaxHighlightProps> = ({
  children,
  className,
}) => {
  const language = className.replace(/language-/gm, '');

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={style}>
          {tokens.slice(0, -1).map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </code>
      )}
    </Highlight>
  );
};

export default PrismSyntaxHighlight;
