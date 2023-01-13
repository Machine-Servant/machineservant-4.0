import React, { useEffect } from 'react';

type CalendlyEmbedProps = {
  account: string;
  eventName: string;
};

const calendlyScriptSrc =
  'https://assets.calendly.com/assets/external/widget.js';

export const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({
  account,
  eventName,
}) => {
  const calendlyUrl = `https://calendly.com/${account}/${eventName}`;

  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', calendlyScriptSrc);

    if (head) {
      head.appendChild(script);
    }

    return (): void => {
      if (head) {
        head.removeChild(script);
      }
    };
  });

  return (
    <div
      className="calendly-inline-widget"
      data-url={calendlyUrl}
      style={{ minWidth: '300px', height: '650px' }}
    />
  );
};
