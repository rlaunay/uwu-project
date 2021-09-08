import inquirer from 'inquirer';

export type AnswerSetup = {
  name: string,
  lang: "ts" | "js",
  scss: boolean,
  router: boolean
}

export async function projectSetup() {
  return await inquirer.prompt<AnswerSetup>([
    {
      type: 'input',
      name: 'name',
      message: 'Your project name:',
      validate: (input) => {
        return /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(input) || 'Enter well formatted project name (kebab-case)';
      }
    },
    {
      type: 'list',
      name: 'lang',
      choices: ['js', 'ts'],
    },
    {
      type: 'confirm',
      name: 'scss',
      message: 'Do you want use scss ?',
      default: true
    },
    {
      type: 'confirm',
      name: 'router',
      message: 'Do you want install React router ?',
      default: false
    }
  ])
}

export async function overwrite() {
  return await inquirer.prompt<{ overwrite: boolean }>([
    {
      type: 'confirm',
      name: 'overwrite',
      message: 'This project already exists do you want overwrite it ?',
      default: false
    }
  ])
}