const fs = require("fs");
const inquirer = require("inquirer");
const generatePage = require("./src/page-template");
const { writeFile, copyFile } = require("./utils/generate-site");
const outputdir = __dirname + "/dist";

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name (REQUIRED)?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter your name...");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username (REQUIRED).",
      validate: (githubInput) => {
        if (githubInput) {
          return true;
        } else {
          console.log("Please enter a GitHub username...");
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        "Would you like to enter information about yourself for an 'About' section? ",
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
  console.log(`
    =================
    Add a New Project
    =================
`);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "projectName",
        message: "What is the name of your project?",
      },
      {
        type: "input",
        name: "projectDescription",
        message: "Provide a description of this project (REQUIRED).",
        validate: (projectDescription) => {
          if (projectDescription) {
            return true;
          } else {
            console.log("Please provide the description of this project ...");
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "codingLanguages",
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
        validate: (projectLink) => {
          if (projectLink) {
            return true;
          } else {
            console.log(
              "Please enter the link to the GitHub repository for this project ..."
            );
            return false;
          }
        },
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
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

promptUser()
  .then(promptProject)
  .then((portfolioData) => {
    return generatePage(portfolioData);
  })
  .then((pageHTML) => {
    if (!fs.existsSync(outputdir)) {
      fs.mkdirSync(outputdir);
    }
    return writeFile(pageHTML, outputdir);
  })
  .then((writeFileResponse) => {
    console.log(writeFileResponse);
    return copyFile(outputdir);
  })
  .then((copyFileResponse) => {
    console.log(copyFileResponse);
  })
  .catch((err) => console.log(err));
