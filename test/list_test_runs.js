import {writeFileSync, readdirSync} from 'fs';

var rows = "";
readdirSync(process.cwd() + "/test-runs").sort((a, b) => (a > b ? -1 : 1))
  .forEach( (file) => {
    console.log("> " + file);
    rows += `<li><a href="test-runs/${file}">test-runs/${file}</a></li>`;
  });

var html = `
  <!doctype html>
  <html lang="en">
  <head>
      <title>Test Results</title>
  </head>
  <body>
  <ul>
  ${rows}
  </ul>
  </body>
  </html>`;

// TODO: don't create this file yet!
// Each push should create it from scratch, from all of the existing files,
// then overwrites it, and pushes it so the github pages is kept up-to-date.
writeFileSync("test-runs.html", html);
