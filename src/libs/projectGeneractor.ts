import inquirer from 'inquirer';
import {execSync} from 'child_process';
import fs from 'fs';
import { Argv } from 'yargs';

export default async function generateProject({ argv }: Argv) {
  try {

    const answer = await inquirer.prompt([
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
      }
    ])

    if (fs.existsSync(answer.name)) {
      const choice = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'overwrite',
          message: 'This project already exists do you want overwrite it ?',
          default: false
        }
      ])
      if (!choice.overwrite) return;
      fs.rmSync(answer.name, { recursive: true, force: true })
    }
    
    const lang = answer.lang === 'ts' ? '-ts' : '';
    
    const stdout = execSync(`npm init vite@latest ${answer.name} --template react${lang}`)

    console.clear();
    console.log('Fini bon code UwU !')

  } catch (error) {
    console.log(error);
  }
}