import { BrowserDefinition, DataType } from "./data_types";

const CHROME_DEFINITION: BrowserDefinition = {
  name: 'Chrome',
  logo: 'https://unpkg.com/@browser-logos/chrome@2.0.0/chrome.svg',
  versions: Array.from({length: 3})
    .map((_, i) => 100 + i)
    .filter(version => ![82].includes(version))
    .map(version => `${version}.0`)
    .map(browserVersion => ({
      name: browserVersion,
      data: {
        type: DataType.FetchDescriptor,
        capabilities: {
          'bstack:options': {
            os: 'OS X',
            osVersion: 'Monterey',
          },
          browserName: 'Chrome',
          browserVersion: browserVersion,
        },
      },
    })),
};

const SAFARI_IOS_DEFINITION: BrowserDefinition = {
  name: 'Safari (iOS)',
  logo: 'https://unpkg.com/@browser-logos/safari-ios@1.0.15/safari-ios.svg',
  versions: (
    [
      // ['13.7', '13.7'],
      // ['14.0', '14'],
      // ['14.1', '14'],
      // ['15.0', '15'],
      // ['15.2', '15'],
      // ['15.4', '15'],
      // ['15.5', '15'],
      // ['15.6', '15'],
    ] as Array<[string, string]>
  ).map(([browserVersion, osVersion]) => ({
    name: browserVersion,
    data: {
      type: DataType.FetchDescriptor,
      capabilities: {
        'bstack:options': {
          deviceName: 'iPhone 11',
          osVersion,
        },
        browserName: 'safari',
        browserVersion,
      },
    },
  })),
};

const SAFARI_MACOS_DEFINITION: BrowserDefinition = {
  name: 'Safari (macOS)',
  logo: 'https://unpkg.com/@browser-logos/safari-ios@1.0.15/safari-ios.svg',
  versions: (
    [
      // ['13.1', 'Catalina'],
      // ['14.1', 'Big Sur'],
      // ['15.3', 'Monterey'],
    ] as Array<[string, string]>
  ).map(([browserVersion, osVersion]) => ({
    name: browserVersion,
    data: {
      type: DataType.FetchDescriptor,
      capabilities: {
        'bstack:options': {
          os: 'OS X',
          osVersion,
        },
        browserName: 'safari',
        browserVersion,
      },
    },
  })),
};

const EDGE_DEFINITION: BrowserDefinition = {
  name: 'Edge',
  logo: 'https://unpkg.com/@browser-logos/edge@2.0.5/edge.svg',
  versions: Array.from({length: 0 /*102 - 80*/})
    .map((_, i) => 80 + i)
    .filter(version => ![82].includes(version))
    .map(version => `${version}.0`)
    .map(browserVersion => ({
      name: browserVersion,
      data: {
        type: DataType.FetchDescriptor,
        capabilities: {
          'bstack:options': {
            os: 'OS X',
            osVersion: 'Monterey',
          },
          browserName: 'Edge',
          browserVersion,
        },
      },
    })),
};

const FIREFOX_DEFINITION: BrowserDefinition = {
  name: 'Firefox',
  logo: 'https://unpkg.com/@browser-logos/firefox@3.0.9/firefox.svg',
  versions: Array.from({length: 3 /*101 - 69*/})
    .map((_, i) => 69 + i)
    .map(version => `${version}.0`)
    .map(browserVersion => ({
      name: browserVersion,
      data: {
        type: DataType.FetchDescriptor,
        capabilities: {
          'bstack:options': {
            os: 'OS X',
            osVersion: 'Monterey',
          },
          browserName: 'Firefox',
          browserVersion,
        },
      },
    })),
};

const SAMSUNG_INTERNET_DEFINITION: BrowserDefinition = {
  name: 'Samsung Internet',
  logo: 'https://unpkg.com/@browser-logos/samsung-internet@4.0.6/samsung-internet.svg',
  versions: [
    // '9.2',
    // '10.1',
    // '11.2',
    // '12.0',
    // '13.0',
    // '14.0',
    // '15.0',
    // '16.0',
    // '17.0',
  ].map(browserVersion => ({
    name: browserVersion,
    data: {
      type: DataType.FetchDescriptor,
      capabilities: {
        'bstack:options': {
          osVersion: '12.0',
          deviceName: 'Samsung Galaxy S22 Ultra',
        },
        browserName: 'samsung',
        browserVersion,
      },
    },
  })),
};

const IE_DEFINITION: BrowserDefinition = {
  name: 'Internet Explorer',
  logo: 'https://unpkg.com/@browser-logos/internet-explorer_9-11@1.1.16/internet-explorer_9-11.svg',
  versions: [/*'9', '10', '11'*/].map(browserVersion => ({
    name: browserVersion,
    data: {type: DataType.Result, result: [0, 0], details: []},
  })),
};

export const BROWSERS: BrowserDefinition[] = [
  CHROME_DEFINITION,
  SAFARI_IOS_DEFINITION,
  SAFARI_MACOS_DEFINITION,
  EDGE_DEFINITION,
  FIREFOX_DEFINITION,
  SAMSUNG_INTERNET_DEFINITION,
  IE_DEFINITION,
];
