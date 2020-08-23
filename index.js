const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const MarkdownIt = require("markdown-it"), md=new MarkdownIt();
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

function generateMD(answers) {

    
  return md.render(`# ${answers.title}  
    ## Description  
    ${answers.description}  
    ## Table of Contents  
    ${answers.table}  
    ## Usage  
    ${answers.usage}  
    ## License  
    ${answers.license}  
    ## Contributors  
    ${answers.contributors}  
    ## Tests  
    ${answers.tests}  
    ### Questions  
    ${answers.questions}   
`)
}

async function init() {

    try {
        const answers = await promptUser();

        const MDcomplete = generateMD(answers);

        await writeFileAsync("README.md", MDcomplete);

        console.log("Written");
    } catch (err) {
        console.log(err);
    }
}

init();
