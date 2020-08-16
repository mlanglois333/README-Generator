const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of the project?"
        },
        {
            type: "input",
            name: "description",
            message: "Type a description of the application:"
        },
        {
            type: "input",
            name: "table",
            message: "Include a table of contents:"
        },
        {
            type: "input",
            name: "usage",
            message: "Include details about usage:"
        },
        {
            type: "input",
            name: "license",
            message: "Include licensing information:"
        },
        {
            type: "input",
            name: "contributors",
            message: "Enter contributors:"
        },
        {
            type: "input",
            name: "tests",
            message: "Include test information:"
        },
        {
            type: "input",
            name: "questions",
            message: "Include any questions:"
        },
    ]);
}

function generateHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <title>ReadMe</title>
</head>
<body>
    <h1>${answers.title}</h1>
    <br>
    <h3>Description</h3>
    <br>
    <p> ${answers.description}.</p>
    <br>
    <h3>Table of Contents</h3>
    <br>
    <p> ${answers.table}.</p>
    <br>
    <h3>Usage</h3>
    <br>
    <p> ${answers.usage}.</p>
    <br>
    <h3>License</h3>
    <br>
    <p> ${answers.license}.</p>
    <br>
    <h3>Contributors</h3>
    <br>
    <p> ${answers.contributors}.</p>
    <br
    ><h3>Tests</h3>
    <br>
    <p> ${answers.tests}.</p>
    <br>
    <h3>Questions</h3>
    <br>
    <p> ${answers.questions}.</p>
    <br>
</body>
</html>`;
}

async function init() {

    try {
        const answers = await promptUser();

        const html = generateHTML(answers);

        await writeFileAsync("README.md", html);

        console.log("Written");
    } catch (err) {
        console.log(err);
    }
}

init();
