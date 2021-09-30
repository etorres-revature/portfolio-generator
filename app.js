const fs = require("fs");
const inquirer = require("inquirer");
const generatePage = require("./src/page-template");
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
    const html = generatePage(portfolioData);

    if(!fs.existsSync(outputdir)) {
      fs.mkdirSync(outputdir)
    }

    fs.writeFile(outputdir + "/index.html", html, (err) => {
      if (err) throw err;

      console.log(
        `${portfolioData.name}'s portfolio is complete!! Check out the index.html file in the html folder to see what was output.`
      );

      fs.copyFile('./src/style.css', './dist/style.css', err => {
        if (err) {
          console.log(err);
          return;
        }
        console.log('Style sheet copied successfully!');
      });
    });
  });
