const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/page-template');

const { type } = require('os');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('(REQUIRED)Please enter your name!');
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github User ID',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('(REQUIRED) Please enter your github user ID!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some infomation about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
    `);
    //if there are no projects in the project array, add one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('(REQUIRED)Please enter your projects name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (REQUIRED)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('(REQUIRED) Please enter a description of your project!')
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with?(Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'Jquery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('(REQUIRED) Please enter githuh link to your project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        })

};
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData)
    });




// const pageHTML = generatePage(name, github);

// fs.writeFile('./index.html', pageHTML, err => {
//   if (err) throw err;

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });







