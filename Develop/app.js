const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");
const inquire = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");
var teamList = [];

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter manager name:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter manager's email:"
    },
    {
        type: "input",
        name: "officeNum",
        message: "Enter office number:"
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter employee name:"
    },
    {
        type: "input",
        name: "email",
        message: "Enter their email:"
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "engineer"
        },
        type: "input",
        name: "github",
        message: "Engineer, enter your github username:"
    },
    {
        when: input => {
            return input.role == "intern"
        },
        type: "input",
        name: "school",
        message: "Intern, enter your school name:"
    },
    {
        type: "list",
        name: "addAnother",
        message: "Add another team member?",
        choices: ["Yes", "No"]
    }
]

function buildTeam() {
    inquire.prompt(employeeQuestions).then(employee => {
        if (employee.role == "engineer") {
            var newMember = new Engineer(employee.name, teamList.length+1, employee.email, employee.github);
        } else {
            var newMember = new Intern(employee.name, teamList.length+1, employee.email, employee.school);
        }
        teamList.push(newMember);
        if (employee.addAnother === "Yes") {
            buildTeam();
        } else {
            buildHtml();
        }
        
    })
}

async function buildHtml() 
{
    try {
        for (member of teamList) {
            if (member.getRole() == "Manager") {
                teamList.push(manager);
            } else if (member.getRole() == "Engineer") {
                teamList.push(engineer);
            } else if (member.getRole() == "Intern") {
                teamList.push(intern);
            }
        }
    const html = render.render(teamList);
    return writeFileAsync(outputPath, html);
    }  
    catch (err)
        {
            console.log("Page Generated!");
        }

    // fs.appendFileSync("./output/teamPage.html", "</div></main></body></html>", function (err) {
    //     if (err) throw err;
    // });
    // console.log("Page tags closed! Operation completed.")

}



function init() {
    inquire.prompt(managerQuestions).then(manager => {
        let teamManager = new Manager(manager.name, 1, manager.email, manager.officeNum);
        teamList.push(teamManager);
        console.log(" ");
        buildTeam();
    })

}

init();