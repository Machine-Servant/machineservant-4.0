import React from 'react';
import { SeriesLinks } from '../series-links';

export enum ReactNativeNavigationSeriesPage {
  P1 = 'GETTING_STARTED',
  P2 = 'STACK_NAVIGATION',
  P3 = 'TAB_NAVIGATION',
  P4 = 'DRAWER_NAVIGATION',
  P5 = 'ADVANCED_CONCEPTS',
  P6 = 'NAVIGATION_AND_STYLING',
  P7 = 'ADVANCED_PATTERNS',
  P8 = 'ADDITIONAL_RESOURCES',
}

interface ReactNavigationSeriesNavigationProps {
  currentPage: ReactNativeNavigationSeriesPage;
}

export const ReactNativeNavigationSeriesNavigation: React.FC<
  ReactNavigationSeriesNavigationProps
> = ({ currentPage }) => {
  const pageMap = [
    {
      page: ReactNativeNavigationSeriesPage.P1,
      url: '2023-06-23-p1-react-native-navigation',
      label: 'Part 1: Getting Started',
    },
    {
      page: ReactNativeNavigationSeriesPage.P2,
      url: '2023-06-23-p2-react-native-navigation',
      label: 'Part 2: Building with Stack Navigation',
    },
    {
      page: ReactNativeNavigationSeriesPage.P3,
      url: '2023-06-23-p3-react-native-navigation',
      label: 'Part 3: Finessing Tab Navigation',
    },
    {
      page: ReactNativeNavigationSeriesPage.P4,
      url: '2023-06-23-p4-react-native-navigation',
      label: 'Part 4: Mastering Drawer Navigation',
    },
    {
      page: ReactNativeNavigationSeriesPage.P5,
      url: '2023-06-23-p5-react-native-navigation',
      label: 'Part 5: Advanced Navigation Concepts',
    },
    {
      page: ReactNativeNavigationSeriesPage.P6,
      url: '2023-06-23-p6-react-native-navigation',
      label: 'Part 6: Navigation Options and Styling',
    },
    {
      page: ReactNativeNavigationSeriesPage.P7,
      url: '2023-06-23-p7-react-native-navigation',
      label: 'Part 7: Advanced Navigation Patterns',
    },
    {
      page: ReactNativeNavigationSeriesPage.P8,
      url: '2023-06-23-p8-react-native-navigation',
      label: 'Part 8: Additional Resources',
    },
  ];

  return <SeriesLinks pageMap={pageMap} currentPage={currentPage} />;
};
