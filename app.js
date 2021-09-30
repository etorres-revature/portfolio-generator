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
  ]);
};

promptUser().then((answers) => console.log(answers));

// const html = generatePage(name, github)

// fs.writeFile(outputdir + "/index.html", html, err => {
//     if (err) throw err;

//     console.log(`${name}'s portfolio is complete!! Check out the index.html file in the html folder to see what was output.`)
// })
