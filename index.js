const inquirer = require("inquirer");
const fs = require("fs");

inquirer
  // prompt with questions
  .prompt([
    {
      type: "iput",
      message: "What is the name of your project?",
      name: "projectName",
    },
    {
      type: "iput",
      message: "Provide a description of your project",
      name: "description",
    },
    {
      type: "iput",
      message: "Describe how to install this application",
      name: "installation",
    },
    {
      type: "iput",
      message: "Provide instructions and examples for use",
      name: "usage",
    },
    {
      type: "iput",
      message: "Include guidelines for how to contribute to your project",
      name: "contributions",
    },
    {
      type: "iput",
      message: "Provide examples on how to run tests",
      name: "tests",
    },
    {
      type: "list",
      message:
        "If you'd like to use a license, please choose one of the followig",
      name: "license",
      choices: ["MIT", "GNU", "Mozilla", "Apache", "No license"],
    },
    {
      type: "input",
      message: "Enter your GitHub username",
      name: "username",
    },
    {
      type: "input",
      message: "Enter your email address",
      name: "email",
    },
  ])
  .then((response) => {
    let licenseBadge = "";
    let licenceDescription = `This project is licensed under the ${response.license} license.`;
    // switch statement for license choice
    switch (response.license) {
      case "MIT":
        licenseBadge = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;

        break;

      case "GNU":
        licenseBadge = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
        break;

      case "Mozilla":
        licenseBadge = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
        break;

      case "Apache":
        licenseBadge = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
        break;

      case "No license":
        licenseBadge = "";
        licenceDescription = `This project does not use a licence.`;
        break;

      default:
        break;
    }

    // creates 'created' folder it it doesn't exist

    if (!fs.existsSync("./created")) {
      fs.mkdirSync("./created");
    }
    fs.writeFile(
      "./created/README.md",

`# ${response.projectName}

${licenseBadge}

## Description

${response.description}

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributions](#how-to-contribute)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${response.installation}

## Usage

${response.usage}

## License

${licenceDescription}

## How to Contribute

${response.contributions}

## Tests

${response.tests}

## Questions

For any quesions regarding this project, open an issue or reach out via email at ${response.email}. You can find more of my work at [${response.username}](https://github.com/${response.username}/).`,
      (err) =>
        err ? console.log(err) : console.log("Your README has been created!")
    );
  });
