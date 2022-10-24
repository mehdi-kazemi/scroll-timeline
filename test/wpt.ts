/**
 * Copyright 2022 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {eachLimit, retry} from 'async';
import {readFile} from 'fs/promises';
import {writeFileSync, existsSync, mkdirSync, readdirSync} from 'fs';
import {Agent} from 'http';
import {Builder, By, until} from 'selenium-webdriver';
import {Local} from 'browserstack-local';

type Capabilities = Record<string, unknown>;

const enum DataType {
  FetchDescriptor,
  Result,
}

interface ResultData {
  type: DataType.Result;
  result: [number, number];
  details: Array<TestResult>;
}

interface FetchDescriptorData {
  type: DataType.FetchDescriptor;
  capabilities: Capabilities;
}

interface BrowserVersion {
  name: string;
  data: FetchDescriptorData | ResultData;
}

interface BrowserDefinition {
  name: string;
  logo: string;
  versions: BrowserVersion[];
}

interface Subtest {
  name: string;
  status: number;
  PASS: number;
  PRECONDITION_FAILED: number;
}

interface TestResult {
  0: string;
  1: {
    tests: Array<Subtest>;
  };
}

type TestSuite = {
  js: string[];
  iframe: Array<[string, string]>;
};

/**********************************/
/****** TEST SELECTION ************/
/**********************************/
const TEST_FOLDERS: Array<string> = [
  "scroll-animations\/css",
  "scroll-animations\/scroll-timelines",
  "scroll-animations\/view-timelines",
];

const TEST_FILTERS = TEST_FOLDERS.map(folder => new RegExp(folder));

const SUBTEST_FILTERS: Array<RegExp> = [
//   /calc\(.*\)/,
//   /max\(.*\)/,
//   /style\(.*\)/,
//   /#container width 399px after padding is applied. #second is removed from the rendering/,
//   /ex units/,
//   /ch units/,
//   /ex relative/,
//   /ch relative/,
];

/**********************************/
/****** BROWSER SELECTION *********/
/**********************************/
const CHROME_DEFINITION: BrowserDefinition = {
  name: 'Chrome',
  logo: 'https://unpkg.com/@browser-logos/chrome@2.0.0/chrome.svg',
  versions: Array.from({length: 1})
    .map((_, i) => 104 + i)
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
      ['15.6', '15'],
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

const BROWSERS: BrowserDefinition[] = [
  CHROME_DEFINITION,
  // SAFARI_IOS_DEFINITION,
  // SAFARI_MACOS_DEFINITION,
  // EDGE_DEFINITION,
  // FIREFOX_DEFINITION,
  // SAMSUNG_INTERNET_DEFINITION,
  // IE_DEFINITION,
];

function createLocalServer(): Promise<Local> {
  return new Promise((resolve, reject) => {
    const server = new Local();
    server.start(
      {
        key: process.env.BROWSERSTACK_ACCESS_KEY,
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve(server);
        }
      }
    );
  });
}

function stopLocalServer(server: Local): Promise<void> {
  return new Promise(resolve => {
    server.stop(resolve);
  });
}

function getValue(obj: any, path: string) {
  const paths = path.split('\/');
  for (var i=0, len=paths.length; i<len; i++)
    obj = obj[paths[i]];
  return obj;
};

async function getTests(manifestPath: string): Promise<TestSuite> {
  const manifestBuffer = await readFile(manifestPath);
  const manifest = JSON.parse(manifestBuffer.toString());

  const js: Array<string> = [];
  const iframe: Array<[string, string]> = [];

  for(let folder_path of TEST_FOLDERS) {
    const htmlTests = getValue(manifest.items.testharness, folder_path);
    const refTests = getValue(manifest.items.reftest, folder_path);

    if(refTests) {
      Object.keys(refTests).forEach(name => {
        const data = refTests[name][1][1][0];
        iframe.push(
          [`ref${iframe.length}_test`, `http://web-platform.test:8000/${folder_path}/${name}`],
          [`ref${iframe.length}_match`, `http://web-platform.test:8000${data[0]}`]
        );
      });
    }

    if(htmlTests) {
      Object.keys(htmlTests)
        .filter(name => !TEST_FILTERS.some(filter => filter.test(name)))
        .map(name => `http://web-platform.test:8000/${folder_path}/${name}`)
        .forEach(test => { js.push(test); });
    }
  }

  return {
    // js: js.slice(0, 3), // Reducing the number of tests for now
    // iframe : [] // Reducing the number of tests for now
    js, iframe
  };
}

function createWebDriver(capabilities: Record<string, unknown>) {
  try {
    return new Builder()
      .usingHttpAgent(
        new Agent({
          keepAlive: true,
          keepAliveMsecs: 30 * 1000,
        })
      )
      .usingServer('http://hub-cloud.browserstack.com/wd/hub')
      .withCapabilities({
        ...capabilities,
        'bstack:options': {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(capabilities as any)['bstack:options'],
          userName: process.env.BROWSERSTACK_USERNAME,
          accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
          local: true,
          debug: true,
          consoleLogs: 'verbose',
          networkLogs: true,
          seleniumVersion: '4.1.0',
        },
      })
      .build();
  } catch (e) {
    console.warn(
      `Failed while creating driver with capabilities: ${JSON.stringify(
        capabilities
      )}`
    );
    throw e;
  }
}

async function runTestSuite(
  name: string,
  capabilities: Record<string, unknown>,
  testSuite: TestSuite
): Promise<Array<TestResult>> {
  const driver = createWebDriver(capabilities);

  try {
    console.info(`[${name}] Connecting...`);
    await driver.get('http://bs-local.com:9606/test/runner.html');

    console.info(`[${name}] Running tests...`);
    await driver.executeScript(
      `window.RUN_CQ_TESTS(${JSON.stringify(testSuite)})`
    );

    const resultsElem = await driver.wait(
      until.elementLocated(By.id('__test_results__')),
      3 * 60 * 1000,
      'Timed out',
      5 * 1000
    );
    const result = JSON.parse(await resultsElem.getAttribute('innerHTML'));
    console.info(`[${name}] Finished successfully`);
    return result;
  } catch (err) {
    console.warn(`[${name}] Failed: ${err}`);
    throw err;
  } finally {
    try {
      await driver.close();
      await driver.quit();
    } catch {
      // Some buggy WebDriver implementations could fail during closing,
      // but we want to keep any results we already returned.
    }
  }
}

async function tryOrDefault<T>(fn: () => Promise<T>, def: () => T): Promise<T> {
  try {
    return await fn();
  } catch {
    return def();
  }
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

// Format as "YYYY-MM-DD_hh-mm-ss"
function formatDate(date: Date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    '_' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join('-')
  );
}

async function main() {
  const manifestPath = process.env.WPT_MANIFEST;
  if (!manifestPath) {
    throw new Error('invariant: WPT_MANIFEST environment variable must be set');
  }

  console.info("manifestPath " + manifestPath);
  
  const testSuite = await getTests(manifestPath);
  console.info(`Using tests: ${JSON.stringify(testSuite, null, 4)}`);
  
  const tests: Array<() => Promise<void>> = [];
  const results: BrowserDefinition[] = BROWSERS.map(browser => ({
    ...browser,
    versions: browser.versions.map(version => {
      const result: BrowserVersion = {
        ...version,
      };
      tests.push(async () => {
        const data = version.data;
        if (data.type === DataType.FetchDescriptor) {
          const results = await tryOrDefault(
            async () =>
              await retry(
                5,
                async () =>
                  await runTestSuite(
                    `${browser.name} ${version.name}`,
                    data.capabilities,
                    testSuite
                  )
              ),
            () => []
          );

          let passed = 0;
          let failed = 0;

          for (const test of results) {
            if (Array.isArray(test) && Array.isArray(test[1].tests)) {
              for (const subtest of test[1].tests) {
                if (SUBTEST_FILTERS.some(filter => filter.test(subtest.name))) {
                  continue;
                }
                if (subtest.status === subtest.PASS) {
                  passed++;
                } else if (subtest.status !== subtest.PRECONDITION_FAILED) {
                  failed++;
                }
              }
            }
          }

          result.data = {type: DataType.Result, result: [passed, failed],
            details: results};
        }
      });
      return result;
    }),
  }));

  const server = await createLocalServer();
  try {
    await eachLimit(tests, 5, async test => await test());
    const resultJson = JSON.stringify(results, null, 2);

    const testResultsFolder = "test-runs";
    const fileName = formatDate(new Date());
    if(!existsSync(testResultsFolder))
      mkdirSync(testResultsFolder);

    writeFileSync(`${testResultsFolder}/${fileName}.json`, resultJson);
    createHtmlResultPage(results, testResultsFolder, fileName);
    createHtmlResultPageDetails(results, testResultsFolder, fileName);
  } finally {
    await stopLocalServer(server);
  }
}

function createHtmlResultPageDetails(results: any,
  testResultsFolder: string, fileName: string) {

  const cssStyle = `body {
    width: 2000px;
  }

  .browser {
    background-color: beige;
    border: 1px solid gray;
    border-radius: 3px;
    margin-top: 10px;
    padding: 5px;
  }

  .test {
    border: 1px solid gray;
    padding: 5px;
    border-radius: 3px;
    margin-top: 5px;
  }

  .passed {
    width: 50px;
    background-color: green;
    color: white;
    border-radius: 3px;
    padding: 3px;
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .failed {
    width: 50px;
    background-color: #DC143C;
    color: white;
    border-radius: 3px;
    padding: 3px;
    margin-top: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message {
    margin-left: 60px;
  }

  .subtest {
    padding: 3px;
    margin-top: 2px;
  }`;

  let content = "";
  for(let browser of results) {
    for(let version of browser.versions) {
      const name = browser.name + " " + version.name;
      content += `<div class='browser'>${name}</div>`;
      for(let test of version.data.details) {
        content += `<div class='test'>${test[0]}</div>`;

        for(let subtest of test[1].tests) {
          const passed = subtest.status == subtest.PASS;

          content += `<div style='display: flex;'>
              <div class='${passed ? 'passed' : 'failed'}'>${passed ? 'PASS' : 'FAIL'}</div>
              <div class='subtest'>${subtest.name}</div>
            </div>`;

          if(!passed)
            content += `<div class='message'>${subtest.message}</div>`;
        }
      }
    }
  }

  let html = `<!doctype html>
    <html lang="en">
    <head>
      <title>Test Results</title>
      <style>${cssStyle}</style>
    </head>
    <body>

    <div>
    ${content}
    </div>

    </body>
    </html>`;

  writeFileSync(`${testResultsFolder}/${fileName}-details.html`, html);
}

function createHtmlResultPage(results: any,
  testResultsFolder: string, fileName: string) {
  let cssStyle = `#container{
      display: flex;
    }

    .box {
      width: 130px;
      height: 50px;
      background-color: beige;
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .title {
      width: 130px;
      height: 50px;
      margin: 5px;
      background-color: white;
      border: 1px solid black;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
    }`;

  let columns = "";

  for(let browser of results) {
    let col = `
    <div>
      <div class="title">${browser.name}</div>
      ${
        browser.versions.map((v: any) => {
          const passed = v.data.result[0];
          const failed = v.data.result[1];
          const total = passed + failed;
          return `<div class="box">${v.name} <br> ${passed} / ${total}</div>`;
        }).join(" ")
      }
    </div>`;

    columns += col;
  }

  let html = `<!doctype html>
      <html lang="en">
      <head>
        <title>Test Results</title>
        <style>${cssStyle}</style>
      </head>
      <body>

      <div id="container">
      ${columns}
      </div>

      </body>
      </html>`;

  writeFileSync(`${testResultsFolder}/${fileName}.html`, html);
}

try {
  await main();
} catch (e) {
  console.error('Failed to complete tests:');
  console.error(e);
}
