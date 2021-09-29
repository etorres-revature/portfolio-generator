const fs = require("fs");
const generatePage = require("./src/page-template")
const outputdir = __dirname + "/html";

const profileDataArgs = process.argv.slice(2);
const [name, github] = profileDataArgs;

fs.writeFile(outputdir + "/index.html", generatePage(name, github), err => {
    if (err) throw err;

    console.log(`${name}'s portfolio is complete!! Check out the index.html file in the html folder to see what was output.`)
})
