import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import Prism from 'prism-react-renderer/prism';
import theme from 'prism-react-renderer/themes/vsDark';
import React, { useCallback, useRef } from 'react';

(typeof global !== 'undefined' ? (global as any) : window).Prism = Prism;

require('prismjs/components/prism-java');
require('prismjs/components/prism-python');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-markdown');

interface PrismSyntaxHighlightProps {
  children: string;
  className: string;
}

const HIGHLIGHT_CLASSNAME = 'highlight-line';

const PrismSyntaxHighlight: React.FC<PrismSyntaxHighlightProps> = ({
  children,
  className,
}) => {
  const language = className.replace(/language-/gm, '');
  let highlightStart = useRef<boolean>(false);

  // Line highlighting adapted from: https://github.com/FormidableLabs/prism-react-renderer/issues/26#issuecomment-629013121
  const highlightLine = useCallback(
    (
      lineArray: Array<{ content: string }>,
      lineProps: { className: string }
    ) => {
      let shouldExclude = false;

      lineArray.forEach((line, idx) => {
        const content = line.content;

        // highlight lines with "// highlight-line"
        if (content.replace(/\s/g, '').includes('//highlight-line')) {
          lineProps.className = `${lineProps.className} ${HIGHLIGHT_CLASSNAME}`;
          line.content = content
            .replace('// highlight-line', '')
            .replace('//highlight-line', '');
        }

        // stop highlighting with "// highlight-end"
        if (
          !!highlightStart &&
          content.replace(/\s/g, '') === '//highlight-end'
        ) {
          highlightStart.current = false;
          shouldExclude = true;
        }

        // start highlighting after "// highlight-start"
        if (content.replace(/\s/g, '') === '//highlight-start') {
          highlightStart.current = true;
          shouldExclude = true;
        }
      });

      if (!!highlightStart.current) {
        lineProps.className = `${lineProps.className} ${HIGHLIGHT_CLASSNAME}`;
      }

      return shouldExclude;
    },
    [highlightStart]
  );

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language as Language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <code className={className} style={style}>
          {tokens.slice(0, -1).map((line, i) => {
            const lineProps = getLineProps({ line, key: i });
            const shouldExclude = highlightLine(line, lineProps);
            return !shouldExclude ? (
              <div {...lineProps}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ) : null;
          })}
        </code>
      )}
    </Highlight>
  );
};

export default PrismSyntaxHighlight;
