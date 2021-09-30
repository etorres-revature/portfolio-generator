// const fs = require("fs");
const inquirer = require("inquirer");
// const generatePage = require("./src/page-template")
// const outputdir = __dirname + "/html";

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username.",
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
    },
  ]);
};

const promptProject = () => {
  console.log(`
    =================
    Add a New Project
    =================
`);
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "projectDescription",
      message: "Provide a description of this project (REQUIRED).",
    },
    {
      type: "checkbox",
      name: "codingLanguage",
      message: "What programming language did you use to build this project?",
      choices: [
        "JavaScript",
        "HTML",
        "CSS",
        "ES6",
        "jQuery",
        "Bootstrap",
        "Node",
      ],
    },
    {
      type: "input",
      name: "projectLink",
      message:
        "Enter the link to the GitHub repository for this project (REQUIRED). ",
    },
    {
      type: "confirm",
      name: "feature",
      message: "Would you like to feature this project repository?",
      default: false,
    },
    {
      type: "confirm",
      name: "confirmAddProject",
      message: "Would you like to enter another project?",
      default: false,
    },
  ]);
};

promptUser().then((answers) => console.log(answers));

// const html = generatePage(name, github)

// fs.writeFile(outputdir + "/index.html", html, err => {
//     if (err) throw err;

//     console.log(`${name}'s portfolio is complete!! Check out the index.html file in the html folder to see what was output.`)
// })
