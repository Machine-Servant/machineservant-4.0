import React, { PropsWithChildren } from 'react';
import { IconProps } from '../icons';

type FeatureCardProps = {
  icon: React.FC<IconProps>;
  title: string;
};

export const FeatureCard: React.FC<PropsWithChildren<FeatureCardProps>> = ({
  children,
  title,
  icon: Icon,
}) => (
  <div className="mx-4 mb-6 lg:mb-0 lg:flex-1">
    <div className="mb-2 flex items-center gap-2 lg:mb-4 lg:block">
      <Icon className="h-8 w-8 fill-lochmara-500 text-4xl lg:mb-2" />
      <span className="inline-block text-xl uppercase">{title}</span>
    </div>
    <p className="text-sm">{children}</p>
  </div>
);
